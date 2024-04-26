from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from enum import Enum
from ...extensions import db

class StatusEnum(Enum):
    PENDING = "pending"
    COMPLETE = "complete"


class Document(db.Model):
    __tablename__ = 'documents'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = Column(String, nullable=False)
    upload_status = db.Column(db.Enum(StatusEnum), default=StatusEnum.PENDING)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'), nullable=False)
