import pytest
from unittest.mock import patch
from backend.business.userService import get_user, get_users, register, login, change_password, add_course_to_admins
from backend.data.models.user import User, Role
from backend import create_app

@pytest.fixture(scope='module')
def app_context():
    app = create_app()  
    with app.app_context(): 
        yield

@pytest.fixture
def mock_users():
    return [
        User(id='1', name='user1', username='user1', password='password', role=Role.Student),
        User(id='2', name='user1', username='user2', password='password', role=Role.Student),
        User(id='3', name='user1', username='user3', password='password', role=Role.Student),
        User(id='4', name='user1', username='user4', password='password', role=Role.Instructor),
        User(id='5', name='user1', username='user5', password='password', role=Role.Instructor),
        User(id='6', name='user1', username='user6', password='password', role=Role.Admin)
    ]
    

# Testing register
@patch('backend.data.models.user.User.query')
def test_register(mock_query, mock_users, app_context):
    mock_query.filter_by().first.return_value = None
    result = register({'name': 'user7', 'username': 'user7', 'password': 'password', 'role': 'Student'})
    assert result is not None
    
# Testing register with existing user
@patch('backend.data.models.user.User.query')
def test_register_existing(mock_query, mock_users, app_context):
    mock_query.filter_by().first.return_value = mock_users[0]
    result = register({'name': 'user1', 'username': 'user1', 'password': 'password', 'role': 'Student'})
    assert result == mock_users[0].id    
    
# Testing login
@patch('backend.data.models.user.User.query')
def test_login(mock_query, mock_users, app_context):
    mock_query.filter_by().first.return_value = mock_users[0]
    result = login({'username': 'user1', 'password': 'password'})
    assert result['id'] == mock_users[0].id
    assert result['role'] == mock_users[0].role
    
# Testing login with invalid username
@patch('backend.data.models.user.User.query')
def test_login_invalid(mock_query, mock_users, app_context):
    mock_query.filter_by().first.return_value = None
    result = login({'username': 'invalid', 'password': 'password'})
    assert result is None

# Testing change_password
@patch('backend.data.models.user.User.query')
def test_change_password(mock_query, mock_users, app_context):
    mock_query.get.return_value = mock_users[0]
    result = change_password({'user_id': mock_users[0].id, 'old_password': 'password', 'new_password': 'new_password'})
    assert result is True

# Testing change_password with incorrect old password
@patch('backend.data.models.user.User.query')
def test_change_password_invalid(mock_query, mock_users, app_context):
    mock_query.get.return_value = mock_users[0]
    result = change_password({'user_id': mock_users[0].id, 'old_password': 'invalid', 'new_password': 'new_password'})
    assert result is False

# Testing get_user
@patch('backend.data.models.user.User.query')
def test_get_user(mock_query, mock_users, app_context):
    mock_query.filter().first.return_value = mock_users[0]
    result = get_user(mock_users[0].id)
    assert result['id'] == mock_users[0].id
    assert result['name'] == mock_users[0].name
    assert result['username'] == mock_users[0].username
    assert result['role'] == mock_users[0].role
    
# Testing get_user with invalid user_id
@patch('backend.data.models.user.User.query')
def test_get_user_invalid(mock_query, mock_users, app_context):
    mock_query.filter().first.return_value = None
    result = get_user('invalid')
    assert result is None
    
# Testing get_users
@patch('backend.data.models.user.User.query')
def test_get_users(mock_query, mock_users, app_context):
    mock_query.all.return_value = mock_users
    result = get_users()
    assert len(result) == 6
    assert result[0]['id'] == mock_users[0].id
    assert result[1]['id'] == mock_users[1].id
    assert result[2]['id'] == mock_users[2].id
    assert result[3]['id'] == mock_users[3].id
    assert result[4]['id'] == mock_users[4].id
    assert result[5]['id'] == mock_users[5].id