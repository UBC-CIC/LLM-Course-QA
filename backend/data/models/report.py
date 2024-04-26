from sqlalchemy import Column, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ...extensions import db

class Report(db.Model):
    __tablename__ = 'reports'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    reason = Column(Text, nullable=False)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey('conversations.id'), nullable=False)
    instructor_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    
