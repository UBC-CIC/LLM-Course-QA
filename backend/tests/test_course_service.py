import pytest
from unittest.mock import patch
from backend.business.courseService import list_courses, get_courses
from backend.data.models.course import Course
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
        User(id='4', name='user1', username='user4', password='password', role=Role.Instructor)
    ]
    

@pytest.fixture
def mock_courses(mock_users):
    return [
        Course(id='1', course_code='CS101', course_section='001', name='Intro to Computer Science',
               description='Introduction to basic concepts of computer science', access_code='ABC123', users=[mock_users[0], mock_users[1]]),
        Course(id='2', course_code='CS102', course_section='002', name='Data Structures',
               description='Introduction to data structures', access_code='DEF456', users=[mock_users[0], mock_users[1]])
    ]


# Testing list_courses
@patch('backend.data.models.course.Course.query')
def test_list_courses_empty(mock_query, mock_users, app_context): 
    mock_query.filter().all.return_value = []
    result = list_courses({'user_id': mock_users[2].id})
    assert len(result) == 0

# Testing list_courses
@patch('backend.data.models.course.Course.query')
def test_list_courses9(mock_query, mock_courses, app_context): 
    mock_query.filter().all.return_value = mock_courses
    result = list_courses({'user_id': mock_courses[0].users[0].id})
    assert len(result) == 2