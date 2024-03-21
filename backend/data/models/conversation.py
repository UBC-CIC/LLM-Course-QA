from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from ...extensions import db

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    date = Column(DateTime, default=db.func.current_timestamp())
    thread_name = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'), nullable=False)
    queries = relationship('Query', backref='conversations')