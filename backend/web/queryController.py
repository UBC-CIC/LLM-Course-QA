from flask import Blueprint, request, jsonify
from ..business import queryService

queryBp = Blueprint('query', __name__, url_prefix='/queries')

@queryBp.route('', methods=['POST'])
def query_llm():
    data = request.get_json()
    # TODO: Validate data
    query_data = {
        'question': data['question'],
        'course_id': data['course_id'],
        'user_id': data['user_id'], # add by middleware TODO
        'conversation_id': data['conversation_id']
    }
    query_response = queryService.query_llm(query_data)
    if query_response:
        return jsonify({'response': query_response["result"], 'conversation_id' : query_response['conversation_id']}), 200
    else:
        return jsonify({'error': 'Error creating response'}), 400

@queryBp.route('/conversations/<conversationId>', methods=['GET'])
def query_list(conversationId):
    # TODO: Validate data
    query_data = {
        # 'course_id': courseId,
        # 'user_id': userId, # add by middleware TODO
        'conversation_id': conversationId,
    }
    response = queryService.query_list(query_data)
    if response:
        return jsonify({'queries': response["result"]}), 200
    else:
        return jsonify({'error': 'Error getting queries'}), 400

@queryBp.route('/<courseId>/conversations/<userId>', methods=['GET'])
def conversation_history(courseId, userId):
    # TODO: Validate data
    print("courseId", courseId)
    print("userId", userId)

    query_data = {
        'course_id': courseId,
        'user_id': userId, # add by middleware TODO
    }
    response = queryService.conversation_history(query_data)
    if response:
        return jsonify({'conversations': response["result"], 'course_name' : response["course_name"]}), 200
    else:
        return jsonify({'error': 'Error getting conversations'}), 400