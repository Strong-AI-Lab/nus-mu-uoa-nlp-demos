# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
#
#   Organisation: Broad AI Lab, University of Auckland
#   Author: Ziqi Wang
#   Date: 2021-09-30
#
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



from flask import Flask, render_template, request, jsonify
# from nltk import tokenize
# from dfgn import predict
from collections import namedtuple
from scripts.translate import translate_with_model, load_model, parse_model_args
import json
import os
import sys
import time

app = Flask(__name__)
# args_list = [
#     f"--path {config.model_dir}/checkpoint_best.pt",
#     f"--data {config.model_dir}",
#     f"--beam {config.beam_size}",
#     f"--source-lang {config.src_lang}",
#     f"--target-lang {config.tgt_lang}",
#     f"--tokenizer {config.tokenizer}",
#     f"--input {config.input}"
# ]
# if config.use_bpe:
#     args_list.append("--bpe-codes")
#     args_list.append(f"--bpe {config.bpe_type if config.bpe_type else 'fastbpe'}")
# if config.output_details:
#     args_list.append("--output-details")
ModelArgs = namedtuple("ModelArgs", "model_dir beam_size src_lang tgt_lang tokenizer input use_bpe bpe_codes_path bpe_type output_details")
model_args_zh_en = ModelArgs(
    model_dir='checkpoints/v4-ultimate-bpe20k-zh-en',
    beam_size=5,
    src_lang='zh',
    tgt_lang='en',
    tokenizer='moses',
    input='',
    use_bpe=True,
    bpe_codes_path='codes.zh',
    bpe_type='fastbpe',
    output_details=False
)
parsed_model_args_zh_en = parse_model_args(model_args_zh_en)
model_obj_zh_en = load_model(parsed_model_args_zh_en)

model_args_en_zh = ModelArgs(
    model_dir='checkpoints/v4-ultimate-bpe20k-en-zh',
    beam_size=5,
    src_lang='en',
    tgt_lang='zh',
    tokenizer='moses',
    input='',
    use_bpe=True,
    bpe_codes_path='codes.en',
    bpe_type='fastbpe',
    output_details=False
)
parsed_model_args_en_zh = parse_model_args(model_args_en_zh)
model_obj_en_zh = load_model(parsed_model_args_en_zh)


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
            print('WARNING MESSAGE: port ' + str(port) + ' is in use.')
        return result == 0


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def submit():
    src_lang = request.json['srcLang']
    input_str = request.json['inputStr']
    result = {}

    if src_lang == 'en':
        result['output'] = translate_with_model(parsed_model_args_en_zh, model_obj_en_zh, [input_str])
    elif src_lang == 'zh':
        result['output'] = translate_with_model(parsed_model_args_zh_en, model_obj_zh_en, [input_str])
    else:
        result['output'] = ''

    return jsonify(result)

if __name__ == "__main__":
    port_num = -1
    while port_num < 0 or port_num > 65535 or is_port_occupied(port_num):
        port_num = int_with_default(input('Please specify a port number (0 - 65535): '), -1)

    app.run(host="0.0.0.0", port=port_num, threaded=True)