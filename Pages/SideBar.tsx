"use client";
import Image from "next/image";
import favimg from "@/public/favicon.png";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, FilePlus, FolderKanban, LayoutTemplate } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Create Form", icon: FilePlus },
  { href: "/dashboard/responses", label: "Responses", icon: FolderKanban },
  { href: "/dashboard/myform", label: "My Templates", icon: LayoutTemplate },
];

export default function SideBar() {
  return (
    <aside className="h-screen w-full max-w-[250px] bg-white border-r hidden lg:block">
      <Link href={"/"}>
        <div className="flex pl-5 py-2 border-b">
          <div className="flex items-center justify-center gap-1">
            <Image src={favimg} alt="Logo" width={35} height={35} />
            <h1 className="font-medium text-xl font-geist-mono">Ecoform</h1>
          </div>
        </div>
      </Link>
      <nav className="flex flex-col p-4 space-y-2">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 px-3 py-2 rounded-md transition"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <>
      <header className="lg:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-50">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={favimg} alt="Logo" width={36} height={36} />
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
              Ecoform
            </h1>
          </div>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
              <SheetTrigger asChild></SheetTrigger>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 px-3 py-2 rounded-md transition"
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
