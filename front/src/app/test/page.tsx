"use client"
import SideBar from '@/components/SideBar'
import React from 'react'
import Image from 'next/image'
import { Command, User } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import EmployeeProfile from './component/EmployeeProfile'
import LeaderboardEmployee from './component/LeaderboardEmployee'
import { useState } from 'react'
const page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className='bg-[#c5dbf8] flex relative '>
      <SideBar />
      <div className=' absolute right-10 w-[310px] h-screen  rounded-xl py-[40px]'>
        <div className='rounded-xl h-full flex flex-col gap-[40px]'>
          <div className='w-full h-[528px] bg-white rounded-xl flex flex-col gap-6 items-center'>
            <h1 className='text-center pt-[12px] text-gray-500'>Уулзалтын тоогоор тэргүүлэгчдийн жагсаалт</h1>
            <EmployeeProfile />
            <div className='flex flex-col gap-2 pb-[20px]'>
              <LeaderboardEmployee />
              <LeaderboardEmployee />
            </div>
          </div>
          <div className='w-full h-[402px] bg-white rounded-xl flex flex-col items-center gap-4'>
            <h1 className='text-[16px] pt-[20px] font-semibold'>Боломжит өдрөө сонгоорой</h1>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm w-full bg-transparent"
              captionLayout="dropdown"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page