"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import favimg from "@/public/favicon.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
export default function Navbar() {
  const pathname = usePathname();
  const { user, logoutUser } = useUser();
  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;
  return (
    <div className="flex justify-between items-center p-4">
      <Link href={"/"}>
        <div className="flex items-center justify-center gap-1">
          <Image src={favimg} alt="Logo" width={40} height={40} />
          <h1 className="font-medium text-xl font-geist-mono">Ecoform</h1>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        {user ? (
          <Button onClick={logoutUser} variant="outline">
            Logout
          </Button>
        ) : (
          <Link href={"/login"}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
        {!user && (
          <Link href={"/signup"}>
            <Button variant="outline">Signup</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
