from sqlalchemy.dialects.postgresql import UUID
from ...extensions import db

course_user_association = db.Table('user_course',
    db.Column('user_id', UUID(as_uuid=True), db.ForeignKey('users.id'), primary_key=True),
    db.Column('course_id', UUID(as_uuid=True), db.ForeignKey('courses.id'), primary_key=True)
)