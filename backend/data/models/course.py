from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .courseUsers import course_user_association
import uuid
from ...extensions import db

class Course(db.Model):
    __tablename__ = 'courses'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    course_code = Column(String, nullable=False)
    course_section = Column(String, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    access_code = Column(String, nullable=False)
    documents = relationship('Document', backref='course')
    # conversations = relationship('Conversation', backref='course')