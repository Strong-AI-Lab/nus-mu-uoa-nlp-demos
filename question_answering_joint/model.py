import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering

import nltk
import json
import numpy as np
from string import punctuation
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize  
from sklearn.feature_extraction.text import TfidfVectorizer

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('stopwords')

class TFIDF_proxy(object):
    def __init__(self):
        # TF-IDF Hyperparameters
        self.top_k = 3
        self.min_gram = 1
        self.max_gram = 2
        
        self.wordnet_lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        
        self.vectorizer = TfidfVectorizer(ngram_range=(self.min_gram, self.max_gram))
    
    def preprocess(self, text, language):
        text = text.replace('/', ' / ')
        text = text.replace('.-', ' .- ')
        text = text.replace('.', ' . ')
        text = text.replace('\'', ' \' ')
        text = text.lower()

        if (language == "EN"):
            # Tokenization
            tokens = [token for token in word_tokenize(text) if token not in punctuation and token not in self.stop_words]
            # Lemmatization
            tokens = [self.wordnet_lemmatizer.lemmatize(token) for token in tokens]
            text =  " ".join(tokens)

        return text

    def rank(self, docs, query, language):
        doc_vectors = self.vectorizer.fit_transform([self.preprocess(doc, language) for doc in docs])
        query_vector = self.vectorizer.transform([self.preprocess(query, language)]).todense()

        doc_scores = np.asarray(doc_vectors @ query_vector.T).squeeze()
        doc_indices_rank = doc_scores.argsort()[::-1].tolist()

        return [docs[index] for index in doc_indices_rank]

class QAProxy(object):
    def __init__(self):
        self.model_map = {
            "EN": {
                "model_name": "twmkn9/bert-base-uncased-squad2",
                "tokenizer_name": "twmkn9/bert-base-uncased-squad2"
            },
            "MS": {
                "model_name": "twmkn9/bert-base-uncased-squad2",
                "tokenizer_name": "twmkn9/bert-base-uncased-squad2"
            },
            "TH": {
                "model_name": "twmkn9/bert-base-uncased-squad2",
                "tokenizer_name": "twmkn9/bert-base-uncased-squad2"
            },
            "MI": {
                "model_name": "twmkn9/bert-base-uncased-squad2",
                "tokenizer_name": "twmkn9/bert-base-uncased-squad2"
            }
        }

        for language in self.model_map:
            print("[+] initializing config [%s] ..." % language)
            config = self.model_map[language]
            print("[-] initializing model [%s] ..." % config["model_name"])
            self.model_map[language]["model"] = AutoModelForQuestionAnswering.from_pretrained(config["model_name"])
            print("[-] initializing tokenizer [%s] ..." % config["tokenizer_name"])
            self.model_map[language]["tokenizer"] = AutoTokenizer.from_pretrained(config["tokenizer_name"])
        print("[*] Initialization Finished")

    def question_answering(self, language, passage, question):
        if language in ["EN", "MS", "TH", "MI"]:
            model = self.model_map[language]["model"]
            tokenizer = self.model_map[language]["tokenizer"]
        else:
            return "Not supported Language"

        input_text = "[CLS] " + question + " [SEP] " + passage + " [SEP]"

        if len(input_text) >= 512:
            return "passage exceeds 512 tokens"

        input_ids = tokenizer.encode(input_text, add_special_tokens=False)

        token_type_ids = [0 if i <= input_ids.index(102) else 1 for i in range(len(input_ids))]
        start_scores, end_scores = model(torch.tensor([input_ids]), 
                                         token_type_ids=torch.tensor([token_type_ids]), 
                                         return_dict=False)
        all_tokens = tokenizer.convert_ids_to_tokens(input_ids)

        answer_start = torch.argmax(start_scores)
        answer_end = torch.argmax(end_scores)
        answer = all_tokens[answer_start]

        for i in range(answer_start + 1, answer_end + 1):
            # If it's a subword token, then recombine it with the previous token.
            if all_tokens[i][0:2] == '##':
                answer += all_tokens[i][2:]
            # Otherwise, add a space then the token.
            else:
                answer += ' ' + all_tokens[i]

        return answer

class Broker(object):
    def __init__(self):
        self.qa_proxy = QAProxy()
        self.tf_idf_proxy = TFIDF_proxy()

    def document_retrieval(self, language, context, question, result):
        pass

    def passage_retrieval(self, language, context, question, result):
        context_segments = context.split('\n\n')
        ranked_result = self.tf_idf_proxy.rank(context_segments, question, language)
        result["passages"] = [ranked_result[0]]

    def question_answering(self, language, context, question, result):
        answer = self.qa_proxy.question_answering(language, result["passages"][0], question)
        result["answer"] = answer

if __name__ == "__main__":
    broker = Broker()

    test = {
        "question": "What is your name?",
        "context": "This is New York City\n\nMy name is Iron Man\n\nI love Apple",
        "passages": ["My name is Iron Man"],
        "answer": "Iron Man"
    }

    context = test['context']
    question = test['question']
    result = {}

    broker.passage_retrieval('EN', context, question, result)
    print(result)