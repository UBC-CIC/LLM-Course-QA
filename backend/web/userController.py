from flask import Blueprint, request, jsonify
from ..business import userService
from flask_login import login_required
from ..core.utils.authDecorator import login_required

userBp = Blueprint('user', __name__, url_prefix='/users')

@userBp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id = userService.register(data)
    if user_id:
        return jsonify({'id': user_id}), 201
    else:
        return jsonify({'error': 'User already exists'}), 400

@userBp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
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

# Gets user role
@userBp.route('/role', methods=['GET'])
@login_required
def get_role(user):
    user_role_data = {
        'user_id': user.id,
    }
    role = userService.get_role(user_role_data)

    if role:
        return jsonify({'role': role}), 200
    else:
        return jsonify({'error': 'Invalid password'}), 400


@userBp.route('', methods=['PUT'])
@login_required
def change_password(user):
    data = request.get_json()
    change_password_data = {
        'user_id': user.id,
        'old_password': data['old_password'],
        'new_password': data['new_password']
    }
    change_password = userService.change_password(change_password_data)

    if change_password:
        return jsonify({'message': 'Password changed'}), 200
    else:
        return jsonify({'error': 'Invalid password'}), 400

# Gets all users
@userBp.route('', methods=['GET'])
def get_users():
    users = userService.get_users()
    return jsonify(users), 200

# Gets all instructors
@userBp.route('/instructors', methods=['GET'])
def get_instructors():
    users = userService.get_instructors()
    return jsonify(users), 200

# Adds user to course
@userBp.route('/<user_id>/courses', methods=['POST'])
def add_instructor(user_id):
    data = request.get_json()
    add_instructor_data = {
        'user_id': user_id,
        'course_id': data['course_id']
    }
    add_instructor = userService.add_user_to_course(add_instructor_data)

    if add_instructor:
        return jsonify({'message': 'Instructor added'}), 200
    else:
        return jsonify({'error': 'Instructor already exists'}), 400