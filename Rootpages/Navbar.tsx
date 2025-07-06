import { Button } from "@/components/ui/button";
import Image from "next/image";
import favimg from "@/public/favicon.png";
export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center justify-center gap-1">
        <Image src={favimg} alt="Logo" width={40} height={40} />
        <h1 className="font-medium text-xl font-geist-mono">Ecoform</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline">Login</Button>
        <Button variant="outline">Signup</Button>
      </div>
    </div>
  );
}
