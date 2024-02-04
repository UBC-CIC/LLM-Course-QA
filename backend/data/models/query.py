from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from ...extensions import db

class Query(db.Model):
    __tablename__ = 'queries'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    date = Column(DateTime, default=db.func.current_timestamp())
    
    student_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    student = relationship('User', backref='queries')

    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'), nullable=False)
    course = relationship('Course', backref='queries')