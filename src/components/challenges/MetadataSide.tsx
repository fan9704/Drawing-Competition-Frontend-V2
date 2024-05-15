import { BookOpenIcon } from "@heroicons/react/16/solid";
import { Chip, Image } from "@nextui-org/react";
import { ChallengeType } from "../../types/challenges";

export function MetadataSide({
    challengeData,
}: {
    challengeData: ChallengeType;
}) {
    return (
        <div className="h-[calc(100%-32px)] w-full">
            <div className="w-full m-2 pt-4 p-6 h-2/3 rounded-md bg-zinc-800 border border-zinc-400 text-white bg-opacity-70">
                <Chip className="bg-blue-600 bg-opacity-60 ">
                    <div className="flex items-center gap-1">
                        <BookOpenIcon className="text-white w-4" />
                        <h2 className="text-zinc-100 font-medium">題目描述</h2>
                    </div>
                </Chip>
                <h2 className="text-3xl mt-2 font-medium">
                    請畫一個{challengeData.name}
                </h2>
                <div className="flex justify-between mt-2">
                    <p className="whitespace-pre text-left">
                        {challengeData.description}
                    </p>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={challengeData.image}
                        width={288}
                    />
                </div>
            </div>
        </div>
    );
}
