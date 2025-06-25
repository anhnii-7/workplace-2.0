import { Header } from "@/app/user/(home)/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="">
        {/* <Header /> */}
        <SidebarProvider>
          <AppSidebar />
          <main className="bg-blue-50 w-full h-full p-10">{children}</main>
        </SidebarProvider>
      </div>
    </section>
  );
}
