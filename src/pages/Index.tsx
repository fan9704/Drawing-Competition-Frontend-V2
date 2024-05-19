import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useCookie from "react-use-cookie";
import { toast } from "sonner";

import { Button, Input } from "@nextui-org/react";

function IndexPage() {
    const navigate = useNavigate();
    const [teamCode, setTeamCode] = useState<string>("");
    const [, setTeamToken] = useCookie("teamToken");

    const checkTeamCodeMutation = useMutation({
        mutationFn: () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6IuesrOS6lOmaiiIsImlhdCI6MTUxNjIzOTAyMn0.EP6GH8HdDlQlQGnsRfzQtUQmWUqT8Y3I4Y9stCT3yhc",
                    });
                }, 1000);
            }),
        // mutationFn: () =>
        //     fetch(`http://127.0.0.1:8000/api/team/${teamCode}/`).then(
        //         async (res) => {
        //             if (!res.ok) {
        //                 throw new Error(await res.text());
        //             }
        //             return res.json();
        //         },
        //     ),
        onSuccess: async (data: any) => {
            setTeamToken(data.token);
            navigate(`/team`);
        },
        onError: (error) => {
            const errorMsg = JSON.parse(error.message);
            console.log(errorMsg);
            if (errorMsg.message === "Token is invalid")
                toast.error(`很抱歉，但我們找不到這個隊伍！`);
            else
                toast("未知的錯誤發生了！請尋找課活團隊求助", {
                    description: errorMsg.message ?? errorMsg,
                });
        },
    });

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-zinc-900">
            <div className="w-full max-w-6xl flex items-center text-white">
                <div>
                    <h1 className="text-8xl font-semibold">
                        Scribble <br /> Showdown
                    </h1>
                    <form
                        className="mt-4 flex items-center justify-between gap-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (teamCode.length === 0) return;
                            checkTeamCodeMutation.mutate();
                        }}
                    >
                        <Input
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.currentTarget.value)}
                            placeholder="輸入團隊登入碼"
                        />
                        <Button
                            type="submit"
                            isLoading={checkTeamCodeMutation.isPending}
                            disabled={teamCode.length === 0}
                        >
                            登入
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default IndexPage;
