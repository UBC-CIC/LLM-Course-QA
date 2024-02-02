from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
# from .data.models.user import *
from flask_bcrypt import Bcrypt
# Importing blueprints for routing
from .web.courseController import courseBp
from .web.queryController import queryBp
from .web.userController import userBp
db = SQLAlchemy()
login_manager = LoginManager() 
bcrypt = Bcrypt()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/course-qa'
    app.register_blueprint(courseBp)
    app.register_blueprint(queryBp)
    app.register_blueprint(userBp)
    db.init_app(app)
    # update db with models
    with app.app_context():
        db.create_all()
    login_manager.init_app(app)
    bcrypt.init_app(app)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return User.query.get(user_id)


    return app
        