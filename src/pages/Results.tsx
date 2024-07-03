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

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function GameResults() {
    const { query, tableData } = useGameResultsQuery();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/round/`).then((res) => {
            if (res.status !== 204) navigate("/team");
        });
    }, [navigate]);

    return (
        <AppShell allowAnon>
            <div className="h-full w-full flex justify-center overflow-y-auto">
                <div className="my-20 w-full max-w-4xl ">
                    <h1 className="mt-4 font-bold text-5xl text-white">
                        遊戲結束！
                    </h1>
                    <h2 className="mt-4 text-2xl text-zinc-400">
                        檢視遊戲結果
                    </h2>
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
                    <div className="h-40 w-full flex-shrink-0" />
                </div>
            </div>
        </AppShell>
    );
}
