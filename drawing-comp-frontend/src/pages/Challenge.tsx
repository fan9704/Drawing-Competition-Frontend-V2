import { useEffect } from "react";

import AppShell from "../components/shared/AppShell";

import { SampleChallenge } from "../utils/fakeData";

import { ProblemDesc } from "../components/challenges/ProblemDesc";
import { Submissions } from "../components/challenges/Submissions";
import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";

export default function ChallengeView() {
    const navigate = useNavigate();
    const [teamId, _] = useCookie("teamId");

    // useEffect(() => {
    //     if (teamId === "undefined" || teamId === "") navigate("/");
    // }, [teamId]);

    const ChallengeData = SampleChallenge;

    return (
        <AppShell>
            <div className="w-full h-full flex justify-center overflow-y-auto">
                <div className="w-full my-8 max-w-3xl flex flex-col gap-4">
                    <ProblemDesc challengeData={ChallengeData} />
                    <Submissions />
                    <div className="h-80 w-full">
                        <p className="opacity-0">Hi</p>
                        <p className="opacity-0">You found</p>
                        <p className="opacity-0">an</p>
                        <p className="opacity-0">easter egg</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
