"use client"
import React from 'react'
import { Command, User } from 'lucide-react'
function LeaderboardEmployee() {
    return (
        <div>
            <div className=' h-[66px] flex justify-between items-center  bg-slate-100 rounded-xl gap-10 px-[14px]'>
                <div className="flex flex-col gap-1">
                    <div className='flex gap-3'>
                        <div className='w-[20px] h-[20px] bg-slate-300 rounded-full flex items-center justify-center'>2</div>
                        <div><h1 className='font-semibold'>С.Болд</h1></div>
                    </div>
                    <div className='flex gap-1'>
                        <User className='w-[20px] h-[20px]'></User>
                        <p className='text-[14px]'>Ахлах Хөгжүүлэгч</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Command></Command>
                    <p>13</p>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardEmployee
