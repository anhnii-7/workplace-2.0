import { SidebarProvider } from "@/components/ui/sidebar";
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
          <main className="w-full h-screen">
            <div className="p-10">{children}</div></main>
        </SidebarProvider>
      </div>
    </section>
  );
}
