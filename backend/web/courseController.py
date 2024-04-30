from flask import Blueprint, request, jsonify
from ..business import courseService
from ..core.utils.authDecorator import login_required

courseBp = Blueprint('course', __name__, url_prefix='/courses')

# Create a course
@courseBp.route('', methods=['POST'])
@login_required
def create_course(user):
    data = request.get_json()

    instructor_id = user.id
    if 'instructor' in data:
        instructor_id = data['instructor']

    createCourseData = {
        'course_code': data['course_code'],
        'course_section': data['course_section'],
        'name': data['name'],
        'description': data['description'],
        'instructor_id': instructor_id
    }

    try:
        create_course_id = courseService.create_course(createCourseData)
        print("create_course_id", create_course_id)
        if not create_course_id:
            return jsonify({'error': 'Course already exists'}), 400

        return jsonify({'id' : str(create_course_id) , 'message': 'Course created'}), 201
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@courseBp.route('/<courseId>', methods=['DELETE'])
def delete_course(courseId):
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
def upload_document(courseId):
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

        return jsonify({'message': 'Document uploaded', 'file_data' : upload_document}), 201
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

@courseBp.route('/<courseId>/documents/<documentId>', methods=['DELETE'])
def delete_course_document(courseId, documentId):
    deleteCourseDocumentData = {
        'course_id': courseId,
        'document_id': documentId
    }

    deleteStatus = courseService.delete_course_document(deleteCourseDocumentData)
    if not deleteStatus:
        return jsonify({'error': 'Document does not exist'}), 400
    return jsonify({'message': 'Document deleted'}), 200

# Gets all courses
@courseBp.route('', methods=['GET'])
@login_required
def get_courses(user):
    list_courses_data = {
        'user_id': user.id
    }

    courses = courseService.list_courses(list_courses_data)

    return jsonify(courses), 200

# Adds the user to the course
@courseBp.route('/join', methods=['POST'])
@login_required
def join_course(user):
    data = request.get_json()

    join_course_data = {
        'access_code': data['access_code'],
        'user_id': user.id
    }

    try:
        join_course = courseService.join_course(join_course_data)
        if not join_course:
            return jsonify({'error': 'Course does not exist'}), 400
        return jsonify({'message': 'Course joined'}), 200
    except:
        return jsonify({'error': 'Internal Server Error'}), 500

# Gets all course documents
@courseBp.route('/<courseId>/documents', methods=['GET'])
# @login_required
def get_course_documents(courseId):
    list_course_documents_data = {
        'course_id': courseId
    }
    documents = courseService.list_course_documents(list_course_documents_data)
    return jsonify(documents), 200

# Get all students in a course
@courseBp.route('/<courseId>/users', methods=['GET'])
# @login_required
def list_enrolled_students(courseId):
    list_enrolled_students_data = {
        'course_id': courseId
    }
    list_enrolled_students = courseService.list_enrolled_students(list_enrolled_students_data)
    return jsonify(list_enrolled_students), 200

# Removes student from course
@courseBp.route('/<courseId>/users/<student_id>', methods=['DELETE'])
# @login_required
def remove_student_from_course(courseId, student_id):
    remove_student_data = {
        'course_id': courseId,
        'student_id': student_id
    }
    remove_student = courseService.remove_student_from_course(remove_student_data)
    if not remove_student:
        return jsonify({'error': 'Student does not exist in course'}), 400
    return jsonify({'message': 'Student removed from course'}), 200

# Updates course details
@courseBp.route('/<courseId>', methods=['PUT'])
def update_course(courseId):
    data = request.get_json()
    update_course_data = {
        'course_id': courseId,
        'course_code': data['course_code'],
        'course_section': data['course_section'],
        'name': data['name'],
        'description': data['description']
    }
    update_course = courseService.update_course(update_course_data)
    if not update_course:
        return jsonify({'error': 'Course does not exist'}), 400
    return jsonify({'message': 'Course updated'}), 200