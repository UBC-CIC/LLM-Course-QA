from flask_login import login_user, logout_user

from ..data.models.user import User
from ..extensions import db, bcrypt

# Registers a user
def register(create_user_data):
    from .courseService import get_courses

    user = User.query.filter_by(username=create_user_data['username']).first()
    if user:
        return None
    hashed_password = bcrypt.generate_password_hash(create_user_data['password']).decode('utf-8')
    user = User(
        name=create_user_data['name'],
        username=create_user_data['username'],
        password=hashed_password,
        role=create_user_data['role']
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
    print(user.is_admin())
    if user is None:
        return None

    if bcrypt.check_password_hash(user.password, login_data['password']):
        login_user(user)
        return {"id": user.id, "role": user.role}
    
    return None

# Logs out user and invalidates the session
def logout():
    logout_user()
    return True  

def add_course_to_admins(course):
    users = User.query.filter_by(role='Admin').all()
    for user in users:
        user.courses.append(course)
    db.session.commit()

# Gets user by id
def get_user(user_id):
    user = User.query.get(user_id)
    return user


