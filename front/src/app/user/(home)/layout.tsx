import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex ">
        <SideBar  />
          <main className="w-full h-screen p-10">{children}</main>
      </div>
    </section>
  );
}
 