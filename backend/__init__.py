from flask import Flask
from flask_cors import CORS
import os
from .data.models.user import *
from .web.courseController import courseBp
from .web.queryController import queryBp
from .web.userController import userBp
from .extensions import db, login_manager, bcrypt


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # CORS(app)
    # allow cors all origins
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.secret_key = 'pl40'
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

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    return app
        