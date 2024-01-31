from flask import Blueprint, request, jsonify
from ..business import userService

bp = Blueprint('user', __name__, url_prefix='/users')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # call userService.register which returns a user id. This should be a json response. If none is returned then send error
    user_id = userService.register(data)
    if user_id:
        return jsonify({'id': user_id}), 201
    else:
        return jsonify({'error': 'User already exists'}), 400 



