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
      <div className=" bg-blue-50 w-full h-full">
        {/* <Header /> */}
        <SidebarProvider>
          <AppSidebar />
          <main>{children}</main>
        </SidebarProvider>
      </div>
    </section>
  );
}
