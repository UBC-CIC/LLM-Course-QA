from flask import Blueprint, request, jsonify
from ..business import configurationService

configurationBp = Blueprint('configuration', __name__, url_prefix='/configuration')

@configurationBp.route('', methods=['GET'])
def get_config():
    try:
        config = configurationService.get_config()
        return jsonify(config), 200
    
    except:
        return jsonify({'error': 'Internal Server Error'}), 500


@configurationBp.route('', methods=['PUT'])
def update_config():
    data = request.get_json()
    file = request.files['file']

    update_config_data = {
        'logo': data['logo'] if file and file.content_type == 'image/svg+xml' else None,
        'primaryColour': data['primaryColour'] if 'primaryColour' in data else None
    }

    try:
        update_config = configurationService.update_config(update_config_data)
        return jsonify({'message': 'Configuration updated'}), 200
    except:
        return jsonify({'error': 'Internal Server Error'}), 500