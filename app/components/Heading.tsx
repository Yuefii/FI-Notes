"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Kembangkan Ide, Rencanakan, & Kolaborasi Lebih Efektif dengan Kami.
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          <span className="font-bold">FI Notes</span> adalah alat yang dapat membuat anda tetap terhubung dimana
          saja dan kapan saja, untuk membuat catatan pekerjaan dengan lebih
          efisien dan cepat.
        </h3>
        {isLoading && (
          <>
            <div className="w-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <Button>
            <Link className="flex items-center" href="/documents">
              Mulai Sekarang
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button>
              Mulai Sekarang
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        )}
      </div>
    </>
  );
};

export default Heading;
