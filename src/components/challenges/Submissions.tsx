import { Chip } from "@nextui-org/react";

import { ComputerDesktopIcon } from "@heroicons/react/16/solid";
import BestTeams from "./submissions/BestTeams";
import TeamSubmissions from "./submissions/TeamSubmissions";

interface SubmissionsProps {
    challengeId: string;
}

export function Submissions({ challengeId }: SubmissionsProps) {
    return (
        <div className="w-full pt-4 p-6 rounded-md bg-zinc-800 border border-zinc-400 text-white bg-opacity-70">
            <Chip className="bg-blue-600 bg-opacity-60 ">
                <div className="flex items-center gap-1">
                    <ComputerDesktopIcon className="text-white w-4" />
                    <h2 className="text-zinc-100 font-medium">各隊投稿</h2>
                </div>
            </Chip>

            <BestTeams challengeId={challengeId} />
            <TeamSubmissions challengeId={challengeId} />
        </div>
    );
}
