from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from flask_login import UserMixin
import uuid

db = SQLAlchemy()
class Role(Enum):
    Instructor = 1
    Student = 2
    Admin = 3

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = Column(String, nullable=False)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)

    # add relationship to courses 
    courses = relationship('Course', secondary='course_students', backref='students')

    def is_admin(self):
        return self.role == Role.Admin
    
    def is_instructor(self):
        return self.role == Role.Instructor
