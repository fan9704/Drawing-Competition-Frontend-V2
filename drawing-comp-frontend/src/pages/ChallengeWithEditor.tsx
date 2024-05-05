import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../components/shared/AppShell";

import { EditorSideWithRef } from "../components/challenges/EditorSide";
import { MetadataSide } from "../components/challenges/MetadataSide";
import { SampleChallenge } from "../utils/fakeData";

export default function ChallengeView() {
    const [isLoading, setIsLoading] = useState(true);
    const { teamId } = useParams<{ teamId: string }>();

    const [descWidth, setDescWidth] = useState<number>(window.innerWidth / 2);

    const editorRef = useRef<any | null>(null);

    const ChallengeData = SampleChallenge;

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(`Team ID: ${teamId}`);
            setIsLoading(false);
        }, 3000);

        return clearTimeout(timeout);
    }, []);

    return (
        <AppShell>
            <div className="flex w-full h-full px-14 gap-3">
                <div
                    className="h-full"
                    style={{ width: window.innerWidth - descWidth - 56 }}
                >
                    <EditorSideWithRef ref={editorRef} />
                </div>
                <div className="h-full" style={{ width: descWidth - 56 }}>
                    <MetadataSide challengeData={ChallengeData} />
                </div>
            </div>
        </AppShell>
    );
}
