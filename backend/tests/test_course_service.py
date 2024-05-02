import pytest
from unittest.mock import MagicMock, patch
from backend.business.courseService import join_course, list_courses, get_courses, get_course, list_enrolled_students, remove_student_from_course
from backend.data.models.course import Course
from backend.data.models.user import User, Role
from backend import create_app
import uuid

@pytest.fixture(scope='module')
def app_context():
    app = create_app()
    with app.app_context():
        yield

@pytest.fixture
def mock_users():
    return [
        User(id=uuid.uuid4(), name='user1', username='user1', password='password', role=Role.Student),
        User(id=uuid.uuid4(), name='user1', username='user2', password='password', role=Role.Student),
        User(id=uuid.uuid4(), name='user1', username='user3', password='password', role=Role.Student),
        User(id=uuid.uuid4(), name='user1', username='user4', password='password', role=Role.Instructor)
    ]


@pytest.fixture
def mock_courses(mock_users):
    return [
        Course(id='1', course_code='CS101', course_section='001', name='Intro to Computer Science',
               description='Introduction to basic concepts of computer science', access_code='ABC123', users=[mock_users[0], mock_users[1]]),
        Course(id='2', course_code='CS102', course_section='002', name='Data Structures',
               description='Introduction to data structures', access_code='DEF456', users=[mock_users[0], mock_users[1]])
    ]


# Testing join_course
@patch('backend.data.models.course.Course.query')
@patch('backend.business.userService.get_user')
def test_join_course(mock_get_user, mock_query, mock_users, mock_courses, app_context):
    mock_query.filter_by.return_value.first.return_value = mock_courses[0]

    # Setup mock for get_user
    mock_get_user.return_value = mock_users[2]
    mock_query.get.return_value = mock_courses[0]
    result = join_course({'user_id': mock_users[2].id, 'access_code': 'ABC123'})

    assert result is True

# Testing join_course with invalid access_code
@patch('backend.data.models.course.Course.query')
def test_join_course_invalid(mock_query, mock_users, mock_courses, app_context):
    mock_query.get.return_value = None
    result = join_course({'user_id': mock_users[2].id, 'access_code': 'invalid'})
    assert result is False

# Testing join_course with invalid user_id
@patch('backend.data.models.course.Course.query')
def test_join_course_invalid_user(mock_query, mock_users, mock_courses, app_context):
    mock_query.get.return_value = mock_courses[0]
    result = join_course({'user_id': uuid.uuid4(), 'access_code': 'ABC123'})
    assert result is False

# Testing list_courses
@patch('backend.data.models.course.Course.query')
def test_list_courses(mock_query, mock_courses, app_context):
    mock_query.filter().all.return_value = mock_courses
    result = list_courses({'user_id': mock_courses[0].users[0].id})
    assert len(result) == 2

# Testing list_courses with a user not enrolled in any courses
@patch('backend.data.models.course.Course.query')
def test_list_courses_empty(mock_query, mock_users, app_context):
    mock_query.filter().all.return_value = []
    result = list_courses({'user_id': mock_users[2].id})
    assert len(result) == 0

# Testing get_courses
@patch('backend.data.models.course.Course.query')
def test_get_courses(mock_query, mock_courses, app_context):
    mock_query.all.return_value = mock_courses
    result = get_courses()
    assert len(result) == 2
    assert result[0].course_code == 'CS101'
    assert result[1].course_code == 'CS102'
    assert len(result[0].users) == 2
    assert len(result[1].users) == 2

# Testing get_course
@patch('backend.data.models.course.Course.query')
def test_get_course(mock_query, mock_courses, app_context):
    mock_query.get.return_value = mock_courses[0]
    result = get_course(mock_courses[0].id)
    assert result.course_code == 'CS101'
    assert result.course_section == '001'

# Testing get_course with invalid course_id
@patch('backend.data.models.course.Course.query')
def test_get_course_invalid(mock_query, mock_courses, app_context):
    mock_query.get.return_value = None
    result = get_course('invalid')
    assert result is None

# Testing list_enrolled_students
@patch('backend.data.models.course.Course.query')
def test_list_enrolled_students(mock_query, mock_courses, app_context):
    mock_query.get.return_value = mock_courses[0]
    result = list_enrolled_students({'course_id': mock_courses[0].id})
    assert len(result) == 2

# Testing list_enrolled_students with invalid course_id
@patch('backend.data.models.course.Course.query')
def test_list_enrolled_students_invalid(mock_query, mock_courses, app_context):
    mock_query.get.return_value = None
    result = list_enrolled_students({'course_id': 'invalid'})
    assert result is None


@patch('backend.data.models.course.Course.query')
@patch('backend.data.models.user.User.query')
def test_remove_student_from_course(mock_user_query, mock_course_query, mock_courses, mock_users):
    mock_course_query.get.return_value = mock_courses[0]
    mock_user_query.get.return_value = mock_users[1]

    result = remove_student_from_course({'course_id': str(mock_courses[0].id), 'student_id': str(mock_users[1].id)})

    assert result == True
    assert mock_users[1] not in mock_courses[0].users

# Testing remove_student_from_course with invalid course_id
@patch('backend.data.models.course.Course.query')
def test_remove_student_from_course_invalid_course(mock_query, mock_courses, mock_users, app_context):
    mock_query.get.return_value = None
    result = remove_student_from_course({'course_id': 'invalid', 'user_id': mock_users[0].id})
    assert result is False

# Testing remove_student_from_course with invalid user_id
@patch('backend.data.models.course.Course.query')
def test_remove_student_from_course_invalid_user(mock_query, mock_courses, mock_users, app_context):
    mock_query.get.return_value = mock_courses[0]
    result = remove_student_from_course({'course_id': mock_courses[0].id, 'student_id': uuid.uuid4()})
    assert result is False
