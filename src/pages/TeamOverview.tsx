import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/shared/AppShell";
import { R1ChallengeCards } from "../utils/fakeData";
import { ChallengeCard } from "../components/challenges/Card";
import useCookie from "react-use-cookie";
import { Tab, Tabs } from "@nextui-org/react";
import TeamLeaderboard from "../components/teamview/Leaderboard";

function TeamOverview() {
    const navigate = useNavigate();
    const [teamId, _] = useCookie("teamId");

    // useEffect(() => {
    //     if (teamId === "undefined" || teamId === "") navigate("/");
    // }, [teamId]);

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
                    <div className="mt-4">
                        <Tabs aria-label="round_view">
                            <Tab key="challenges" title="題目">
                                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                                    {R1ChallengeCards.map((card) => (
                                        <ChallengeCard
                                            card={card}
                                            key={card.id}
                                        />
                                    ))}
                                </div>
                            </Tab>
                            <Tab key="leaderboard" title="排行榜">
                                <TeamLeaderboard />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

export default TeamOverview;
