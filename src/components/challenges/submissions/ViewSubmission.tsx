import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Chip,
    Code,
    Tooltip,
    Image,
} from "@nextui-org/react";
import { ChallengeSubmissionType } from "../../../types/challenges";
import {
    CameraIcon,
    ClockIcon,
    CodeBracketIcon,
    HashtagIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";

interface ViewSubmissionProps {
    subData: ChallengeSubmissionType | null;
    onClose: () => void;
}

export default function ViewSubmission({
    subData,
    onClose,
}: ViewSubmissionProps) {
    return (
        <Modal
            isOpen={subData !== null}
            onOpenChange={(state) => {
                if (!state) onClose();
            }}
            size="3xl"
            className="bg-zinc-800"
            scrollBehavior="outside"
        >
            <ModalContent className="text-white">
                <ModalHeader className="text-xl">
                    Submission {subData?.id}
                </ModalHeader>
                <ModalBody>
                    <div className="flex gap-2 ">
                        {subData?.status}
                        <Chip color="primary">
                            <div className="flex items-center gap-1 text-white">
                                <CameraIcon className="w-4" />
                                <p>吻合度</p>
                                <p>{subData?.fitness}%</p>
                            </div>
                        </Chip>
                        <Chip color="primary">
                            <div className="flex items-center gap-1 text-white">
                                <CodeBracketIcon className="w-4" />
                                <p>字數</p>
                                <p>{subData?.word_count}字</p>
                            </div>
                        </Chip>
                        <Chip color="primary">
                            <div className="flex items-center gap-1 text-white">
                                <ClockIcon className="w-4" />
                                <p>執行時間</p>
                                <p>{subData?.execute_time}</p>
                            </div>
                        </Chip>
                        <Chip color="primary">
                            <div className="flex items-center gap-1 text-white">
                                <HashtagIcon className="w-4" />
                                <p>分數</p>
                                <p>{subData?.score}</p>
                            </div>
                        </Chip>
                    </div>

                    <h3 className="font-bold text-lg mt-4">圖片預覽</h3>
                    <Image
                        src={`${import.meta.env.VITE_BACKEND_URL}/media/result/${subData?.id}.png`}
                        alt="Problem Image"
                        className="rounded-xl w-[720px]"
                    />

                    <h3 className="font-bold text-lg mt-4">程式碼</h3>
                    <Code className="whitespace-pre  overflow-auto text-white bg-zinc-900 p-3">
                        {subData?.code}
                    </Code>

                    <h3 className="font-bold text-lg mt-4 flex items-center gap-1">
                        標準輸出
                        <Tooltip
                            content="STDOUT（標準輸出）用於輸出程式的主要資料或結果，例如如果您的程式碼中有用到print函式，結果將會顯示在這裡"
                            className="max-w-64 bg-zinc-700 text-zinc-200 p-4 shadow-md"
                        >
                            <QuestionMarkCircleIcon className="w-5" />
                        </Tooltip>
                    </h3>
                    {subData?.stdout.length ? (
                        <Code className="whitespace-pre overflow-auto text-white bg-zinc-900 p-3">
                            {subData?.stdout}
                        </Code>
                    ) : (
                        <p>無</p>
                    )}

                    <h3 className="font-bold text-lg mt-4 flex items-center gap-1">
                        標準錯誤輸出
                        <Tooltip
                            content="STDERR（標準錯誤）用於輸出錯誤或警告訊息，如果您的程式碼有報錯，內容將會顯示在這裡"
                            className="max-w-64 bg-zinc-700 text-zinc-200 p-4 shadow-md"
                        >
                            <QuestionMarkCircleIcon className="w-5" />
                        </Tooltip>
                    </h3>
                    {subData?.stderr.length ? (
                        <Code className="whitespace-pre  overflow-auto text-white bg-zinc-900 p-3">
                            {subData?.stderr}
                        </Code>
                    ) : (
                        <p>無</p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onClose}>關閉</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
