# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
#
#   Organisation: Broad AI Lab, University of Auckland
#   Author: Ziqi Wang
#   Date: 2021-05-11
#
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

# from sys import path
# path.append("../")
# path.reverse()

import os
import sys
import time
import json

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from nltk import tokenize

from model import QAProxy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='threading')

# qa proxy
qa_proxy = QAProxy()

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
        status = '0/3 - Converting data for prediction model...'
        emit('update_status', {'status': status, 'cur_step': 0, 'total_step': total_step, 'completed': completed, 'result': result})
        
        time.sleep(1)

        status = '1/3 - Document retrieval...'
        emit('update_status', {'status': status, 'cur_step': 1, 'total_step': total_step, 'completed': completed, 'result': result})

        time.sleep(1)
        result["document_retrieval"] = qa_proxy.document_retrieval("en", question)

        status = '2/3 - Passage retrieval...'
        emit('update_status', {'status': status, 'cur_step': 2, 'total_step': total_step, 'completed': completed, 'result': result})

        time.sleep(1)
        result["passage_retrieval"] = qa_proxy.passage_retrieval("en", context, question)

        status = '3/3 - Question Answering...'
        emit('update_status', {'status': status, 'cur_step': 3, 'total_step': total_step, 'completed': completed, 'result': result})
        
        time.sleep(2)
        result["answer"] = qa_proxy.question_answering("en", context, question)

        completed = 1
        status = 'Done!'
        emit('update_status', {'status': status, 'cur_step': 4, 'total_step': total_step, 'completed': completed, 'result': result})
    except:
        status = 'Error occurred!'
        emit('update_status', {'status': status, 'cur_step': -1, 'total_step': total_step, 'completed': 1, 'result': result})

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
