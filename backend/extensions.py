from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import chromadb

db = SQLAlchemy()
login_manager = LoginManager() 
bcrypt = Bcrypt()
vecdb = chromadb.PersistentClient(path="/vecdb.db")
profile_name = 'parithi' # input for local testing with sso
embedding_endpoint_name = 'cic-emb' # input
llm_endpoint_name = '' # input
llm_inference_component_name = '' # input
region_name = 'us-west-2' # input