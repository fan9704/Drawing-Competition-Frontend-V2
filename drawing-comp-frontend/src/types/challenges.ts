export interface ChallengeCardType {
    id: string;
    name: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    image: string;
}

export interface ChallengeSubmissionType {
    time: Date;
    status: "success" | "fail" | "pending";
    codeLines: number;
    matchRatio: number;
}

export interface LeaderboardStatusType {
    name: string;
    matchRatio: number;
    executionTime: number;
    weightedScore: number;
}

export interface ChallengeType extends ChallengeCardType {
    submissions: ChallengeSubmissionType[];
}
