import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/20/solid";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

export default function Header() {
    const [_, setTeamId] = useCookie("teamId");
    const navigate = useNavigate();

    return (
        <header className="bg-zinc-900 h-16 border-b border-b-zinc-400 text-white px-14 flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/team">
                    <h1 className="text-xl font-bold">Scribble Showdown</h1>
                </Link>
            </div>
            <div className="flex gap-4 items-center justify-end">
                <div className="px-3 py-1.5 bg-yellow-600 text-white rounded-md font-bold flex gap-1 items-center">
                    <ClockIcon className="w-5 text-white" />
                    <p>25:00</p>
                </div>

                <Dropdown className="dark">
                    <DropdownTrigger>
                        <button className="px-3 py-1.5 border border-zinc-500 text-white rounded-md flex gap-2 items-center">
                            第六隊
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
                        <DropdownItem
                            key="logout"
                            onClick={() => {
                                setTeamId("", {
                                    days: -1,
                                });
                                navigate("/");
                            }}
                        >
                            登出
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}
