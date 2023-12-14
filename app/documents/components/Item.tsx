"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const handleCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (!id) return;
    const promise = create({ title: "Tanpa Judul", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Membuat Catatan Baru...",
      success: "Catatan Baru Berhasil Dibuat!",
      error: "Gagal Untuk Membuat Catatan Baru.",
    });
  };
  return (
    <>
      <div
        onClick={onClick}
        role="button"
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        className={cn(
          "group min-h-[27px] text-sm pr-3 py-1 w-full flex items-center text-muted-foreground font-medium hover:bg-primary/5",
          active && "bg-primary/5 text-primary"
        )}
      >
        {!!id && (
          <div
            role="button"
            className="h-full rounded-sm mr-1 hover:bg-neutral-300"
            onClick={handleExpand}
          >
            <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
          </div>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] text-muted-foreground mr-2" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
            <span className="text-xs">ctrl</span> + F
          </kbd>
        )}
        {!!id && (
          <div className="flex items-center ml-auto gap-x-2">
            <div
              role="button"
              onClick={handleCreate}
              className="h-full opacity-0 ml-auto rounded-sm hover:bg-neutral-300 group-hover:opacity-100"
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <>
      <div
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        className="flex gap-x-2 py-[3px]"
      >
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-[30%] h-4" />
      </div>
    </>
  );
};
