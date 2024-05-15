import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/react";
import { LeaderboardData } from "../../utils/fakeData";

export default function TeamLeaderboard() {
    const TableColumnData = [
        { key: "teamName", label: "隊伍名稱" },
        ...LeaderboardData[0].challengeStats.map((_, i) => ({
            key: `Q${i + 1}`,
            label: `Q${i + 1}`,
        })),
        { key: "totalScore", label: "隊伍總分" },
    ];

    const TableRowData = LeaderboardData.map((data) => {
        const row: { [key: string]: string | number } = {
            key: data.teamName,
            teamName: data.teamName,
        };
        data.challengeStats.forEach((score, i) => {
            row[`Q${i + 1}`] = score;
        });
        row.totalScore = data.challengeStats.reduce((a, b) => a + b, 0);
        return row;
    }).sort((a, b) => (b.totalScore as number) - (a.totalScore as number));

    return (
        <Table removeWrapper className="border rounded-md border-zinc-600">
            <TableHeader columns={TableColumnData}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody className="text-white" items={TableRowData}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => (
                            <TableCell className="text-white py-3">
                                {getKeyValue(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
