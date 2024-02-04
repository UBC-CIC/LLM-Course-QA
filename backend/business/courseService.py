from ..data.models.course import Course
from ..extensions import db
import random

def create_course(create_course_data):
    from .userService import add_course_to_admins, get_user

    # check if course code and course section
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
    except:
        db.session.rollback()
        return None

    return course.id



def get_courses():
    courses = Course.query.all()
    return courses



    