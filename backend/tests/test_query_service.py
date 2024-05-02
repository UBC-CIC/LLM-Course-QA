import pytest
from unittest.mock import patch, MagicMock
from backend.business.queryService import query_list, conversation_history
from backend.data.models.query import Query
from backend.data.models.conversation import Conversation
from backend import create_app
import uuid
from datetime import datetime

@pytest.fixture(scope='module')
def app_context():
    app = create_app()
    with app.app_context():
        yield

@pytest.fixture
def mock_conversation(mock_queries):
    conversation = MagicMock()
    conversation.id = uuid.uuid4()
    conversation.queries = mock_queries
    return conversation

@pytest.fixture
def mock_queries():
    return [
        Query(id=uuid.uuid4(), question='What is pytest?', answer='A testing framework', date=datetime.now()),
        Query(id=uuid.uuid4(), question='How to use Flask?', answer='As a micro web framework', date=datetime.now())
    ]

@pytest.fixture
def mock_course():
    course = MagicMock()
    course.id = uuid.uuid4()
    course.course_code = 'CS101'
    return course

@pytest.fixture
def mock_conversations():
    return [
        Conversation(id=uuid.uuid4(), name='Conversation 1'),
        Conversation(id=uuid.uuid4(), name='Conversation 2')
    ]

# Test for query_list endpoint
@patch('backend.data.models.conversation.Conversation.query')
def test_query_list(mock_conversation_query, mock_conversation, app_context):
    mock_conversation_query.get.return_value = mock_conversation

    conversation_id = str(mock_conversation.id)
    result = query_list({'conversation_id': conversation_id})

    assert len(result['result']) == 2
    assert result['result'][0]['question'] == 'What is pytest?'
    assert result['result'][1]['answer'] == 'As a micro web framework'

# Test for conversation_history endpoint
@patch('backend.business.queryService.get_course')
@patch('backend.data.models.conversation.Conversation.query')
def test_conversation_history(mock_conversation_query, mock_get_course, mock_conversations, mock_course, app_context):
    mock_conversation_query.filter_by().order_by().all.return_value = mock_conversations
    mock_get_course.return_value = mock_course

    user_id = uuid.uuid4()
    course_id = mock_course.id
    result = conversation_history({'user_id': user_id, 'course_id': course_id})

    assert len(result['result']) == 2
    assert result['course_name'] == 'CS101'