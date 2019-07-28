import boto3
import os
import random
import string
import requests
import json


s3 = boto3.resource('s3')
s3_client = boto3.client('s3')
cloud_bucket_name = 'yuuvis-hackathon'
data_loc = 'tmp' 
base_url = 'https://api.yuuvis.io'
header = {'Ocp-Apim-Subscription-Key': '5113c3a4490f44d7849be667858576a8'}

def add_to_bucket(file_name):
    # sets the key to the file_name
    if len(file_name) < 256:
        file_path = os.path.join(data_loc, file_name) 
        s3.Object(cloud_bucket_name, file_name).upload_file(file_path)

def save_json(data, name):
    if len(name) < 256:
        with open(os.path.join(data_loc, name), 'w') as fp:
                json.dump(data, fp)

def download_from_bucket(file_name):
    file_path = os.path.join(data_loc, file_name)
    s3_client.download_file(cloud_bucket_name, file_name, file_path)

def remove_from_bucket(file_name):
    s3.Object(cloud_bucket_name, file_name).delete()

def get_bucket_keys():
    results = set()
    response = s3_client.list_objects_v2(Bucket=cloud_bucket_name)
    if response['KeyCount'] > 0:
        results.update(s['Key'] for s in response['Contents'])
        while 'NextContinuationToken' in response:
            response = s3_client.list_objects_v2(Bucket=cloud_bucket_name, ContinuationToken =  response['NextContinuationToken'])
            results.update(s['Key'] for s in response['Contents'])
    return results

def random_string(string_length):
    return ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=string_length))

def upload_schema(schema_path, header_name = 'hack'):
    session = requests.Session()
    multipart_form_data = {'file' : ('schema.xml', open(schema_path, 'rb'), 'application/xml')}
    response = session.post(base_url + '/admin/schema', 
            files=multipart_form_data, headers=header)
    print(response.json())

def upload_to_yuuvis(file_name, metadata_name, header_name = 'hack'):
    file_path = os.path.join(data_loc, file_name)
    metadata_path = os.path.join(data_loc, metadata_name) 
    session = requests.Session()
    multipart_form_data = {
                'data': ('data.json', open(metadata_path, 'rb'), 'application/json'),
                'cid_63apple': ('content.pdf', open(file_path, 'rb'), 'application/pdf')
                }

    response = session.post(base_url + '/dms/objects', 
            files=multipart_form_data, headers=header)
    print(response.json())

def string_search(header_hack = 'hack'):
    # TODO: implement efficient string search
    session = requests.Session()
    r = '''POST https://api.yuuvis.io/dms/objects/search HTTP/1.1
Host: api.yuuvis.io
Content-Type: application/json

{
  "query": {
    "statement": "SELECT * FROM metadata",
    "skipCount": 0,
    "maxItems": 50
  }
}'''
    response = session.post(r).text
    response = json.load(response)
    response = response['keywords']
    return response
