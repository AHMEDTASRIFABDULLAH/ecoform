import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loding() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-black" />
    </div>
  );
}
