"use client"
import React from 'react'
import { MessageSquare, User } from 'lucide-react'

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
  rank: number;
}

interface LeaderboardEmployeeProps {
  user: User;
}

function LeaderboardEmployee({ user }: LeaderboardEmployeeProps) {
    return (
        <div>
            <div className='h-[66px] flex justify-between items-center bg-slate-100 rounded-xl gap-10 px-2 py-1'>
                <div className="flex flex-col gap-1">
                    <div className='flex gap-4 items-center'>
                        <p className='w-6 h-6 bg-[#D9D9D9] rounded-full flex items-center justify-center text-base font-medium leading-6'>
                            {user.rank}
                        </p>
                        <h1 className='font-semibold text-lg leading-7 text-slate-800'>
                            {user.lastName.charAt(0)}.{user.name}
                        </h1>
                    </div>
                    <div className='flex gap-1'>
                        <User className='w-[20px] h-[20px]'></User>
                        <p className='text-sm font-normal leading-5 text-slate-700'>
                            {user.departmentInfo.jobTitleInfo?.title || 'No Position'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <MessageSquare className='w-[15px] h-[15px]'/>
                    <p className='text-slate-700 text-sm font-normal leading-5'>
                        {user.menteesCount}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardEmployee