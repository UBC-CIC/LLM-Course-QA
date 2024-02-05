from flask import Blueprint, request, jsonify
from ..business import queryService
from flask_login import login_required

queryBp = Blueprint('query', __name__, url_prefix='/queries')

@queryBp.route('', methods=['POST'])
@login_required
def query_llm():
    data = request.get_json()

    query_response = queryService.query_llm(data)
    if query_response:
        return jsonify({'response': query_response}), 200
    else:
        return jsonify({'error': 'Error creating response'}), 400