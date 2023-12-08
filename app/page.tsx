import Footer from "./components/Footer";
import Heading from "./components/Heading";
import HeroesImage from "./components/HeroesImage";

const Page = () => {
  return (
    <>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col justify-center items-center text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading />
          <HeroesImage />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
