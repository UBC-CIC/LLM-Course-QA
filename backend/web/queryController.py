from flask import Blueprint, request, jsonify
from ..business import queryService
from flask_login import login_required

queryBp = Blueprint('query', __name__, url_prefix='/queries')

@queryBp.route('/<courseId>/<userId>/<conversationId>', methods=['POST'])
# @login_required
def query_llm(courseId, conversationId):
    data = request.get_json()
    # TODO: Validate data
    query_data = {
        'question': data['question'],
        'course_id': courseId,
        'user_id': data['user_id'], # add by middleware TODO
        'conversation_id': conversationId
    }
    query_response = queryService.query_llm(query_data)
    if query_response:
        return jsonify({'response': query_response["result"]}), 200
    else:
        return jsonify({'error': 'Error creating response'}), 400
    
@queryBp.route('/<courseId>/<userId>/<conversationId>', methods=['GET'])
# @login_required
def query_list(courseId, conversationId, userId):
    data = request.get_json()
    # TODO: Validate data
    query_data = {
        'course_id': courseId,
        'user_id': userId, # add by middleware TODO
        'conversation_id': conversationId,
    }
    response = queryService.query_list(query_data)
    if response:
        return jsonify({'queries': response["result"]}), 200
    else:
        return jsonify({'error': 'Error getting queries'}), 400
    
@queryBp.route('/<courseId>/conversations/<userId>', methods=['GET'])
# @login_required
def query_conversations(courseId, userId):
    # TODO: Validate data
    query_data = {
        'course_id': courseId,
        'user_id': userId, # add by middleware TODO
    }
    response = queryService.query_conversations(query_data)
    if response:
        return jsonify({'conversations': response["result"]}), 200
    else:
        return jsonify({'error': 'Error getting conversations'}), 400