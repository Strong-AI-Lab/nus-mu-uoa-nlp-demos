# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
#
#   Organisation: Broad AI Lab, University of Auckland
#   Author: Ziqi Wang
#   Date: 2021-05-11
#
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

from sys import path
path.append("../")
path.reverse()

import json
import os
import sys
import time
# sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from nltk import tokenize

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='threading')

def paras_to_sentences(context):
    paras = [p for p in context.split('\n') if len(p.strip()) > 0]
    sentences = []
    para_index = 0
    for p in paras:
        # sentences.append(['para_' + str(para_index), tokenize.sent_tokenize(p)])
        sentences.append([p.split('\t')[0].strip(), tokenize.sent_tokenize(p.split('\t')[1].strip())])
        para_index += 1

    return sentences

def construct_model_data(question_id, question, context):
    model_data = {}
    model_data['_id'] = question_id
    model_data['question'] = question
    model_data['context'] = paras_to_sentences(context)

    return model_data

def extract_answer_from_model_output(model_data_json, raw_output, question_id):
    answer = raw_output['answer'][question_id]
    supports_raw = raw_output['sp'][question_id]
    supports = []
    result = {}

    # TODO: can be optimised
    for support_para in supports_raw:
        for para in model_data_json['context']:
            if support_para[0] == para[0]:
                supports.append(para[1][support_para[1]])
                break

    result['answer'] = answer
    result['supports'] = supports
    return result

def int_with_default(input, default=0):
    try:
        i = int(input)
    except ValueError:
        i = default
    return i

def is_port_occupied(port):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        result = s.connect_ex(('localhost', port))
        if result == 0:
            print('**WARNING MESSAGE: port ' + str(port) + ' is in use.')
        return result == 0


@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('predict')
def predict_request(request):
    data = json.loads(request['data'])
    question_id = data['id']
    question = data['question']
    context = data['context']
    result = {}
    completed = 0
    total_step = 4

    try:
        status = '0/4 - Converting data for prediction model...'
        emit('update_status',
             {'status': status, 'cur_step': 0, 'total_step': total_step + 1, 'completed': completed, 'result': result})
        
        time.sleep(1)

        status = '1/4 - Extracting entities...'
        emit('update_status',
             {'status': status, 'cur_step': 1, 'total_step': total_step + 1, 'completed': completed, 'result': result})

        time.sleep(1)

        status = '2/4 - Selecting related paragraphs...'
        emit('update_status',
             {'status': status, 'cur_step': 2, 'total_step': total_step + 1, 'completed': completed, 'result': result})

        time.sleep(1)

        status = '3/4 - Creating objects...'
        emit('update_status',
             {'status': status, 'cur_step': 3, 'total_step': total_step + 1, 'completed': completed, 'result': result})
        
        time.sleep(1)

        status = '4/4- Predicting result...'
        emit('update_status',
             {'status': status, 'cur_step': 4, 'total_step': total_step + 1, 'completed': completed, 'result': result})
        
        time.sleep(1)

        completed = 1
        status = 'Done!'
        emit('update_status',
             {'status': status, 'cur_step': 5, 'total_step': total_step + 1, 'completed': completed, 'result': result})
    except:
        status = 'Error occurred!'
        emit('update_status',
             {'status': status, 'cur_step': -1, 'total_step': total_step + 1, 'completed': 1, 'result': result})

@app.route('/submit', methods=['POST'])
def submit():
    question_id = request.json['id']
    question = request.json['question']
    context = request.json['context']

    model_data_json = construct_model_data(question_id, question, context)

    raw_output = predict(model_data_json)

    answer = extract_answer_from_model_output(model_data_json, raw_output, question_id)

    return jsonify(answer)


if __name__ == "__main__":
    port_num = 3000
    while port_num < 0 or port_num > 65535 or is_port_occupied(port_num):
        port_num = int_with_default(input('Please specify a port number (0 - 65535): '), -1)

    # app.run(host="0.0.0.0", port=port_num, threaded=True)
    socketio.run(app, host="0.0.0.0", port=port_num)
