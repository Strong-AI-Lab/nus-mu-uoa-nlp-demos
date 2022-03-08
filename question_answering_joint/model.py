import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering



class QAProxy(object):
    def __init__(self):
        self.model_map = {
            "en": {
                "model_name": "twmkn9/bert-base-uncased-squad2",
                "tokenizer_name": "twmkn9/bert-base-uncased-squad2"
            },
            "ms": {
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
    
    def document_retrieval(self, language, question):
        print("[+] %s document retrieval for question [%s] ..." % (language, question))
        return {}

    def passage_retrieval(self, language, document, question):
        return {"passage": document}

    def question_answering(self, language, passage, question):
        model = self.model_map[language]["model"]
        tokenizer = self.model_map[language]["tokenizer"]

        input_text = "[CLS] " + question + " [SEP] " + passage + " [SEP]"

        if len(input_text) >= 512:
            print(input_text)
            print(len(input_text))
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


if __name__ == '__main__':
    qa_proxy = QAProxy()
    answer = qa_proxy.question_answering("en", "What's my name?", "My name is Clara and I live in Berkeley.")
    print(answer)