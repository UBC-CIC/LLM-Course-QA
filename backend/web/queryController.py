from flask import Blueprint, request, jsonify
from ..business import queryService
from flask_login import login_required

queryBp = Blueprint('query', __name__, url_prefix='/queries')