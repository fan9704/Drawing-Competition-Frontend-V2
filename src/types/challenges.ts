export interface ChallengeType {
    id: string;
    name: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    image_url: string;
}

export interface ChallengeSubmissionType {
    id: string;
    code: string;
    time: Date;
    status: "success" | "fail" | "todo" | "doing";
    wordCount: number | string;
    fitness: number | string;
    score: number | string;
    execute_time: number | string;
    stdout: string;
    stderr: string;
}

export interface LeaderboardStatusType {
    name: string;
    matchRatio: number;
    executionTime: number;
    weightedScore: number;
}

export interface RoundType {
    id: string;
    start_time: Date;
    end_time: Date;
    challenges: ChallengeType[];
}
