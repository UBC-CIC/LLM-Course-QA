from flask_login import login_user, logout_user

from ..data.models.user import User, Role
from ..extensions import db, bcrypt
from .courseService import get_course

# Registers a user
def register(create_user_data):
    from .courseService import get_courses
    user = User.query.filter_by(id=create_user_data['userId']).first()
    if user:
        return None

    # get all users, if count is 0, make user admin
    users = get_users()
    role = Role.Student
    if len(users) == 0:
        role = Role.Admin

    user = User(
        id = create_user_data['userId'],
        role = role
    )

    if user.role == 'Admin':
        courses = get_courses()
        user.courses = courses

    db.session.add(user)
    db.session.commit()

    return user.id

# Logs in user and creates a session
def login(login_data):
    user = User.query.filter_by(username=login_data['username']).first()
    if user is None:
        return None

    if bcrypt.check_password_hash(user.password, login_data['password']):
        login_user(user)
        return {"id": user.id, "role": user.role}

    return None

# Changes user password
def change_password(change_password_data):
    user = User.query.get(change_password_data['user_id'])
    if bcrypt.check_password_hash(user.password, change_password_data['old_password']):
        user.password = bcrypt.generate_password_hash(change_password_data['new_password']).decode('utf-8')
        db.session.commit()
        return True
    return False

def get_role(get_role_data):
    user = User.query.get(get_role_data['user_id'])
    role = "Admin" if str(user.role) == 'Role.Admin' else "instructor" if str(user.role) == 'Role.Instructor' else "Role.Student"

    return role

# Logs out user and invalidates the session
def logout():
    logout_user()
    return True

# Adds course to admins
def add_course_to_admins(course):
    users = User.query.filter_by(role=Role.Admin).all()
    for user in users:
        user.courses.append(course)
    db.session.commit()

# Gets user by id
def get_user(user_id):
    user = User.query.get(user_id)
    return user

# Gets all users
def get_users():
    print("Get all users")
    users = User.query.all()
    user_objects = []
    for user in users:
        role = "Admin" if str(user.role) == 'Role.Admin' else "instructor" if str(user.role) == 'Role.Instructor' else "Role.student"

        user_objects.append({
            'id': user.id,
            'name': user.name,
            'role': role
        })

    return user_objects

# Gets all instructors
def get_instructors():
    users = User.query.filter_by(role=Role.Instructor).all()
    user_objects = []
    for user in users:
        user_objects.append({
            'id': user.id,
            'name': user.name,
        })

    return user_objects

# Adds a user to a course
def add_user_to_course(add_user_data):
    user = User.query.get(add_user_data['user_id'])
    course = get_course(add_user_data['course_id'])
    if user and course:
        user.courses.append(course)
        db.session.commit()
        return True
    return False