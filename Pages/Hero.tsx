import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import borderimg from "@/public/text_border.png";
import Image from "next/image";
import { FaRegHandPointRight } from "react-icons/fa";
export default function Hero() {
  return (
    <div className="pt-20 pb-8 relative overflow-hidden px-4">
      <div className="absolute top-10 left-5 w-24 h-24 md:w-32 md:h-32 bg-purple-50 rounded-full "></div>
      <div className="absolute top-40 right-5 w-20 h-20 md:w-28 md:h-28 bg-purple-50 rounded-full "></div>
      <div className="absolute top-[13rem] left-40 w-16 h-16 md:w-24 md:h-24 bg-purple-50 rounded-full "></div>

      <h1 className="text-center text-2xl font-bold md:text-4xl xl:text-5xl relative z-10">
        The{" "}
        <span className="relative inline-block">
          simplest{" "}
          <Image
            className="hidden md:block md:absolute top-14 left-0"
            alt=""
            src={borderimg}
            width={240}
            height={40}
          />
        </span>{" "}
        way to create forms
      </h1>

      <p className="text-center text-gray-600 mt-6 text-lg md:text-xl font-medium md:font-bold z-10 relative">
        Say goodbye to boring forms. Meet Ecoform — the free,
        <br className="hidden md:block" /> intuitive form builder you’ve been
        looking for.
      </p>

      <div className="flex justify-center items-center mt-10 relative z-10">
        <Button>
          Create Now <FaRegHandPointRight />
        </Button>
      </div>
    </div>
  );
}
