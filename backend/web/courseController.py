from flask import Blueprint, request, jsonify
from ..business import courseService
from flask_login import login_required, current_user

courseBp = Blueprint('course', __name__, url_prefix='/courses')

@courseBp.route('', methods=['POST'])
def create_course():
    if not current_user.is_instructor():
        return jsonify({'error': 'Unauthorized'}), 401
    createCourseData = request.get_json()
    return courseService.create_course(createCourseData)

@courseBp.route('/<courseId>', methods=['DELETE'])
@login_required
def delete_course(courseId):
    if not current_user.is_admin() or not current_user.is_instructor():
        return jsonify({'error': 'Unauthorized'}), 401
    
    deleteCourseData = {
        'course_id': courseId
    }
    return courseService.delete_course(deleteCourseData)

@courseBp.route('/<courseId>/documents', methods=['POST'])
@login_required
def upload_document(courseId):
    if not current_user.is_instructor():
        return jsonify({'error': 'Unauthorized'}), 401
    
    body = request.get_json()
    document = body.files['document']

    uploadDocumentData = {
        'course_id': courseId,
        'document': document
    }
    
    return courseService.uploadDocument(uploadDocumentData)

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
