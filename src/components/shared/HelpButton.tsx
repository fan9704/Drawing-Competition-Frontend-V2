import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Popover,
    PopoverTrigger,
    Listbox,
    ListboxItem,
} from "@nextui-org/react";

export default function HelpButton() {
    return (
        <Popover
            placement="top-end"
            className="fixed bottom-10 right-10 hover:shadow-xl z-10"
        >
            <PopoverTrigger>
                <Button className="fixed bottom-5 right-5 hover:shadow-xl z-10 w-10 h-10 bg-transparent">
                    <QuestionMarkCircleIcon className="h-9" />
                </Button>
            </PopoverTrigger>
            <div className="w-full max-w-40 border-small border-zinc-700 px-1 py-2 rounded-small bg-zinc-800 fixed bottom-16 right-10">
                <Listbox
                    aria-label="Actions"
                    onAction={(key) => {
                        const links = {
                            sys_tut:
                                "https://docs.google.com/document/d/1Whgj8O9oFgrYUtGFhotWkBH_dA5CbMAGquSgOSCL9Fs/edit",
                            turtle_slide:
                                "https://docs.google.com/presentation/d/1_b6YuFZVujgGzW1fH6HVNZluly_iH5Xdxeuc6JTp0F4/edit",
                            ex_code_1:
                                "https://github.com/aa35037123/turtle_challenge/blob/main/drawing_tutorial/pen.py",
                            ex_code_2:
                                "https://github.com/aa35037123/turtle_challenge/blob/main/drawing_tutorial/star.py",
                        };

                        const new_window = window.open(
                            links[
                                key as
                                    | "sys_tut"
                                    | "turtle_slide"
                                    | "ex_code_1"
                                    | "ex_code_2"
                            ],
                            "_blank",
                        );
                        if (new_window) window.focus();
                    }}
                >
                    <ListboxItem
                        className="text-white"
                        key="sys_tut"
                        endContent={
                            <ArrowTopRightOnSquareIcon className="w-4" />
                        }
                    >
                        系統使用指南
                    </ListboxItem>
                    <ListboxItem
                        className="text-white"
                        key="turtle_slide"
                        endContent={
                            <ArrowTopRightOnSquareIcon className="w-4" />
                        }
                    >
                        Turtle 教學
                    </ListboxItem>
                    <ListboxItem
                        className="text-white"
                        key="ex_code_1"
                        endContent={
                            <ArrowTopRightOnSquareIcon className="w-4" />
                        }
                    >
                        範例程式一
                    </ListboxItem>
                    <ListboxItem
                        className="text-white"
                        key="ex_code_2"
                        endContent={
                            <ArrowTopRightOnSquareIcon className="w-4" />
                        }
                    >
                        範例程式二
                    </ListboxItem>
                </Listbox>
            </div>
        </Popover>
    );
}
