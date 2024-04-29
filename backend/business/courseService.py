from ..data.models.course import Course
from ..data.models.user import User, Role
from ..data.models.document import Document, StatusEnum
from ..extensions import db, vecdb, session
from langchain_community.vectorstores import Chroma
from . import extractionService
from .embeddingService import embedding
from sqlalchemy import and_
import random
import threading

def create_course(create_course_data):
    from .userService import add_course_to_admins, get_user

    course = Course.query.filter_by(course_code=create_course_data['course_code']).first()
    if course:
        return None

    instructor = get_user(create_course_data['instructor_id'])

    if not instructor:
        return None

    if 'description' not in create_course_data:
        create_course_data['description'] = ""

    try:
        course = Course(
            course_code=create_course_data['course_code'],
            course_section=create_course_data['course_section'],
            name=create_course_data['name'],
            description=create_course_data['description'],
            access_code=random.randint(1000, 9999),
            users=[instructor]
        )

        db.session.add(course)
        db.session.commit()
        add_course_to_admins(course)

        # Creates s3 bucket for course
        s3 = session.client('s3')
        s3.put_object(Bucket='institutionname', Key=str(course.id) + "/")
        # Creates collection in vector store
        vecdb.create_collection(str(course.id))
    except:
        db.session.rollback()
        return None

    return course.id

def update_course(update_course_data):
    course = Course.query.get(update_course_data['course_id'])
    if course:
        course.course_code = update_course_data['course_code']
        course.course_section = update_course_data['course_section']
        course.name = update_course_data['name']
        course.description = update_course_data['description']
        db.session.commit()
        return True
    return False

def delete_course(course_delete_data):
    course = Course.query.get(course_delete_data['course_id'])
    if course:
        # Deletes course from s3
        s3 = session.client('s3')
        s3.delete_object(Bucket='institutionname', Key=str(course.id) + "/")
        db.session.delete(course)
        # Deletes collection from vector store
        vecdb.delete_collection(str(course.id))
        db.session.commit()
        return True
    return False


def join_course(join_course_data):
    from .userService import get_user
    course = Course.query.filter_by(access_code=join_course_data['access_code']).first()
    if course:
        user = get_user(join_course_data['user_id'])
        if user and user not in course.users:
            course.users.append(user)
            db.session.commit()
            return True
    return False

# Uploads course document to s3
def upload_course_document(course_document_data):
    print(course_document_data)
    file = course_document_data['document']
    if not file or file.content_type != 'application/pdf':
        return False
    try:
        s3 = session.client('s3')
        count = 0
        new_filename = file.filename

        # Renaming file with postfix if it already exists
        while Document.query.filter(and_(Document.course_id == course_document_data['course_id'], Document.name == new_filename)).first():
            parts = file.filename.split('.')
            postfix = str(count)
            if len(parts) > 1:
                extension = parts[-1]
                base_name = '.'.join(parts[:-1])
                new_filename = f"{base_name}_{postfix}.{extension}"
            else:
                new_filename = f"{file.filename}_{postfix}"
            count += 1

        # Adding file to document table
        file.filename = new_filename
        document = Document(
            name=file.filename,
            course_id=course_document_data['course_id'],
        )
        db.session.add(document)
        db.session.commit()
        s3.upload_fileobj(file, 'institutionname', str(document.course_id) + "/" + file.filename,
                          ExtraArgs={'Metadata': {'course_id': str(document.course_id),
                                                  'document_id': str(document.id)}})

        s3_url = "s3://institutionname/" + str(course_document_data['course_id']) + "/" + file.filename
        # add document to vector store
        thread = threading.Thread(target=vectorize_documents, args=(str(document.course_id), s3_url, str(document.id),))
        thread.start()
    except Exception as e:
        print(e)
        return False

    # return file name and id
    file_data = {
        'name': new_filename,
        'id': document.id
    }

    print("file_data: ", file_data)
    return file_data

def delete_course_document(course_document_data):
    document = Document.query.get(course_document_data['document_id'])
    if document:
        s3 = session.client('s3')
        s3_url = "s3://institutionname/" + str(document.course_id) + "/" + document.name
        s3.delete_object(Bucket='institutionname', Key=str(document.course_id) + "/" + document.name)
        course_id = str(document.course_id)
        db.session.delete(document)
        db.session.commit()
        # remove from vector store
        thread = threading.Thread(target=delete_document_vectors, args=(course_id, s3_url))
        thread.start()
        return True
    return False

# list course documents
def list_course_documents(list_course_documents_data):
    course_id = list_course_documents_data['course_id']
    documents = Document.query.filter_by(course_id=course_id).all()
    document_objects = []
    for document in documents:
        document_objects.append({
            'id': document.id,
            'name': document.name
        })
    return document_objects


# Returns courses where user is enrolled/teaching/administrating
def list_courses(list_courses_data):
    user_id = list_courses_data['user_id']
    courses = Course.query.filter(Course.users.any(id=user_id)).all()

    serialized_courses = []
    for course in courses:
        serialized_courses.append({
            'id': course.id,
            'course_code': course.course_code,
            'course_section': course.course_section,
            'name': course.name,
            'description': course.description,
            'access_code': course.access_code,
            'student_count': len(course.users)
        })

    return serialized_courses


# Gets all courses
def get_courses():
    courses = Course.query.all()
    return courses

# get course
def get_course(course_id):
    course = Course.query.get(course_id)
    return course

def vectorize_documents(course_id, s3_url, document_id):
    documents = extractionService.extract_text(s3_url, document_id)
    vectordb = Chroma(
    client=vecdb,
    collection_name=course_id,
    embedding_function=embedding,
    )

    vectordb.add_documents(documents=documents)
    print("Vectorized")

def delete_document_vectors(course_id, document_id):
    vectordb = Chroma(
    client=vecdb,
    collection_name=course_id,
    embedding_function=embedding,
    )

    # Ref: https://github.com/langchain-ai/langchain/discussions/9495#discussioncomment-7337796
    document_ids = vectordb.get(where = {'source': document_id})['ids']

    vectordb.delete(ids=document_ids)
    print("Deleted")

def list_enrolled_students(list_enrolled_students_data):
    course = Course.query.get(list_enrolled_students_data['course_id'])
    students = course.users

    student_objects = []
    for student in students:
        if student.role != Role.Student:
            continue
        student_objects.append({
            'id': student.id,
            'name': student.name,
            'role': "Student"
        })

    list_enrolled_students_response = {
        'students': student_objects,
        'access_code': course.access_code
    }

    return list_enrolled_students_response

def remove_student_from_course(remove_student_data):
    course = Course.query.get(remove_student_data['course_id'])
    if course:
        student = User.query.get(remove_student_data['student_id'])
        course.users.remove(student)
        db.session.commit()
        return True

    return False


