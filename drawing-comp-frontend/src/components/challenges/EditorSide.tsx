import { CodeBracketIcon } from "@heroicons/react/16/solid";
import { Chip } from "@nextui-org/react";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import type { MutableRefObject } from "react";
import Editor from "@monaco-editor/react";

export const EditorSideWithRef = forwardRef(function EditorSide(
    {},
    ref: ForwardedRef<any>,
) {
    const [windowHeight, setWindowHeight] = useState<number>(
        window.innerHeight,
    );

    useEffect(() => {
        window.onresize = () => {
            setWindowHeight(window.innerHeight);
        };
    }, []);

    return (
        <div className="w-full h-[calc(100%-32px)] m-2 pt-4 p-4 rounded-md bg-zinc-800 border border-zinc-400 text-white">
            <Chip className="bg-blue-600 bg-opacity-60 ">
                <div className="flex items-center gap-1">
                    <CodeBracketIcon className="text-white w-4" />
                    <h2 className="text-zinc-100 font-medium">程式碼</h2>
                </div>
            </Chip>
            <div className="border mt-2 border-zinc-700">
                <Editor
                    height={windowHeight - 170}
                    defaultLanguage="python"
                    beforeMount={(monaco) => {
                        monaco.editor.defineTheme("scribble", {
                            base: "vs-dark",
                            inherit: true,
                            rules: [],
                            colors: {
                                "editor.background": "#27272a",
                            },
                        });
                    }}
                    onMount={(editor) => {
                        if (!ref) return;
                        (ref as MutableRefObject<any>).current = editor;
                    }}
                    theme="scribble"
                    options={{
                        fontSize: 14,
                    }}
                />
            </div>
        </div>
    );
});
