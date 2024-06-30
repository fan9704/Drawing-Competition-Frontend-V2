import { BookOpenIcon } from "@heroicons/react/20/solid";
import { Button, Chip, Image, Spinner, useDisclosure } from "@nextui-org/react";
import { ChallengeType } from "../../types/challenges";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmUpload } from "./ConfirmUpload";
import { useQuery } from "@tanstack/react-query";
import ImagePreviewModal from "./problem/ImagePreviewModal";

interface ProblemDescProps {
    id: string;
}

export function ProblemDesc({ id }: ProblemDescProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userCode, setUserCode] = useState<string>(""); // [1
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [imgPreviewOpen, setImgPreviewOpen] = useState(false);

    const challengeQuery = useQuery<ChallengeType>({
        queryKey: ["challenge", id],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/challenge/${id}`)
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(await res.text());
                    }
                    return res.json();
                })
                .catch((error) => {
                    toast.error("無法取得題目資料，請找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                    console.error(error);
                }),
    });

    return (
        <div className="w-full pt-4 p-6 rounded-md bg-zinc-800 border border-zinc-400 text-white bg-opacity-70">
            <Chip className="bg-blue-600 bg-opacity-60 ">
                <div className="flex items-center gap-1">
                    <BookOpenIcon className="text-white w-4" />
                    <h2 className="text-zinc-100 font-medium">題目描述</h2>
                </div>
            </Chip>
            {challengeQuery.data ? (
                <>
                    <h2 className="text-3xl mt-2 font-medium">
                        請畫一個{challengeQuery.data.title}
                    </h2>
                    <div className="flex justify-between mt-2 gap-8">
                        <p className="whitespace-pre-wrap text-left w-7/12 text-zinc-300">
                            {challengeQuery.data.description}
                        </p>
                        <div className="w-5/12">
                            <Image
                                src={`${import.meta.env.VITE_BACKEND_URL}/${challengeQuery.data.image_url}`}
                                alt="Card background"
                                className="object-cover rounded-xl cursor-pointer"
                                onClick={() => {
                                    setImgPreviewOpen(true);
                                }}
                            />
                        </div>
                        <ImagePreviewModal
                            isOpen={imgPreviewOpen}
                            setIsOpen={setImgPreviewOpen}
                            imageUrl={`${import.meta.env.VITE_BACKEND_URL}/${challengeQuery.data.image_url}`}
                        />
                    </div>
                    <hr className="w-full border-b border-b-zinc-600 mt-5 mb-3" />
                    <div className="mt-2 flex items-center w-full gap-2">
                        <a href="/template.py" download>
                            <Button>下載模板</Button>
                        </a>
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
                            challengeId={id}
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

                                const file = e.target.files[0];

                                const reader = new FileReader();
                                reader.readAsText(file, "UTF-8");

                                reader.onload = (readerEvent) => {
                                    if (!readerEvent.target) {
                                        toast.error("無法讀取檔案");
                                        return;
                                    }
                                    const content = readerEvent.target.result;
                                    setUserCode(content as string);
                                    onOpen();
                                };

                                e.target.value = "";
                            }}
                        />
                    </div>
                </>
            ) : (
                <div className="h-64 flex items-center justify-center">
                    <Spinner label="載入中" />
                </div>
            )}
        </div>
    );
}
