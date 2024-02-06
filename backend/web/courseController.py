from flask import Blueprint, request, jsonify
from ..business import courseService
from flask_login import login_required, current_user

courseBp = Blueprint('course', __name__, url_prefix='/courses')

# Create a course
@courseBp.route('', methods=['POST'])
# @login_required
def create_course():
    # if not current_user.is_instructor():
    #     return jsonify({'error': 'Unauthorized'}), 401
    
    createCourseData = request.get_json()
    # createCourseData['instructor'] = current_user.id

    try:
        create_course_id = courseService.create_course(createCourseData)
        if not create_course_id:
            return jsonify({'error': 'Course already exists'}), 400

        return jsonify({'id' : str(create_course_id) , 'message': 'Course created'}), 201
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@courseBp.route('/<courseId>', methods=['DELETE'])
@login_required
def delete_course(courseId):
    if not current_user.is_admin() and not current_user.is_instructor():
        return jsonify({'error': 'Unauthorized'}), 401
    
    deleteCourseData = {
        'course_id': courseId
    }
    try:
        delete_course = courseService.delete_course(deleteCourseData)
        if not delete_course:
            return jsonify({'error': 'Course does not exist'}), 400
        return jsonify({'message': 'Course deleted'}), 200
            
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@courseBp.route('/<courseId>/documents', methods=['POST'])
@login_required
def upload_document(courseId):
    if not current_user.is_instructor():
        return jsonify({'error': 'Unauthorized'}), 401
    
    if 'document' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['document']

    uploadDocumentData = {
        'course_id': courseId,
        'document': file
    }

    try:
        upload_document = courseService.upload_course_document(uploadDocumentData)
        if not upload_document:
            return jsonify({'error': 'Error uploading document'}), 400
        return jsonify({'message': 'Document uploaded'}), 201
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@courseBp.route('/<courseId>/documents/<documentId>', methods=['DELETE'])
@login_required
def delete_course_document(courseId, documentId):
    if not current_user.is_admin():
        return jsonify({'error': 'Unauthorized'}), 401

    deleteCourseDocumentData = {
        'course_id': courseId,
        'document_id': documentId
    }
    return courseService.delete_course_document(deleteCourseDocumentData)

# get all courses
@courseBp.route('', methods=['GET'])
@login_required
def get_courses():
    userId = current_user.id
    list_courses_data = {
        'user_id': userId
    }

    courses = courseService.list_courses(list_courses_data)
    
    if not courses:
        return jsonify({'error': 'No courses found'}), 404
    
    return jsonify(courses), 200

# Adds the user to the course
@courseBp.route('/join', methods=['POST'])
@login_required
def join_course():
    user_id = current_user.id
    data = request.get_json()

    join_course_data = {
        'access_code': data['access_code'],
        'user_id': user_id
    }
    
    try:
        join_course = courseService.join_course(join_course_data)
        if not join_course:
            return jsonify({'error': 'Course does not exist'}), 400
        return jsonify({'message': 'Course joined'}), 200
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

# get all course documents
@courseBp.route('/<courseId>/documents', methods=['GET'])
@login_required
def get_course_documents(courseId):
    list_course_documents_data = {
        'course_id': courseId
    }
    documents = courseService.list_course_documents(list_course_documents_data)
    if not documents:
        return jsonify({'error': 'No documents found'}), 404
    return jsonify(documents), 200