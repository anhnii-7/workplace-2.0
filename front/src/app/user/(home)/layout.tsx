import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex ">
     
        <SideBar />
          <main className="w-[1210px] h-screen p-10 mx-auto">{children}</main>
      </div>
    </section>
  );
}