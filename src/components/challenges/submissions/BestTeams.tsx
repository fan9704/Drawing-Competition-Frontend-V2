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
import { LeaderboardStatus } from "../../../utils/fakeData";
import { LeaderboardStatusType } from "../../../types/challenges";

interface BestTeamsProps {
    challengeId: string;
}

export default function BestTeams({ challengeId }: BestTeamsProps) {
    const bestTeamsQuery = useQuery<LeaderboardStatusType[]>({
        queryKey: ["bestTeams", challengeId],
        queryFn: () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(LeaderboardStatus);
                }, 3000);
            }),
        refetchInterval: 30000,
    });

    return (
        <>
            <h3 className="mt-4 mb-2 font-semibold">最佳隊伍</h3>
            <Table removeWrapper className="border rounded-md border-zinc-600">
                <TableHeader>
                    <TableColumn key="name">隊伍名稱</TableColumn>
                    <TableColumn key="matchRatio">吻合度</TableColumn>
                    <TableColumn key="executionTime">執行時間</TableColumn>
                    <TableColumn key="weightedScore">加權分數</TableColumn>
                </TableHeader>
                <TableBody
                    isLoading={bestTeamsQuery.isPending}
                    items={bestTeamsQuery.data ?? []}
                    loadingContent={<Spinner label="Loading" />}
                >
                    {(item) => (
                        <TableRow key={item.name}>
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
