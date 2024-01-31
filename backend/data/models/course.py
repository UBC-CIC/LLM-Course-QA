from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

db = SQLAlchemy()

class Course(db.Model):
    __tablename__ = 'courses'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    course_code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    access_code = Column(String, nullable=False)

    instructor_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    instructor = relationship('User', backref='courses_taught', foreign_keys=[instructor_id])

    admins = relationship('User', secondary='course_admins', backref='admin_courses')
    students = relationship('User', secondary='course_students', backref='courses')