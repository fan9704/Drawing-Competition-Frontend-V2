import useCookie from "react-use-cookie";
import { useJwt } from "react-jwt";

import { Tab, Tabs, Spinner } from "@nextui-org/react";

import AppShell from "../components/shared/AppShell";
import { ChallengeCard } from "../components/challenges/ChallengeCard";
import TeamLeaderboard from "../components/teamview/Leaderboard";

import { useRoundQuery } from "../utils/requests";
import { useEffect, useState } from "react";
import Intermission from "../components/teamview/Intermission";

function TeamOverview() {
    const [teamToken] = useCookie("teamToken");
    const { decodedToken } = useJwt<{ sub: string; name: string }>(teamToken);

    const [noRound, setNoRound] = useState<boolean>(false);

    const roundDataQuery = useRoundQuery();

    useEffect(() => {
        if (roundDataQuery.isPending) return;
        setNoRound(roundDataQuery.data === null);
    }, [roundDataQuery.data, roundDataQuery.isPending]);

    if (noRound) return <Intermission />;

    return (
        <AppShell>
            <div className="h-full w-full flex justify-center">
                {roundDataQuery.data ? (
                    <div className="mt-20 w-full max-w-4xl ">
                        <h2 className="text-xl text-zinc-300">
                            {decodedToken?.name}的闖關者們，歡迎！
                        </h2>

                        <h1 className="mt-4 font-bold text-6xl text-white">
                            Round {roundDataQuery.data.id}
                        </h1>
                        <div className="mt-4">
                            <Tabs aria-label="round_view">
                                <Tab key="challenges" title="題目">
                                    <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                                        {roundDataQuery.data.challenge_list &&
                                            roundDataQuery.data.challenge_list.map(
                                                (card) => (
                                                    <ChallengeCard
                                                        card={card}
                                                        key={card.id}
                                                    />
                                                ),
                                            )}
                                    </div>
                                </Tab>
                                <Tab key="leaderboard" title="排行榜">
                                    <TeamLeaderboard
                                        roundId={roundDataQuery.data.id}
                                    />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                ) : (
                    <Spinner size="lg" />
                )}
            </div>
        </AppShell>
    );
}

export default TeamOverview;
