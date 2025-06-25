"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import React from "react";
import { User } from "../page";

export const WorkerListCard = ({ users }: { users: User[] }) => {
  console.log(users, "worklist")
  return (
    <>
      {
        users.map(user => {
          return (
            <div key={user._id} className="bg-white box-border rounded-lg p-3 w-[210px] h-[350px] flex flex-col items-center gap-3 ">
              <div className="flex flex-col gap-3 justify-center items-center pb-4">
                <Avatar className="w-[124px] h-[120px] rounded-xl">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-[2px] items-center">
                  <p className="text-lg font-semibold leading-7 text-slate-700">{user.lastName.charAt(0)}. {user.name}</p>
                  <div className="flex gap-2">
                    <Briefcase />
                    <p className="font-normal text-sm leading-5 text-slate-700">
                      {user.departmentInfo.jobTitleInfo.title}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Badge key={user.hobbyInfo._id} className="bg-indigo-50 text-blue-900 text-xs font-medium leading-4">
                  {user.hobbyInfo.title}
                </Badge>
                {/* {
                  user.hobbyInfo.map(hobby => {
                    return (
                      <Badge key={hobby._id} className="bg-indigo-50 text-blue-900 text-xs font-medium leading-4">
                       {hobby.title}
                      </Badge>
                    )
                  })
                } */}
              </div>
              <Button
                variant={"outline"}
                className="bg-white text-blue-400 border-1 border-blue-400 hover:bg-blue-50 "
              >
                Хүсэлт илгээх
              </Button>
            </div>
          )
        })
      }
    </>
  );
};
