import pandas as pd
import os
import json
import tldextract
import nltk
import multiprocessing
import time
import numpy as np
import networkx as nx
import pke
import random
from tqdm import tqdm
from difflib import SequenceMatcher
from bs4 import BeautifulSoup
from base64 import urlsafe_b64decode
from collections import Counter
from AL_utils import read_text_file, output_dir_num, remove_duplicates 
from AL_web import html_to_text, url_to_html, init_dataframe, get_domain_text_packets
from AL_train import df_to_json

# This file is used to test the pretrained BERT, by generating predictions
# on a few websites stored in test_urls.txt. This file should contain urls
# which are different than the ones used to train BERT.

use_html_adjustment = False
bert_dir = 'bert_cased'
bert_data_dir = 'AL_data_store/test' #contains test.json
web_output_dir = 'AL_web_output'
max_predictions = 20 # max number of predictions printed
max_keyword_length = 35
importance_threshold = 0.005 # Minimum probability mass threshold considered
predict_batch_size = 256
max_seq_length = 512
doc_stride = 128

# TODO: Change network num (after training) to -1, and change actually_predict to True in global_domain_predictions
# best network = 13/14

def predict_text_packet(text_packet_list, actually_predict = True, network_num = -1):
    # This function takes as input a list of text_packets and returns a
    # dictionary mapping text_packets to a list of (predicted_keyword, weight)
    # tuples. 
    output_directory_num = 13

    if actually_predict:
        text_packet_dataframe = pd.DataFrame(
            {'text_packet': text_packet_list})
        df_to_json(
            text_packet_dataframe,
            os.path.join(bert_data_dir, 'test.json'),
            testing_mode=True)
        # This command runs the prediction, and outputs to
        # outputs/n/nbest_predictions.json
        predict_cmd = '''
export BERT_DIR={}
python run_squad.py \
  --vocab_file=$BERT_DIR/vocab.txt \
  --bert_config_file=$BERT_DIR/bert_config.json \
  --init_checkpoint=$BERT_DIR/bert_model.ckpt \
  --do_train=False \
  --do_predict=True \
  --predict_file={}/test.json \
  --max_seq_length={} \
  --doc_stride={} \
  --output_dir=outputs/{} \
  --use_tpu=False \
  --version_2_with_negative=True \
  --predict_batch_size={} \
    '''.format(bert_dir, bert_data_dir, max_seq_length, doc_stride, output_directory_num, predict_batch_size)
        os.system(predict_cmd)

    output_dict = json.load(
        open(
            'outputs/{}/nbest_predictions.json'.format(output_directory_num),
            'r'))
    for text_packet, prediction in output_dict.items():
        for i in range(len(prediction)):
            # Ignore start and end logits
            prediction[i] = (prediction[i]['text'], prediction[i]['probability'])
    return output_dict


def calculate_keyword_mass(data):
    # To each keyword, we assign a probability "mass" which sums over its
    # predicted probabilities in all the text_packets. We select keywords
    # in the order of greatest to least "mass". This function takes the raw
    # data outputted by predict_text_packet and returns a sorted list [('key1',
    # 0.1), ('key2', 0.2), ('key3', 0.0)]. The similarity_threshold is the threshold for similarity matrix -> adjacency matrix.
    print('Calculating Probability mass')
    # Initalize all keywords to mass 0.0
    all_keywords = set.union(*[set(elem[0] for elem in v) for v in data.values()])
    keyword_prob_mass = dict.fromkeys(all_keywords, 0.0)
    for text_packet, keyword_dict in tqdm(data.items()):
        for keyword, prob in keyword_dict:
            if keyword and prob > importance_threshold:
                if len(keyword) <= max_keyword_length:
                    keyword_prob_mass[keyword] += prob
                else:
                    # For keywords greater than the max keyword length, we distribute
                    # thier probability evenly across all viable candidates contained within them.
                    related_keywords = set()
                    for k, p in keyword_dict:
                        if k and not (keyword == k) and k in keyword and len(k) <= max_keyword_length and p > importance_threshold:
                            related_keywords.add(k)
                    for r in related_keywords:
                        keyword_prob_mass[r] += prob/len(related_keywords)

    keyword_prob_list = sorted(
        keyword_prob_mass.items(),
        key=lambda x: x[1],
        reverse=True)
    return keyword_prob_list

