from datetime import timezone, datetime

class AuthService:
    def __init__(self, logger, team):
        self.logger = logger
        self.team = team
