from flask import Blueprint, request, jsonify
from ..business import reportService

reportBp = Blueprint('report', __name__, url_prefix='/reports')

@reportBp.route('', methods=['POST'])
def report():
    data = request.get_json()

    report_data = {
        'conversation_id': data['conversation_id'],
        'reason': data['reason'],
    }

    report_id = reportService.report(report_data)

    if report_id:
        return jsonify({'id': report_id}), 201
    else:
        return jsonify({'error': 'Report already exists'}), 400

@reportBp.route('/<instructor_id>', methods=['GET'])
def list_reports(instructor_id):
    report_data = {
        'instructor_id': instructor_id
    }

    reports = reportService.list_reports(report_data)

    if reports:
        return jsonify(reports), 200
    else:
        return jsonify({'error': 'Error getting reports'}), 400

@reportBp.route('/<report_id>', methods=['DELETE'])
def delete_report(report_id):
    delete_data = {
        'report_id': report_id
    }

    delete_status = reportService.delete_report(delete_data)

    if delete_status:
        return jsonify({'message': 'Report deleted'}), 200
    else:
        return jsonify({'error': 'Error deleting report'}), 400




