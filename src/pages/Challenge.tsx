import AppShell from "../components/shared/AppShell";

import { ProblemDesc } from "../components/challenges/ProblemDesc";
import { Submissions } from "../components/challenges/Submissions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ChallengeView() {
    const { challengeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (challengeId === undefined) navigate("/404");
    }, [challengeId, navigate]);

    return (
        <AppShell>
            <div className="w-full h-full flex justify-center overflow-y-auto">
                <div className="w-full my-8 max-w-3xl flex flex-col gap-4">
                    <ProblemDesc id={challengeId ?? ""} />
                    <Submissions challengeId={challengeId ?? ""} />
                    <div className="h-40 w-full flex-shrink-0" />
                </div>
            </div>
        </AppShell>
    );
}
