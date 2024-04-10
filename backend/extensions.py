from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import boto3
import chromadb

db = SQLAlchemy()
login_manager = LoginManager() 
bcrypt = Bcrypt()
vecdb = chromadb.PersistentClient(path="./vecdb.db")
profile_name = '' # input for local testing with sso
embedding_endpoint_name = 'cic-emb' # input
llm_endpoint_name = '' # input
llm_inference_component_name = '' # input
region_name = 'us-west-2' # input

if profile_name != '':
    session = boto3.Session(profile_name=profile_name)
else:
    session = boto3.Session()