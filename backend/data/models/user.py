from sqlalchemy import Column, String, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .courseUsers import course_user_association
import uuid
import enum
from ...extensions import db

class Role(enum.Enum):
    Instructor = 'Instructor'
    Student = 'Student'
    Admin = 'Admin'

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = Column(String, nullable=False)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)
    courses = relationship('Course', secondary=course_user_association, backref='users')
    conversations = relationship('Conversation', backref='users')

    def is_admin(self):
        return self.role == Role.Admin

    def is_instructor(self):
        return self.role == Role.Instructor
