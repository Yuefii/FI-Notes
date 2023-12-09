import Image from "next/image";

const HeroesImage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center max-w-5xl">
        <div className="flex items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:[400px]">
            <Image
              src="/heroSatu.png"
              alt=".."
              className="object-contain"
              fill
            />
          </div>
          <div className="relative h-[400px] w-[400px] hidden md:block">
            <Image
              src="/heroDua.png"
              alt=".."
              className="object-contain"
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroesImage;
