from flask import Blueprint, request, jsonify
from ..business import userService
from flask_login import login_required

userBp = Blueprint('user', __name__, url_prefix='/users')

@userBp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # TODO: Validate data
    user_id = userService.register(data)
    if user_id:
        return jsonify({'id': user_id}), 201
    else:
        return jsonify({'error': 'User already exists'}), 400 

@userBp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
    # TODO: Validate data
    except Exception as e:
        print(f"Error parsing JSON: {str(e)}")

    user_data = userService.login(data)
    if user_data:
        return jsonify({'id': user_data["id"], 'role': str(user_data["role"])}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 400

@userBp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout = userService.logout()
    if logout:
        return jsonify({'message': 'User logged out'}), 200
    else:
        return jsonify({'error': 'Logout failed'}), 400
