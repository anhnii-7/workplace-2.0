"use client";
import { Bell, Handshake, LucidePartyPopper, MessageSquare, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

// Menu items.
const items = [
  {
    name: "",
    item: [
      {
        title: "Зөвлөгөө",
        url: "/user/advice",
        icon: MessageSquare,
      },
      {
        title: "Сонирхлоороо нэгдье",
        url: "/user/hobby",
        icon: Handshake,
      },
      {
        title: "Эвэнт",
        url: "/user/event",
        icon: LucidePartyPopper,
      },
      {
        title: "Мэдэгдэл",
        url: "/user/request",
        icon: Bell,
      },
      {
        title: "Хобби нэмэх",
        url: "/user/myHobby",
        icon: Plus,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname(); // одоогийн path-ийг авна
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    setCurrentUser(currentUserString ? JSON.parse(currentUserString) : null);
  }, []);

  // console.log(currentUser, "currentuser")

  return (
    <Sidebar className="border-none">
      <SidebarContent className="rounded-[0px_24px_24px_0px] overflow-hidden px-3">
        <SidebarGroup>
          <Link href="/user" className="no-underline shadow-[0px_0px_4px_2px_rgba(125,168,225,0.12)] my-10">
            <SidebarGroupLabel className="flex items-center gap-3 my-10  ">
              <Avatar className="w-[60px] h-[60px] rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="">
                <h1 className="text-slate-700 font-semibold leading-5 text-base">
                  {currentUser?.name}
                </h1>
                <p className="text-slate-500 text-xs font-normal leading-4">
                  {currentUser?.departmentInfo?.jobTitleInfo.title}
                </p>
              </div>
            </SidebarGroupLabel>
          </Link>

          <SidebarGroupContent>
            {items.map((group, groupIdx) => (
              <SidebarMenu key={groupIdx}>
                {group.name && (
                  <SidebarGroupLabel className="px-3 py-1 text-xs text-muted-foreground">
                    {group.name}
                  </SidebarGroupLabel>
                )}
                {group.item.map((menuItem, index) => {
                  const isActive = pathname === menuItem.url;

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild className="rounded-lg">
                        <a
                          href={menuItem.url}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 ${
                            isActive
                              ? "text-blue-900 bg-[#B8D5ED]"
                              : "text-slate-700 bg-white hover:bg-slate-100"
                          }`}
                        >
                          <menuItem.icon className="w-4 h-4" />
                          <span>{menuItem.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
