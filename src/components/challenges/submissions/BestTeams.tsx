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
import { LeaderboardStatusType } from "../../../types/challenges";
import { toast } from "sonner";

interface BestTeamsProps {
    challengeId: string;
}

export default function BestTeams({ challengeId }: BestTeamsProps) {
    const bestTeamsQuery = useQuery<LeaderboardStatusType[]>({
        queryKey: ["bestTeams", challengeId],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/statistic/challenge/${challengeId}/top3Team/`,
            )
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(await res.text());
                    }
                    return res.json();
                })
                .catch((error) => {
                    toast.error("無法取得最佳隊伍資料，請找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                    console.error(error);
                }),
        refetchInterval: 30000,
    });

    return (
        <>
            <h3 className="mt-4 mb-2 font-semibold">最佳隊伍</h3>
            <Table
                removeWrapper
                className="border rounded-md border-zinc-600"
                aria-label="最佳隊伍"
            >
                <TableHeader>
                    <TableColumn key="team_name">隊伍名稱</TableColumn>
                    <TableColumn key="fitness">吻合度</TableColumn>
                    <TableColumn key="word_count">程式字數</TableColumn>
                    <TableColumn key="max_score">加權分數</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={bestTeamsQuery.isPending}
                    items={bestTeamsQuery.data ?? []}
                    loadingContent={<Spinner label="Loading" />}
                    emptyContent={"目前沒有隊伍成功解出本題"}
                >
                    {(item) => (
                        <TableRow key={item.team}>
                            {(columnKey) => (
                                <TableCell>
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
