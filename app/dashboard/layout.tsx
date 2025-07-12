import SideBar, { MobileSidebar } from "@/Pages/SideBar";
import PrivateRoute from "@/Rootpages/PrivateRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 bg-[#F0EBF8]">
          <MobileSidebar />
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}
