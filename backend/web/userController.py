from flask import Blueprint, request, jsonify
from ..business import userService
from flask_login import login_required

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

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = userService.login(data)
    if user_id:
        return jsonify({'id': user_id}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 400

@bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout = userService.logout()
    if logout:
        return jsonify({'message': 'User logged out'}), 200
    else:
        return jsonify({'error': 'Logout failed'}), 400


