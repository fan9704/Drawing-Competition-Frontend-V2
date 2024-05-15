import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Code,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export function ConfirmUpload({
    code,
    isOpen,
    onOpenChange,
}: {
    code: string;
    isOpen: boolean;
    onOpenChange: () => void;
}) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            className="bg-zinc-800"
        >
            <ModalContent className="text-white">
                {(onClose) => (
                    <>
                        <ModalHeader>確認提交程式</ModalHeader>
                        <ModalBody>
                            請在最後檢查一下您的程式
                            <Code className="whitespace-pre max-h-[400px] overflow-scroll text-white bg-zinc-900 p-3">
                                {code}
                            </Code>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>取消</Button>
                            <Button
                                onPress={() => {
                                    toast.success("程式已提交！");
                                    onClose();
                                }}
                                color="success"
                            >
                                提交
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
