from flask import Blueprint, request, jsonify
from ..business import userService

bp = Blueprint('user', __name__, url_prefix='/users')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return userService.register(data)



