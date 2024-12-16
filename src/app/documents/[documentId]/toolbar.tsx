"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, CirclePicker } from "react-color";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 min-w-7 chrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }}></div>
                </button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}
const HeadingLevelButton = () => {
    const { editor } = useEditorStore();
    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ];
    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 min-w-7 chrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        key={value}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                            }
                        }}
                        style={{ fontSize }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                        )}
                    >
                        {label}
                    </button>

                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times new Roman", value: "Times new Roman" },
        { label: "Courier new", value: "Courier new" },
        { label: "Georia", value: "Georia" },
        { label: "Verdana", value: "Verdana" },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[120px] chrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-x-1">
                {fonts.map(({
                    label, value
                }) => (
                    <button onClick={() => editor?.chain().focus().setFontFamily(value).run()} key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                        style={{ fontFamily: value }}>
                        <span className="text-sm">
                            {label}
                        </span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}
const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
    return (
        <div>
            <button onClick={onClick} className={cn(
                "text-sm h-7 min-w-7 items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}>
                <Icon className="size-4" />
            </button>
        </div>
    );
}
export const ToolBar = () => {
    const { editor } = useEditorStore();
    console.log("Tool bar editor:", { editor })
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        console.log("spell check")
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    },
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => {
                        editor?.chain().focus().toggleBold().run()
                    },
                }, {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => {
                        editor?.chain().focus().toggleItalic().run()
                    },
                }, {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => {
                        editor?.chain().focus().toggleUnderline().run()
                    },
                },
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    isActive: false,
                    onClick: () => {
                        console.log("comment")
                    },
                },
                {
                    label: "List todo",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive("taskList"),
                    onClick: () => {
                        editor?.chain().focus().toggleTaskList().run()
                    },
                }, {
                    label: "Remove formating",
                    icon: RemoveFormattingIcon,
                    onClick: () => {
                        editor?.chain().focus().unsetAllMarks().run()
                    },
                },
            ]
        ];
    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    );
};