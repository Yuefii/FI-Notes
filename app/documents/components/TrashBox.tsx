"use client";

import { ConfirmModal } from "@/components/modals/confirm";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((d) => {
    return d.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Mengembalikan Halaman...",
      success: "Halaman Telah Kembali",
      error: "Gagal Mengembalikan Halaman",
    });
  };

  const handleRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Menghapus Halaman...",
      success: "Halaman Telah Terhapus",
      error: "Gagal Menghapus Halaman",
    });

    if (documents === undefined) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex justify-center items-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
          <Search className="w-4 h-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="Filter Berdasarkan Judul Halaman..."
          />
        </div>
        <div className="mt-2 px-1 pb-1">
          <p className="text-xs text-center text-muted-foreground pb-2 hidden last:block">
            Halaman Tidak Ditemukan.
          </p>
          {filterDocuments?.map((d) => (
            <div
              key={d._id}
              role="button"
              onClick={() => onClick(d._id)}
              className="w-full text-sm text-primary rounded-sm flex justify-between items-center hover:bg-primary/5"
            >
              <span className="truncate pl-2">{d.title}</span>
              <div className="flex items-center">
                <div
                  role="button"
                  onClick={(e) => handleRestore(e, d._id)}
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Undo className="w-4 h-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => handleRemove(d._id)}>
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200"
                  >
                    <Trash className="w-4 h-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrashBox;
