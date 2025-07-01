import React from "react";
import Image from "next/image";
import { MessageSquare } from "lucide-react";

interface User {
  _id: string;
  name: string;
  lastName: string;
  departmentInfo: {
    title: string;
    jobTitleInfo?: {
      title: string;
    };
  };
  menteesCount: number;
  image?: string;
}

interface EmployeeProfileProps {
  topLeader?: User;
}

function EmployeeProfile({ topLeader }: EmployeeProfileProps) {
  if (!topLeader) {
    return (
      <div className="flex justify-center items-center py-4">
        <p>No leader data available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-6 justify-center items-center border-b border-b-gray-400 pb-[20px]">
        <div className="relative">
          <div className="bg-yellow-400 rounded-full w-[30px] h-[30px] absolute -right-4 -top-4 flex justify-center items-center">
            1
          </div>
          {topLeader.image ? (
            <Image
              width={110}
              height={110}
              src={topLeader.image}
              alt="profile"
              className="rounded-full"
            />
          ) : (
            <div className="w-[110px] h-[110px] rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold">
              {topLeader.name.charAt(0)}
              {topLeader.lastName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg leading-7 text-slate-800">
            {topLeader.lastName.charAt(0)}.{topLeader.name}
          </h1>
          <p className="font-normal text-slate-700 text-sm leading-5">
            {topLeader.departmentInfo.jobTitleInfo?.title || 'No Position'}
          </p>
          <div className="flex gap-2 items-center">
            <MessageSquare className="w-[15px] h-[15px]" />
            <p className="text-sm font-normal leading-5 text-slate-700">
              {topLeader.menteesCount || 0} уулзалт
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;