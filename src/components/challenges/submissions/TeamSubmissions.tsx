import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Spinner,
    getKeyValue,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ChallengeSubmissionType } from "../../../types/challenges";
import { useEffect, useState } from "react";
import ViewSubmission from "./ViewSubmission";
import StatusChip from "./StatusChip";

import useCookie from "react-use-cookie";
import { useJwt } from "react-jwt";

interface TeamSubmissionsProps {
    challengeId: string;
}

export default function TeamSubmissions({ challengeId }: TeamSubmissionsProps) {
    const [viewingSubmission, setViewingSubmission] =
        useState<ChallengeSubmissionType | null>(null);

    const [teamToken] = useCookie("teamToken");
    const { decodedToken } = useJwt<{ sub: string; name: string }>(teamToken);

    const submissionQuery = useQuery({
        queryKey: ["submissions", challengeId, decodedToken?.sub],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/submission/challenge/${challengeId}/team/${decodedToken?.sub}/`,
            )
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(await res.text());
                    }
                    return res.json();
                })
                .then((data: any) => {
                    return data.map((sub: any) => ({
                        id: sub.id,
                        code: sub.code,
                        time: new Date(sub.time).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }),
                        status: <StatusChip status={sub.status} />,
                        statusEnum: sub.status,
                        fitness: sub.status === "success" ? sub.fitness : "-",
                        word_count:
                            sub.status === "success" ? sub.word_count : "-",
                        score: sub.status === "success" ? sub.score : "-",
                        execute_time:
                            sub.status === "success" ? sub.execute_time : "-",
                        stdout: sub.stdout,
                        stderr: sub.stderr,
                    }));
                }),
        refetchInterval: 3000,
    });

    return (
        <>
            <h3 className="mt-4 mb-2 font-semibold">你的投稿</h3>
            <Table removeWrapper className="border rounded-md border-zinc-600">
                <TableHeader>
                    <TableColumn key="time">投稿時間</TableColumn>
                    <TableColumn key="status">執行狀態</TableColumn>
                    <TableColumn key="fitness">吻合度</TableColumn>
                    <TableColumn key="word_count">程式字數</TableColumn>
                    <TableColumn key="score">分數</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={submissionQuery.isPending}
                    items={submissionQuery.data ?? []}
                    loadingContent={<Spinner label="Loading" />}
                >
                    {(item: any) => (
                        <TableRow
                            key={item.id}
                            className={`${item.statusEnum === "success" || item.statusEnum === "fail" ? "cursor-pointer" : ""}`}
                            onClick={() => {
                                if (
                                    item.statusEnum !== "success" &&
                                    item.statusEnum !== "fail"
                                )
                                    return;
                                setViewingSubmission(item);
                            }}
                        >
                            {(columnKey) => (
                                <TableCell>
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ViewSubmission
                subData={viewingSubmission}
                onClose={() => setViewingSubmission(null)}
            />
        </>
    );
}
