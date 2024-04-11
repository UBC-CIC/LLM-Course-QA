from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import boto3
import chromadb

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
vecdb = chromadb.PersistentClient(path="./vecdb.db")
profile_name = 'Daniel' # input for local testing with sso
embedding_endpoint_name = 'cic-emb' # input
llm_endpoint_name = 'cic-llm-mis' # input
llm_inference_component_name = 'jumpstart-dft-hf-llm-mistral-7b-ins-20240411-01-20240411-010101' # input
region_name = 'us-west-2' # input

if profile_name != '':
    session = boto3.Session(profile_name=profile_name)
else:
    session = boto3.Session()