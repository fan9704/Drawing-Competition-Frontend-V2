class ChallengeService:
    def __init__(self, logger, challenges, rounds):
        self.logger = logger
        self.challenges = challenges
        self.rounds = rounds
    """
    ### Round
    """
    def create_round(self, start_time, end_time):
        round_id = self.rounds.create_round(start_time, end_time)
        return round_id
    
    def query_round(self, round_id):
        round = self.rounds.query_round(round_id)
        if not round:
            self.logger.error(f"Round not found: {round_id}")
        return round
    
    def del_round(self, round_id):
        round = self.rounds.query_round(round_id)
        if not round:
            self.logger.error(f"Round not found: {round_id}")
        result = self.rounds.del_round(round_id)
        return result

    def query_all_rounds(self):
        rounds = self.rounds.query_all_rounds()
        return rounds
    """
    ### Challenge
    """

    def create_challenge(self, round_id):
        challenge_id = self.challenges.create_challenge(round_id)
        return challenge_id
    def query_challenge(self, challenge_id):
        challenge = self.challenges.query_challenge(challenge_id)
        if not challenge:
            self.logger.error(f"Challenge not found: {challenge_id}")
        return challenge
    def del_challenge(self, challenge_id):
        challenge = self.challenges.query_challenge(challenge_id)
        if not challenge:
            self.logger.error(f"No Challenge to delete: {challenge_id}")
        challenge_id = self.challenges.del_challenge(challenge_id)
        return challenge_id
    def update_challenge(self, challenge_id, description, image_url, round_id): 
        challenge = self.challenges.query_challenge(challenge_id)
        if not challenge:
            self.logger.error(f"No challenge to update: {challenge_id}")
        challenge_id = self.challenges.update_challenge(challenge_id, description, image_url, round_id)
        return challenge_id