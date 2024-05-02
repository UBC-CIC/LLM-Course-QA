from flask_login import login_user, logout_user
from ..data.models.user import User, Role
from ..data.models.report import Report
from ..data.models.conversation import Conversation
from ..data.models.course import Course
from ..extensions import db
from .courseService import get_course

# Reports a conversation and assigns the report to the instructor
def report(report_data):
    conversation = Conversation.query.get(report_data['conversation_id'])
    if not conversation:
        return None

    course = Course.query.get(conversation.course_id)
    if not course:
        return None

    # Get the instructor of the course that the conversation belongs to
    instructor = User.query.join(Course.users) \
                        .filter(Course.id == conversation.course_id) \
                        .filter(User.role == Role.Instructor) \
                        .first()

    report = Report(
        instructor_id=instructor.id,
        conversation_id=report_data['conversation_id'],
        reason=report_data['reason']
    )

    db.session.add(report)
    db.session.commit()

    return report.id

# Retrieves all reports for an instructor
def list_reports(report_data):
    reports = Report.query.filter_by(instructor_id=report_data['instructor_id']).all()

    report_objects = []
    for report in reports:
        course = get_course(Conversation.query.get(report.conversation_id).course_id)
        report_objects.append({
            'report_id': report.id,
            'conversation_id': report.conversation_id,
            'reason': report.reason,
            'course_code': course.course_code
        })

    return report_objects

def delete_report(report_data):
    report = Report.query.get(report_data['report_id'])
    if report:
        db.session.delete(report)
        db.session.commit()
        return True
    return False