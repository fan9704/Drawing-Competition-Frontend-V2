import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../components/shared/AppShell";
import { R1ChallengeCards } from "../utils/fakeData";
import { ChallengeCard } from "../components/challenges/Card";

function TeamOverview() {
    const [isLoading, setIsLoading] = useState(true);
    const { teamId } = useParams<{ teamId: string }>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(`Team ID: ${teamId}`);
            setIsLoading(false);
        }, 3000);
        return clearTimeout(timeout);
    }, []);

    return (
        <AppShell>
            <div className="h-full w-full flex justify-center">
                <div className="mt-20 w-full max-w-4xl ">
                    <h2 className="text-xl text-zinc-300">
                        第六隊的闖關者們，歡迎！
                    </h2>
                    <h1 className="mt-4 font-bold text-6xl text-white">
                        Round 1
                    </h1>
                    <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4">
                        {R1ChallengeCards.map((card) => (
                            <ChallengeCard card={card} key={card.id} />
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

export default TeamOverview;
