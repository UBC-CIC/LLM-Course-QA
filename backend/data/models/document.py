from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .courseUsers import course_user_association
import uuid
from ...extensions import db

class Document(db.Model):
    __tablename__ = 'documents'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = Column(String, nullable=False)
    
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'), nullable=False)





