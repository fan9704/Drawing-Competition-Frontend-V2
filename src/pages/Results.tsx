import {
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";
import AppShell from "../components/shared/AppShell";
import { useGameResultsQuery } from "../utils/requests";

export default function GameResults() {
    const { query, tableData } = useGameResultsQuery();

    return (
        <AppShell>
            <div className="h-full w-full flex justify-center">
                <div className="mt-20 w-full max-w-4xl ">
                    <h1 className="mt-4 font-bold text-5xl text-white">
                        檢視遊戲結果
                    </h1>
                    <Table
                        removeWrapper
                        className="border rounded-md border-zinc-600 mt-8"
                    >
                        <TableHeader columns={tableData.header}>
                            {(column) => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
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
                </div>
            </div>
        </AppShell>
    );
}
