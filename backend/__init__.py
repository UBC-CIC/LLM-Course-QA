from flask import Flask
from flask_cors import CORS
import os
from .web.courseController import courseBp
from .web.queryController import queryBp
from .web.userController import userBp
from .web.adminController import adminBp
from .web.reportController import reportBp
from .extensions import db, login_manager, bcrypt, environment


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config.Config')
    CORS(app, resources={r"/*": {"origins": "*"}})
    os.environ.get('FLASK_ENV')
    app.register_blueprint(courseBp)
    app.register_blueprint(queryBp)
    app.register_blueprint(userBp)
    app.register_blueprint(adminBp)
    app.register_blueprint(reportBp)
    db.init_app(app)

    # update db with models
    with app.app_context():
        db.create_all()
    login_manager.init_app(app)
    bcrypt.init_app(app)

    return app
