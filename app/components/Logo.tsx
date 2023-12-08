import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <>
      <div className="hidden md:flex item-center gap-x-2">
        <Image src="/logo.png" alt="" height={40} width={40} />
      </div>
      <p className={cn("font-semibold", font.className)}>Notes</p>
    </>
  );
};

export default Logo;
