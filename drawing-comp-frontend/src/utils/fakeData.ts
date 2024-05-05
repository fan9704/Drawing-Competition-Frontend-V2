import {
    ChallengeCardType,
    ChallengeSubmissionType,
    ChallengeType,
    LeaderboardStatusType,
} from "../types/challenges";

export const R1ChallengeCards: ChallengeCardType[] = [
    {
        id: "1",
        name: "圓形",
        description: "畫一個圓形",
        difficulty: "easy",
        image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "2",
        name: "圓形",
        description: "畫一個圓形",
        difficulty: "easy",
        image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "3",
        name: "圓形",
        description: "畫一個圓形",
        difficulty: "medium",
        image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "4",
        name: "圓形",
        description: "畫一個圓形",
        difficulty: "medium",
        image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "5",
        name: "圓形",
        description: "畫一個圓形",
        difficulty: "hard",
        image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "6",
        name: "圓形",
        description: "畫一個圓形",
        difficulty: "hard",
        image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
];

export const SampleChallenge: ChallengeType = {
    id: "1",
    name: "圓形",
    description:
        "Velit occaecat consectetur adipisicing qui dolore amet nostrud deserunt deserunt. Commodo pariatur excepteur commodo esse fugiat cillum sit mollit et laborum Lorem sit mollit. Cillum sit laboris id fugiat esse. Dolor reprehenderit non aliqua proident Lorem laborum aliquip do aliqua cillum.",
    difficulty: "easy",
    image: "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    submissions: [
        {
            time: new Date(),
            status: "success",
            matchRatio: 100,
            codeLines: 10,
        },
    ],
};

export const LeaderboardStatus: LeaderboardStatusType[] = [
    {
        name: "第一隊",
        matchRatio: 100,
        executionTime: 100,
        weightedScore: 100,
    },
    {
        name: "第二隊",
        matchRatio: 90,
        executionTime: 100,
        weightedScore: 90,
    },
    {
        name: "第三隊",
        matchRatio: 80,
        executionTime: 100,
        weightedScore: 80,
    },
];

export const SubmissionData: ChallengeSubmissionType[] = [
    {
        codeLines: 10,
        matchRatio: 100,
        status: "success",
        time: new Date(),
    },
];
