"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const Page = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: "Tanpa Judul" });
    toast.promise(promise, {
      loading: "Membuat Catatan Baru...",
      success: "Catatan Baru Berhasil Dibuat!",
      error: "Gagal Untuk Membuat Catatan Baru.",
    });
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          className=""
          src="/empty.png"
          alt="empty"
          width={300}
          height={300}
        />
        <h1 className="text-lg font-medium">
          Selamat Datang {user?.firstName}
        </h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Buat Catatan
        </Button>
      </div>
    </>
  );
};

export default Page;
