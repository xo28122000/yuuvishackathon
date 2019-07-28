from utils import *
import time
import json
import requests
import kwe
from collections import Counter
import boto3

# NOTE: We use aws s3 becuase our selected transcription service (aws transcribe)
# requires a audio endpoint in a s3 bucket. In the future, we will search for ways to 
# run the entire transcription service on the yuuvis platform. 

cloud_bucket_name = 'yuuvis-hackathon'
string_length = 64
num_keywords = 30

def predict_keywords(keyword_list):
    keyword_prob_mass = calculate_keyword_mass(predict_text_packet(text_packet_list))
    return list(dict(keyword_prob_mass).keys()[:num_keywords])


def init(file_name):
    # Assumes the audio file is in s3 file_name specified (must include audio format)!
    # Uploads:
    # audio file, metadata -> yuuvis
    # transcription_dict.json -> s3
    # keywords.json -> s3
    transcribe = boto3.client('transcribe')
    job_name = random_string(string_length)
    s3_endpoint = 's3.us-east-2.amazonaws.com'
    job_uri = f'https://{s3_endpoint}/{cloud_bucket_name}/{file_name}'
    audio_format = file_name.split('.')[1]
    transcribe.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': job_uri},
        MediaFormat= audio_format,
        LanguageCode='en-US'
    )

    while True:
        status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
        if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
            break
        time.sleep(5)

    status = status['TranscriptionJob']
    if status['TranscriptionJobStatus'] == 'COMPLETED':
        transcript_uri = status['Transcript']['TranscriptFileUri']
        transcription = requests.get(transcript_uri).text
        transcription_json = json.loads(transcription)
        transcription_json = transcription_json['results']
        transcription_text = transcription_json['transcripts'][0]['transcript']
        transcription_items = transcription_json['items']
        transcription_dict = {'text': transcription_text, 'items':transcription_json['items']}
        save_json(transcription_dict, 'transcription_dict.json')
    
    metadata_name = 'transcription_dict.json'
    upload_to_yuuvis(file_name, metadata_name)
    add_to_bucket('transcription_dict.json')
    
    top_n = predict_keywords([transcription_text])
    save_json(top_n, 'keywords.json')

def get_time_stamp(keyword_set, transcription_items):
    max_keyword_len = max(len(k.split()) for k in keyword_set)
    transcription_items = [k for k in transcription_items 
            if 'start_time' in k.keys() and 'end_time' in k.keys()]
    transcription_strings = [item['alternatives'][0]['content'] for item in transcription_items]
    start_times = [item['start_time'] for item in transcription_items]
    end_times = [item['end_time'] for item in transcription_items]
    results_dict = dict.fromkeys(keyword_set, [])
    for i in range(len(transcription_items)):
        for j in range(1, max_keyword_len + 1):
            if i + j < len(transcription_items):
                n_gram = ' '.join(transcription_strings[i:i + j])
                interval = (start_times[i], end_times[i + j])
                if n_gram in keyword_set:
                    results_dict[n_gram].append(interval)
    return results_dict
