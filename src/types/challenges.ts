export interface ChallengeType {
    id: string;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    image_url: string;
}

export interface ChallengeSubmissionType {
    id: string;
    code: string;
    time: Date;
    statusEnum: "success" | "fail" | "todo" | "doing";
    word_count: number | string;
    fitness: number | string;
    score: number | string;
    execute_time: number | string;
    stdout: string;
    stderr: string;
    draw_image_url: string;
}

export interface LeaderboardStatusType {
    team: string;
    team_name: string;
    max_score: number;
    fitness: number;
    execute_time: number;
}

export interface RoundType {
    id: string;
    start_time: Date;
    end_time: Date;
    challenges: ChallengeType[];
}

export interface SubmissionQueryDisplay {
    id: string;
    code: string;
    status: React.ElementType;
    wordCount: string;
    fitness: string;
    execute_time: string;
    stdout: string;
    stderr: string;
    line_number: string;
    score: string | number;
    time: string;
}
