# import pytest
# from unittest.mock import patch
# from backend.business.userService import get_user
# from backend.data.models.user import User, Role
# from backend import create_app

# @pytest.fixture(scope='module')
# def app_context():
#     app = create_app()  
#     with app.app_context(): 
#         yield

# @pytest.fixture
# def mock_users():
#     return [
#         User(id='1', name='user1', username='user1', password='password', role=Role.Student),
#         User(id='2', name='user1', username='user2', password='password', role=Role.Student),
#         User(id='3', name='user1', username='user3', password='password', role=Role.Student),
#         User(id='4', name='user1', username='user4', password='password', role=Role.Instructor),
#         User(id='5', name='user1', username='user5', password='password', role=Role.Instructor),
#         User(id='6', name='user1', username='user6', password='password', role=Role.Admin)
#     ]

# # Testing get_user
# @patch('backend.data.models.user.User.query')
# def test_get_user(mock_query, mock_users, app_context):
#     mock_query.filter().first.return_value = mock_users[0]
#     result = get_user(mock_users[0].id)
#     assert result['id'] == mock_users[0].id
#     assert result['name'] == mock_users[0].name
#     assert result['username'] == mock_users[0].username
#     assert result['role'] == mock_users[0].role