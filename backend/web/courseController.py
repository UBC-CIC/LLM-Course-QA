from flask import Blueprint, request, jsonify
from ..business import courseService

bp = Blueprint('course', __name__, url_prefix='/courses')

@bp.route('/create', methods=['POST'])
def create_course():
    data = request.get_json()
    return courseService.create_course(data)

@bp.route('/delete', methods=['DELETE'])
def delete_course():
    data = request.get_json()
    return courseService.delete_course(data)
