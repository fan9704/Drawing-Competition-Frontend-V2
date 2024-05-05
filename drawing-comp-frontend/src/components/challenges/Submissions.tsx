import { Chip } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/react";

import { ComputerDesktopIcon } from "@heroicons/react/16/solid";
import { LeaderboardStatus, SubmissionData } from "../../utils/fakeData";

export function Submissions() {
    const LBStatData = LeaderboardStatus;
    const TeamSubData = SubmissionData;

    return (
        <div className="w-full pt-4 p-6 rounded-md bg-zinc-800 border border-zinc-400 text-white bg-opacity-70">
            <Chip className="bg-blue-600 bg-opacity-60 ">
                <div className="flex items-center gap-1">
                    <ComputerDesktopIcon className="text-white w-4" />
                    <h2 className="text-zinc-100 font-medium">各隊投稿</h2>
                </div>
            </Chip>
            <h3 className="mt-4 mb-2 font-semibold">最佳隊伍</h3>
            <Table removeWrapper className="border rounded-md border-zinc-600">
                <TableHeader>
                    <TableColumn>隊伍名稱</TableColumn>
                    <TableColumn>吻合度</TableColumn>
                    <TableColumn>執行時間</TableColumn>
                    <TableColumn>加權分數</TableColumn>
                </TableHeader>
                <TableBody>
                    {LBStatData.map((data, i) => (
                        <TableRow key={i}>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.matchRatio}</TableCell>
                            <TableCell>{data.executionTime}</TableCell>
                            <TableCell>{data.weightedScore}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <h3 className="mt-4 mb-2 font-semibold">你的投稿</h3>
            <Table removeWrapper className="border rounded-md border-zinc-600">
                <TableHeader>
                    <TableColumn>投稿時間</TableColumn>
                    <TableColumn>執行狀態</TableColumn>
                    <TableColumn>吻合度</TableColumn>
                    <TableColumn>程式行數</TableColumn>
                </TableHeader>
                <TableBody>
                    {TeamSubData.map((data, i) => (
                        <TableRow key={i}>
                            <TableCell>{data.time.toISOString()}</TableCell>
                            <TableCell>
                                <Chip
                                    className="text-white"
                                    color={
                                        data.status === "success"
                                            ? "success"
                                            : data.status === "fail"
                                              ? "danger"
                                              : "warning"
                                    }
                                >
                                    {data.status === "success"
                                        ? "成功"
                                        : data.status === "fail"
                                          ? "失敗"
                                          : "等待中"}
                                </Chip>
                            </TableCell>
                            <TableCell>{data.matchRatio}</TableCell>
                            <TableCell>{data.codeLines}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
