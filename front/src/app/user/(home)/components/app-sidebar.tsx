"use client";
import {
  BookOpen,
  Calendar,
  Handshake,
  HelpCircle,
  Home,
  Inbox,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Trash,
  Trash2,
} from "lucide-react";
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
        title: "Хүсэлтүүд",
        url: "/user/request",
        icon: BookOpen,
      },
    ],
  },
  {
    name: "Миний хуудас",
    item: [
      {
        title: "Хувийн мэдээлэл",
        url: "/user/profile",
        icon: Search,
      },
      {
        title: "Хобби нэмэх",
        url: "/user/#",
        icon: Plus,
      },
      {
        title: "Тусламж",
        url: "/user/",
        icon: HelpCircle,
      },
      {
        title: "Бүртгэл устгах",
        url: "/user/#",
        icon: Trash2,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname(); // одоогийн path-ийг авна

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
         <Link href="/user" className="no-underline">
          <SidebarGroupLabel className="flex items-center gap-3 my-10">
            <Avatar className="w-[60px] h-[60px] rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-slate-700 font-semibold leading-5 text-base">
                Ner
              </h1>
              <p className="text-slate-500 text-xs font-normal leading-4">
                ajil
              </p>
            </div>
          </SidebarGroupLabel></Link>

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
                      <SidebarMenuButton asChild>
                        <a
                          href={menuItem.url}
                          className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                            isActive
                              ? "bg-blue-400 text-white"
                              : "text-slate-700 hover:bg-slate-100"
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
