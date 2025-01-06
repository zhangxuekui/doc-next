import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import { TableHead, TableHeader, TableRow, Table, TableBody, TableCell } from "@/components/ui/table";
import { DocumentsRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}
export const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {
                documents === undefined ? (
                    <div className="flex justify-center items-center h-24">
                        <LoaderIcon className="animate-spin text-muted-foreground size-5" />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead>Name</TableHead>
                                <TableHead>&nbsp;</TableHead>
                                <TableHead className="hidden md:table-cell">Shared</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            documents.length === 0 ? (
                                <TableBody>
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No documents found</TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {
                                        documents.map((document) => (
                                            <DocumentsRow key={document._id} document={document} />
                                        ))
                                    }
                                </TableBody>
                            )
                        }
                    </Table>
                )
            }
            <div className="flex justify-center items-center">
                <Button variant="ghost" onClick={() => loadMore(5)} size="sm" disabled={status !== "CanLoadMore"}>
                    {status === "CanLoadMore" ? "Load more" : "No more documents"}
                </Button>
            </div>
        </div >
    )
}