import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Tab,
    Tabs,
} from "@nextui-org/react";
import TurtleTutorial from "../../content/TurtleTutorial";
import WebTutorial from "../../content/WebTutorial";

export default function HelpButton() {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <button
            className="cursor-pointer"
            onClick={() => {
                setIsHelpOpen(true);
            }}
        >
            <QuestionMarkCircleIcon className="h-9" />
            <Modal
                isOpen={isHelpOpen}
                onOpenChange={setIsHelpOpen}
                size="3xl"
                className="bg-zinc-900"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="block">
                                <h1 className="text-white text-2xl">說明</h1>
                                <h2 className="text-zinc-400 mt-1 font-medium">
                                    我們能怎麼幫到你？
                                </h2>
                            </ModalHeader>
                            <ModalBody>
                                <Tabs aria-label="choose-help" className="dark">
                                    <Tab key="turtle" title="Turtle">
                                        <TurtleTutorial />
                                    </Tab>
                                    <Tab key="app" title="網頁">
                                        <WebTutorial />
                                    </Tab>
                                </Tabs>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </button>
    );
}
