import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Code,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import StatusChip from "./submissions/StatusChip";
import useCookie from "react-use-cookie";
import { useJwt } from "react-jwt";
import { SubmissionQueryDisplay } from "../../types/challenges";
import { useEffect, useState } from "react";
import {
    drawingDefFuncCode,
    // finalExecCode,
} from "../../utils/templateTextConsts";

interface ConfirmUploadProps {
    code: string;
    challengeId: string;
    isOpen: boolean;
    onOpenChange: () => void;
}

export function ConfirmUpload({
    code,
    challengeId,
    isOpen,
    onOpenChange,
}: ConfirmUploadProps) {
    const [teamToken] = useCookie("teamToken");
    const { decodedToken } = useJwt<{ sub: string; name: string }>(teamToken);
    const [errors, setErrors] = useState<string[]>([]);

    const queryClient = useQueryClient();

    useEffect(() => {
        const finalErrors = [];
        console.log(code.includes(drawingDefFuncCode));
        if (!code.includes(drawingDefFuncCode)) {
            finalErrors.push(
                "沒有在你的程式碼中找到 drawing 函數的定義，你有使用模板嗎？",
            );
        }
        // if (!code.includes(finalExecCode)) {
        //     finalErrors.push(
        //         "你的程式碼似乎有變動最終執行程式的段落（if __name__ == ....），請將其復原成模板的程式",
        //     );
        // }
        console.log(finalErrors);
        setErrors(finalErrors);
    }, [code]);

    console.log(errors.length);

    const submitCodeMutation = useMutation({
        mutationFn: () =>
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submission/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                    team: parseInt(decodedToken?.sub ?? "0"),
                    challenge: parseInt(challengeId),
                }),
            }).then(async (res) => {
                if (!res.ok) {
                    throw new Error(await res.text());
                }
                return res.json();
            }),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["submissions", challengeId, decodedToken?.sub],
                refetchType: "all",
            });
            onOpenChange();
        },
        onSuccess: () => {
            toast.success("提交成功！");
            queryClient.setQueryData(
                ["submissions", challengeId, decodedToken?.sub],
                (oldData: SubmissionQueryDisplay[]) => [
                    {
                        id: uuidv4(),
                        code: code,
                        status: <StatusChip status="todo" />,
                        wordCount: "-",
                        fitness: "-",
                        execute_time: "-",
                        stdout: "",
                        stderr: "",
                        line_number: "-",
                        score: "-",
                        time: new Date().toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }),
                    },
                    ...oldData,
                ],
            );
        },
        onError: (error) => {
            toast.error("提交失敗，請再試一次！", {
                description: error.message ?? error,
            });
            console.error(error);
        },
    });

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            className="bg-zinc-800"
        >
            <ModalContent className="text-white">
                {(onClose) => (
                    <>
                        <ModalHeader>確認提交程式</ModalHeader>
                        <ModalBody>
                            請在最後檢查一下您的程式
                            <Code className="whitespace-pre max-h-[400px] overflow-scroll text-white bg-zinc-900 p-3">
                                {code}
                            </Code>
                            {errors.map((error, i) => (
                                <div
                                    key={i}
                                    className="w-full px-6 py-3 bg-red-300 rounded-md text-red-700 font-bold"
                                >
                                    {error}
                                </div>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>取消</Button>
                            <Button
                                isLoading={submitCodeMutation.isPending}
                                onPress={() => {
                                    submitCodeMutation.mutate();
                                }}
                                color="success"
                                className="disabled:hover:cursor-not-allowed"
                                isDisabled={errors.length > 0}
                            >
                                提交
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
