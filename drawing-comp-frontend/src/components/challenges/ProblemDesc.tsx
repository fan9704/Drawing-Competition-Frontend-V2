import { BookOpenIcon } from "@heroicons/react/20/solid";
import { Button, Chip, Image, useDisclosure } from "@nextui-org/react";
import { ChallengeType } from "../../types/challenges";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmUpload } from "./ConfirmUpload";

export function ProblemDesc({
    challengeData,
}: {
    challengeData: ChallengeType;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userCode, setUserCode] = useState<string>(""); // [1
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="w-full pt-4 p-6 rounded-md bg-zinc-800 border border-zinc-400 text-white bg-opacity-70">
            <Chip className="bg-blue-600 bg-opacity-60 ">
                <div className="flex items-center gap-1">
                    <BookOpenIcon className="text-white w-4" />
                    <h2 className="text-zinc-100 font-medium">題目描述</h2>
                </div>
            </Chip>
            <h2 className="text-3xl mt-2 font-medium">
                請畫一個{challengeData.name}
            </h2>
            <div className="flex justify-between mt-2 gap-8">
                <p className="whitespace-pre-wrap text-left w-7/12 text-zinc-300">
                    {challengeData.description}
                </p>
                <div className="w-5/12">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl "
                        src={challengeData.image}
                    />
                </div>
            </div>
            <hr className="w-full border-b border-b-zinc-600 mt-5 mb-3" />
            <div className="mt-2 flex items-center w-full gap-2">
                <Button>下載模板</Button>
                <Button
                    onClick={() => {
                        if (!fileInputRef.current) return;
                        fileInputRef.current.click();
                    }}
                >
                    上傳程式
                </Button>
                <ConfirmUpload
                    code={userCode}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".py"
                    hidden
                    onChange={(e) => {
                        if (!e.target.files) return;

                        let file = e.target.files[0];

                        var reader = new FileReader();
                        reader.readAsText(file, "UTF-8");

                        reader.onload = (readerEvent) => {
                            if (!readerEvent.target) {
                                toast.error("無法讀取檔案");
                                return;
                            }
                            var content = readerEvent.target.result;
                            setUserCode(content as string);
                            onOpen();
                        };
                    }}
                />
            </div>
        </div>
    );
}
