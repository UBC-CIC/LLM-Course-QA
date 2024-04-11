from flask import Blueprint, request, jsonify
from ..business import adminService

adminBp = Blueprint('admin', __name__, url_prefix='/admin')

@adminBp.route('', methods=['GET'])
def get_config():
    try:
        config = adminService.get_config()
        return jsonify(config), 200

    except:
        return jsonify({'error': 'Internal Server Error'}), 500


@adminBp.route('', methods=['PUT'])
def update_config():
    data = request.get_json()
    file = request.files['file']

    update_config_data = {
        'logo': data['logo'] if file and file.content_type == 'image/svg+xml' else None,
        'primaryColour': data['primaryColour'] if 'primaryColour' in data else None
    }

    try:
        update_config = adminService.update_config(update_config_data)
        return jsonify({'message': 'Configuration updated'}), 200
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@adminBp.route('/users', methods=['PUT'])
def update_users():
    data = request.get_json()

    update_user_data = {
        'id': data['id'],
        'role': data['role']
    }

    try:
        update_user = adminService.update_users(update_user_data)
        return jsonify({'message': 'User updated'}), 200
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@adminBp.route('/users', methods=['DELETE'])
def delete_user():
    print("deleting user")
    data = request.get_json()
    delete_user_data = {
        'user_id': data['user_id']
    }

    try:
        delete_user = adminService.delete_user(delete_user_data)
        if not delete_user:
            return jsonify({'error': 'Failed to delete user'}), 404

        return jsonify({'message': 'User deleted'}), 200
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

