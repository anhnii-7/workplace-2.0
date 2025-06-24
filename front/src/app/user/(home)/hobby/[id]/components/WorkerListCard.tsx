"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import React from "react";

export const WorkerListCard = () => {
  return (
    <div className="bg-white box-border rounded-lg p-3 w-[210px] flex flex-col items-center gap-3 ">
      <div className="flex flex-col gap-3 justify-center pb-4">
        <Avatar className="w-[124px] h-[120px] rounded-xl">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-[2px] items-center">
          <p className="text-lg font-semibold leading-7 text-slate-700">ner</p>
          <div className="flex gap-2">
            <Briefcase />
            <p className="font-normal text-sm leading-5 text-slate-700">
              mergejil
            </p>
          </div>
        </div>
      </div>
      <div>
        <Badge className="bg-indigo-50 text-blue-900 text-xs font-medium leading-4">
          hobby
        </Badge>
      </div>
      <Button
        variant={"outline"}
        className="bg-white text-blue-400 border-1 border-blue-400 hover:bg-blue-50 "
      >
        Хүсэлт илгээх
      </Button>
    </div>
  );
};
