
"use client";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface RenameDialogProps {
    documentId: Id<"documents">;
    initrialTitle: string;
    children: React.ReactNode;
}


export const RenameDialog = ({ documentId, initrialTitle, children }: RenameDialogProps) => {

    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);
    const [title, setTitle] = useState(initrialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        update({ id: documentId, title: title.trim() || "Untitled" })
            .finally(() => {
                setIsUpdating(false);
                setOpen(false);
            });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()} >
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>
                        Rename document
                    </DialogTitle>
                    <DialogDescription>
                        Enter a new name for this document
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Document name"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="ghost"
                        disabled={isUpdating}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                        }}

                    >Cancel</Button>
                    <Button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog >
    )
}
