import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex ">
        {/* <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-screen p-10">{children}</main>
        </SidebarProvider> */}
        <SideBar />
          <main className="w-full h-screen p-10">{children}</main>
      </div>
    </section>
  );
}
