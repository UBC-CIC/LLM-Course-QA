from sqlalchemy import Column, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ...extensions import db

class Query(db.Model):
    __tablename__ = 'queries'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    date = Column(DateTime, default=db.func.current_timestamp())
    conversation_id = Column(UUID(as_uuid=True), ForeignKey('conversations.id'), nullable=False)
