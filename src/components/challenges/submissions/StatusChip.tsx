import { Chip } from "@nextui-org/react";

export default function StatusChip({ status }: { status: string }) {
    return (
        <Chip
            className="text-white"
            color={
                status === "success"
                    ? "success"
                    : status === "fail"
                      ? "danger"
                      : status === "doing"
                        ? "warning"
                        : undefined
            }
        >
            {status === "success"
                ? "成功"
                : status === "fail"
                  ? "失敗"
                  : status === "doing"
                    ? "執行中"
                    : "等待執行中"}
        </Chip>
    );
}
