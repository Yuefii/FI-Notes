"use client";

import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File } from "lucide-react";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const documents = useQuery(api.documents.getSearch);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  const handleSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  return (
    <>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder="Pencarian..." />
        <CommandList>
          <CommandEmpty>Tidak Ada Hasil Yang Ditemukan</CommandEmpty>
          <CommandGroup heading="Halaman">
            {documents?.map((d) => (
              <CommandItem
                key={d._id}
                title={d.title}
                value={`${d._id}-${d.title}`}
                onSelect={handleSelect}
              >
                {d.icon ? (
                  <p className="mr-2 text-[18px]">{d.icon}</p>
                ) : (
                  <File className="w-4 h-4 mr-2" />
                )}
                <span>{d.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
