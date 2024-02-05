from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import boto3

db = SQLAlchemy()
login_manager = LoginManager() 
bcrypt = Bcrypt()

