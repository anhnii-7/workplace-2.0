"use client";
import {
  Bell,
  ChevronDown,
  Heart,
  HelpCircle,
  Shield,
  Trash,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Switch from "./Toggle";


export const Header = () => {
  return (
    <header className="flex justify-between px-10 py-3 fixed w-full bg-white z-50 border-b border-gray-200">
      <Link href={"/user"}>
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={"AG"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium ">Align Gang</p>
        </div>
      </Link>
      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="" variant={"outline"} >
              Үндсэн цэс
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={"/user/advice"}>
              <DropdownMenuItem>Зөвлөгөө</DropdownMenuItem>
            </Link>
            <Link href={"/user/hobby"}>
              <DropdownMenuItem>Хобби</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={"/user/request"}>
          <Button className="" variant={"outline"}>
           Xүсэлтүүд
          </Button>
        </Link>
        <Link href={"/user/wishlist"}>
          <Button className="" variant={"outline"}>
     <Heart/>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="" variant={"outline"}>
              <Bell />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>{" "}
          <DropdownMenuSeparator />
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex flex-col items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h6>Bold</h6>
            </DropdownMenuLabel>
            <div className="border-t border-1 "></div>
            <DropdownMenuLabel>Тохиргоо</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center justify-between">
                <Shield />
                <div className="flex flex-col ">
                  <p>Статус тохиргоо</p>
                  <p>Завгүй ш дээ хө</p>
                </div>
                <Switch />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User />
              Хувийн мэдээлэл
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User />
              Хобби
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle />
              Тусламж
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              Бүртгэл устгах
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
