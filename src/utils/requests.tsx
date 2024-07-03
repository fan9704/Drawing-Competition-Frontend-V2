import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChallengeType } from "../types/challenges";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRoundQuery() {
    const navigate = useNavigate();

    const roundDataQuery = useQuery<{
        id: string;
        start_time: Date;
        end_time: Date;
        challenge_list: ChallengeType[];
    }>({
        queryKey: ["roundData"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/round/`)
                .then(async (res) => {
                    if (!res.ok) {
                        if (res.status === 404) {
                            return null;
                        }
                        throw new Error(await res.text());
                    }
                    if (res.status === 204) {
                        navigate("/results");
                        return null;
                    }
                    return res.json();
                })
                .catch((error) => {
                    toast.error("無法取得題目資料，請找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                    console.error(error);
                }),
        refetchInterval: 20000,
    });
    return roundDataQuery;
}

export function useRoundLeaderboardQuery({ roundId }: { roundId: string }) {
    const [tableData, setTableData] = useState<{
        header: { key: string; label: string }[];
        body: { [key: string]: string | number }[];
    }>({
        header: [
            { key: "teamName", label: "隊伍名稱" },
            { key: "totalScore", label: "隊伍總分" },
        ],
        body: [],
    });

    const query = useQuery<
        {
            team_id: string;
            team_name: string;
            total_score: number;
            score_list: number[];
        }[]
    >({
        queryKey: ["roundLeaderboard", roundId],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/statistic/round/${roundId}/allTeam`,
            )
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(await res.text());
                    }
                    return res.json();
                })
                .then((res) =>
                    res.map((team: any) => ({
                        ...team,
                        total_score: team.score_list.reduce(
                            (a: number, b: number) => a + b,
                            0,
                        ),
                    })),
                )
                .catch((error) => {
                    toast.error("索引排行榜時發生錯誤，請尋找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                }),
    });

    useEffect(() => {
        if (!query.data) return;

        const TableColumnData = [
            { key: "teamName", label: "隊伍名稱" },
            ...query.data[0].score_list.map((_, i) => ({
                key: `Q${i + 1}`,
                label: `Q${i + 1}`,
            })),
            { key: "totalScore", label: "隊伍總分" },
        ];
        const TableRowData = query.data
            .map((data) => {
                const row: { [key: string]: string | number } = {
                    key: data.team_name,
                    teamName: data.team_name,
                    totalScore: data.total_score,
                };
                data.score_list.forEach((score, i) => {
                    row[`Q${i + 1}`] = score;
                });
                return row;
            })
            .sort(
                (a, b) => (b.totalScore as number) - (a.totalScore as number),
            );
        setTableData({
            header: TableColumnData,
            body: TableRowData,
        });
    }, [query.data]);

    return { query, tableData };
}

export function useGameResultsQuery() {
    const [tableData, setTableData] = useState<{
        header: { key: string; label: string }[];
        body: { [key: string]: string | number }[];
    }>({
        header: [
            { key: "teamName", label: "隊伍名稱" },
            { key: "totalScore", label: "隊伍總分" },
        ],
        body: [],
    });

    const query = useQuery<
        {
            team_id: string;
            team_name: string;
            round_id_list: number[];
            total_score_list: number[];
        }[]
    >({
        queryKey: ["gameLeaderboard"],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/statistic/round/allTeam/`,
            )
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(await res.text());
                    }
                    return res.json();
                })
                .catch((error) => {
                    toast.error("索引排行榜時發生錯誤，請尋找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                }),
    });

    useEffect(() => {
        if (!query.data) return;

        const TableColumnData = [
            { key: "teamName", label: "隊伍名稱" },
            ...query.data[0].round_id_list.map((_, i) => ({
                key: `Q${i + 1}`,
                label: `Q${i + 1}`,
            })),
            { key: "totalScore", label: "隊伍總分" },
        ];
        const TableRowData = query.data
            .map((data) => {
                const row: { [key: string]: string | number } = {
                    key: data.team_name,
                    teamName: data.team_name,
                    totalScore: data.total_score_list.reduce(
                        (prev, cur) => prev + cur,
                        0,
                    ),
                };
                data.total_score_list.forEach((score, i) => {
                    row[`Q${i + 1}`] = score;
                });
                return row;
            })
            .sort(
                (a, b) => (b.totalScore as number) - (a.totalScore as number),
            );
        setTableData({
            header: TableColumnData,
            body: TableRowData,
        });
    }, [query.data]);

    return { query, tableData };
}
