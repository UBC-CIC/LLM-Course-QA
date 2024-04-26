from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import boto3
import chromadb
import os

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
vecdb = chromadb.PersistentClient(path="./vecdb.db")
profile_name = 'parithi' # input for local testing with sso
embedding_endpoint_name = 'emb-cic' # input
llm_endpoint_name = 'cic-demo' # input
llm_inference_component_name = 'huggingface-llm-mistral-7b-instruct-20240421-174136' # input
region_name = 'us-west-2' # input
environment = os.environ.get('environment')

if environment != 'production':
    session = boto3.Session(profile_name=profile_name, region_name=region_name)
else:
    session = boto3.Session(region_name=region_name)
    llm_endpoint_name = os.environ.get('llm_endpoint_name')
    embedding_endpoint_name = os.environ.get('embedding_endpoint_name')
    region_name = os.environ.get('region_name')
    llm_inference_component_name = os.environ.get('llm_inference_component_name')