from flask import url_for, jsonify, request, g, Blueprint, render_template
from datetime import datetime

challenge_bp = Blueprint('challenge', __name__)

"""
### Round
"""


@challenge_bp.route("/rounds", methods=["POST"])
def create_round():
    data = request.get_json()  # Get the JSON payload
    start_time_str = data.get("start_time")
    end_time_str = data.get("end_time")

    try:
        # Convert string to datetime objects
        start_time = datetime.strptime(start_time_str, '%Y/%m/%d %H:%M:%S')
        end_time = datetime.strptime(end_time_str, '%Y/%m/%d %H:%M:%S')

        round_id = g.challenge_service.create_round(start_time, end_time)
        return jsonify({"Round id": round_id})
    except ValueError as e:
        return jsonify({"error": "Invalid date format. Please use 'YYYY/MM/DD HH:MM:SS' format."}), 400


@challenge_bp.route("/rounds/<string:round_id>", methods=["GET"])
def query_round(round_id):
    round = g.challenge_service.query_round(round_id)

    if round is None:
        return jsonify({"error": "Team not found"}), 404
    return jsonify(round)


@challenge_bp.route("/rounds/<string:round_id>", methods=["DELETE"])
def delete_round(round_id):
    result = g.challenge_service.del_round(round_id)
    if not result:
        return jsonify({"error": "Round not found"}), 404
    return jsonify({"Round deleted": round_id})


@challenge_bp.route("/all_rounds", methods=["GET"])
def query_all_rounds():
    rounds = g.challenge_service.query_all_rounds()
    return jsonify(rounds)


""" 
### Challenge
"""


@challenge_bp.route("/", methods=["POST"])
def create_challenge():
    data = request.get_json()
    round_id = data.get("round_id")
    challenge_id = g.challenge_service.create_challenge(round_id)
    return jsonify({"Create challenge": challenge_id})


@challenge_bp.route("/<string:challenge_id>", methods=["GET"])
def query_challenge(challenge_id):
    challenge = g.challenge_service.query_challenge(challenge_id)
    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404
    return jsonify(challenge)


@challenge_bp.route("/<string:challenge_id>", methods=["DELETE"])
def delete_challenge(challenge_id):
    challenge_id = g.challenge_service.del_challenge(challenge_id)
    if not challenge_id:
        return jsonify({"error": "No challenge to be deleted"}), 404
    return jsonify({"Challenge deleted": challenge_id})


@challenge_bp.route("/<string:challenge_id>", methods=["PUT"])
def update_challenge(challenge_id):
    data = request.get_json()
    description = data.get("description")
    image_url = data.get("image_url")
    round_id = data.get("round_id")
    challenge_id = g.challenge_service.update_challenge(challenge_id, description, image_url, round_id)
    if not challenge_id:
        return jsonify({"error": "No challenge to be updated"}), 404
    return jsonify({"Challenge updated": challenge_id})
