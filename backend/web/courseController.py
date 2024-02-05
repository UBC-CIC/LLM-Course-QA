from flask import Blueprint, request, jsonify
from ..business import courseService
from flask_login import login_required, current_user

courseBp = Blueprint('course', __name__, url_prefix='/courses')

@courseBp.route('', methods=['POST'])
@login_required
def create_course():
    if not current_user.is_instructor():
        return jsonify({'error': 'Unauthorized'}), 401
    
    createCourseData = request.get_json()
    createCourseData['instructor'] = current_user.id

    try:
        createCourse = courseService.create_course(createCourseData)
        if not createCourse:
            return jsonify({'error': 'Course already exists'}), 400

        return jsonify({'id' : create_course , 'message': 'Course created'}), 201
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
    
    return courseService.upload_course_document(uploadDocumentData)

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
