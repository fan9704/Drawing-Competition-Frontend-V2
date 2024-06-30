import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/react";

interface ImagePreviewModalProps {
    isOpen: boolean;
    setIsOpen: (shouldOpen: boolean) => void;
    imageUrl: string;
}

export default function ImagePreviewModal({
    isOpen,
    setIsOpen,
    imageUrl,
}: ImagePreviewModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            size="3xl"
            scrollBehavior="outside"
        >
            <ModalContent className="bg-zinc-800">
                {() => (
                    <ModalBody>
                        <Image
                            src={imageUrl}
                            alt="Problem Image"
                            className="rounded-xl w-[720px]"
                        />
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
}
