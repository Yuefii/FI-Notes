"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading = () => {
  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Menulis, Merencanakan, & Berbagi bersama dengan kami.
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          FI Notes adalah ruang kerja yang bisa terhubung di mana saja dalam
          membuat pekerjaan lebih baik dan lebih cepat.
        </h3>
        <Button>
          Mulai Sekarang
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </>
  );
};

export default Heading;
