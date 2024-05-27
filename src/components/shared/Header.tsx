import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { useJwt, decodeToken } from "react-jwt";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/20/solid";

import useLogout from "../../utils/auth";
import { useRoundQuery } from "../../utils/requests";

interface HeaderProps {
    disable_protect?: boolean;
}

export default function Header({ disable_protect }: HeaderProps) {
    const logout = useLogout();
    const navigate = useNavigate();

    const [teamToken] = useCookie("teamToken");
    const { decodedToken } = useJwt<{ sub: string; name: string }>(teamToken);
    const [roundRemainingTime, setRoundRemainingTime] = useState<number | null>(
        null,
    );

    const roundDataQuery = useRoundQuery();

    useEffect(() => {
        if (!roundDataQuery.data) return;

        const remainingTime = Math.floor(
            (new Date(roundDataQuery.data.end_time).getTime() -
                new Date().getTime()) /
                1000,
        );
        setRoundRemainingTime(remainingTime);
    }, [roundDataQuery.data]);

    useEffect(() => {
        if (!roundDataQuery.data) return setRoundRemainingTime(null);
        const interval = setInterval(() => {
            const roundRemainingTime = Math.floor(
                (new Date(roundDataQuery.data.end_time).getTime() -
                    new Date().getTime()) /
                    1000,
            );
            setRoundRemainingTime(roundRemainingTime);
            if (roundRemainingTime <= 0) navigate("/team");
        }, 1000);
        return () => clearInterval(interval);
    }, [roundRemainingTime, roundDataQuery.data, navigate]);

    useEffect(() => {
        if (disable_protect) return;
        if (
            teamToken === "undefined" ||
            teamToken === "" ||
            !decodeToken(teamToken)
        )
            logout();
    }, [decodedToken, disable_protect, logout, teamToken]);

    return (
        <header className="bg-zinc-900 h-16 border-b border-b-zinc-400 text-white px-14 flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/team">
                    <h1 className="text-xl font-bold">Scribble Showdown</h1>
                </Link>
            </div>
            {disable_protect ? (
                <div></div>
            ) : (
                <div className="flex gap-4 items-center justify-end">
                    {roundRemainingTime && (
                        <div
                            className={`px-3 py-1.5 text-white rounded-md font-bold flex gap-1 items-center ${
                                roundRemainingTime > 900
                                    ? "bg-green-600"
                                    : roundRemainingTime > 300
                                      ? "bg-yellow-600"
                                      : "bg-red-600"
                            }`}
                        >
                            <ClockIcon className="w-5 text-white" />
                            <p>
                                {Math.max(
                                    Math.floor(roundRemainingTime / 60),
                                    0,
                                )
                                    .toString()
                                    .padStart(2, "0")}
                                :
                                {Math.max(roundRemainingTime % 60, 0)
                                    .toString()
                                    .padStart(2, "0")}
                            </p>
                        </div>
                    )}
                    <Dropdown className="dark">
                        <DropdownTrigger>
                            <button className="px-3 py-1.5 border border-zinc-500 text-white rounded-md flex gap-2 items-center">
                                {decodedToken?.name}
                                <ChevronDownIcon className="w-4" />
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu className="text-white ">
                            <DropdownItem
                                key="teampage"
                                onClick={() => {
                                    navigate("/team");
                                }}
                            >
                                回到團隊頁
                            </DropdownItem>
                            <DropdownItem key="logout" onClick={logout}>
                                登出
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            )}
        </header>
    );
}
