"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: boolean;
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
            onClick={() => {}}
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
      </div>
    </>
  );
};

export default Item;
