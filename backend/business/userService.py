from ..data.models.user import User
from ..data.models.course import Course
from flask import current_app
from flask_login import login_user, logout_user

def register(create_user_data):
    print("registering user")
    # check if user already exists
    user = User.query.filter_by(username=create_user_data['username']).first()
    if user:
        return None
    bcrypt = current_app.bcrypt
    db = current_app.db
    hashed_password = bcrypt.generate_password_hash(create_user_data['password']).decode('utf-8')
    user = User(
        name=create_user_data['name'],
        username=create_user_data['username'],
        password=hashed_password,
        role=create_user_data['role']
    )

    if user.role == 'Admin':
        courses = Course.query.all()  
        user.courses = courses

    db.session.add(user)
    db.session.commit()

    return user.id

def login(login_data):
    user = User.query.filter_by(username=login_data['username']).first()
    if user is None:
        return None
    bcrypt = current_app.bcrypt
    db = current_app.db
    if bcrypt.check_password_hash(user.password, login_data['password']):
        login_user(user)
        return user.id
    
    return None

def logout():
    logout_user()
    return True  
