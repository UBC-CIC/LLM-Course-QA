from ..data.models.course import Course
from ..extensions import db
import random
import boto3
from langchain.document_loaders import AmazonTextractPDFLoader

def create_course(create_course_data):
    from .userService import add_course_to_admins, get_user

    course = Course.query.filter_by(course_code=create_course_data['course_code']).first()
    if course:
        return None
    
    instructor = get_user(create_course_data['instructor'])

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
            access_code= random.randint(1000, 9999),
            users = [instructor]
        )

        db.session.add(course)
        db.session.commit()
        add_course_to_admins(course)

        # create s3 bucket for course
        session = boto3.Session(profile_name='')
        s3 = session.client('s3')
        s3.put_object(Bucket='institutionname', Key=str(course.id) + "/")

    except:
        db.session.rollback()
        return None

    return course.id

def delete_course(course_delete_data):
    course = Course.query.get(course_delete_data['course_id'])
    if course:
        db.session.delete(course)
        db.session.commit()
        return True
    return False

def upload_course_document(course_document_data):
    # check if document is a pdf
    file = course_document_data['document']
    if not file or file.content_type != 'application/pdf':
        return False
    session = boto3.Session(profile_name='')

    try:
        s3 = session.client('s3')
        # upload file to s3 bucket named institutionname in folder course id
        s3.upload_fileobj(file, 'institutionname', str(course_document_data['course_id']) + "/" + file.filename)
    except:
        return False
   
    return True
    

def get_courses():
    courses = Course.query.all()
    return courses



    