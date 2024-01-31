from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from data.models.user import User
from flask_bcrypt import Bcrypt

# Importing blueprints for routing
from web.courseController import course
from web.queryController import query
from web.userController import user

app = Flask(__name__)

app.register_blueprint(course)
app.register_blueprint(query)
app.register_blueprint(user)

db = SQLAlchemy()
login_manager = LoginManager() 
bcrypt = Bcrypt()
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='',  
        DATABASE=os.path.join(app.instance_path, ''))

    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)


    return app
        