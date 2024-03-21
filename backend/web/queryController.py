from flask import Blueprint, request, jsonify
from ..business import queryService
from flask_login import login_required

queryBp = Blueprint('query', __name__, url_prefix='/queries')

@queryBp.route('', methods=['POST'])
# @login_required
def query_llm():
    data = request.get_json()
    # TODO: Validate data
    query_data = {
        'question': data['question'],
        'course_id': data['course_id']
    }
    query_response = queryService.query_llm(query_data)
    if query_response:
        return jsonify({'response': query_response["result"]}), 200
    else:
        return jsonify({'error': 'Error creating response'}), 400