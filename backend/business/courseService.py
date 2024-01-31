from ..data.models.user import User
from ..data.models.course import Course
from .. import db
def register(create_user_data):
    # check if user already exists
    user = User.query.filter_by(username=create_user_data['username']).first()
    if user:
        return None
    
    user = User(
        name=create_user_data['name'],
        username=create_user_data['username'],
        password=create_user_data['password'],
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
    if user and user.password == login_data['password']:
        return user.id
    return None