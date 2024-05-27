import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    Spinner,
} from "@nextui-org/react";
import { useRoundLeaderboardQuery } from "../../utils/requests";

interface RoundLeaderboardProps {
    roundId: string;
}

export default function RoundLeaderboard({ roundId }: RoundLeaderboardProps) {
    const { query, tableData } = useRoundLeaderboardQuery({ roundId });

    return (
        <Table removeWrapper className="border rounded-md border-zinc-600">
            <TableHeader columns={tableData.header}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                className="text-white"
                items={tableData.body}
                isLoading={query.isPending}
                loadingContent={<Spinner label="Loading..." />}
            >
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
