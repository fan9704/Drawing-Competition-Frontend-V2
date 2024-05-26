import AppShell from "../shared/AppShell";
import SITCON_LOGO from "../../assets/SITCON_green.svg";
import { useEffect, useState } from "react";
import { DadJokes } from "../../utils/data";

export default function Intermission() {
    const [dadJoke, setDadJoke] = useState<string>("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * DadJokes.length);
        setDadJoke(DadJokes[randomIndex]);
    }, []);

    return (
        <AppShell>
            <div className="h-full w-full flex justify-center items-center">
                <div className="w-full max-w-4xl flex flex-col items-center justify-center">
                    <img className="w-80" src={SITCON_LOGO}></img>
                    <h2 className="mt-20 text-4xl font-semibold text-zinc-100 text-center">
                        休息一下
                    </h2>
                    <p className="text-xl text-zinc-100 mt-4">{dadJoke}</p>
                </div>
            </div>
        </AppShell>
    );
}
