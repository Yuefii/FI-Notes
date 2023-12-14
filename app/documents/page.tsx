"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const {user} = useUser()

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
        <h1 className="text-lg font-medium">Selamat Datang {user?.firstName}</h1>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2"/>
          Buat Catatan
        </Button>
      </div>
    </>
  );
};

export default Page;
