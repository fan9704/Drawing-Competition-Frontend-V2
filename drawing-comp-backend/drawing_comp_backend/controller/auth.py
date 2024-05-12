from flask import jsonify, request, g, Blueprint, make_response

auth_bp = Blueprint('auth', __name__)


# @problem_bp.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404

# @problem_bp.route('/<string:invalid_path>')
# def handle_unmatched(*args, **kwargs):
#     return jsonify({"error": "Api not found"}), 404


@auth_bp.route("/", methods=["POST"])
def create_team():
    """
    Create Team
    Create Team API
    ---
    tags:
    - auth
    produces: application/json,
    responses:
        200:
            description: create success
            schema:
                properties:
                    token:
                        type: string
                        default: "1x46"
                        description: Your Team Token
    """
    data = request.get_json()  # Get the JSON payload
    team_name = data.get("name")
    team_token = g.auth_service.create_team(team_name)

    return make_response({"Team token": team_token})


@auth_bp.route("/<string:team_token>", methods=["GET"])
def query_team(team_token):
    """
    Get Team
    Retrieve a team by its token.
    ---
    tags:
    - auth
    produces: application/json
    parameters:
    - name: team_token
      in: path
      type: string
      required: true
      description: The token of the team to retrieve
    responses:
        200:
            description: Success
            schema:
                $ref: '#/definitions/Team'
        404:
            description: Team not found
            schema:
                $ref: '#/definitions/ErrorResponse'
    definitions:
        Team:
            type: object
            properties:
                id:
                    type: integer
                    description: Team ID
                name:
                    type: string
                    description: Team name
                token:
                    type: string
                    description: Team token
                submissions:
                    type: array
                    items:
                        $ref: '#/definitions/Submission'
        Submission:
            type: object
            properties:
                # Define Submission properties here if needed
        ErrorResponse:
            type: object
            properties:
                error:
                    type: string
                    description: Error message
    """
    team = g.auth_service.query_team(team_token)

    if team is None:
        return jsonify({"error": "Team not found"}), 404
    return make_response(team)


@auth_bp.route("/all_teams", methods=["GET"])
def query_all_teams():
    """
    List Teams
    Retrieve a list of all teams.
    ---
    tags:
    - auth
    produces: application/json
    responses:
        200:
            description: Success
            schema:
                type: array
                items:
                    $ref: '#/definitions/Team'
    definitions:
        Team:
            type: object
            properties:
                id:
                    type: integer
                    description: Team ID
                name:
                    type: string
                    description: Team name
                token:
                    type: string
                    description: Team token
                submissions:
                    type: array
                    items:
                        $ref: '#/definitions/Submission'
        Submission:
            type: object
            properties:
                # Define Submission properties here if needed
    """
    teams = g.auth_service.query_all_teams()
    return make_response(teams)
