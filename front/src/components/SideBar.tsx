"use client"

import { Bell, Handshake, LucidePartyPopper, MessageSquare, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const items = [
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
]

const SideBar = () => {
    const pathname = usePathname();
    const [currentUser, setCurrentUser] = useState<any>(null);
    
    useEffect(() => {
      const currentUserString = localStorage.getItem("currentUser");
      setCurrentUser(currentUserString ? JSON.parse(currentUserString) : null);
    }, []);
    const profile = currentUser?.image || "/avatar.png";
    console.log(currentUser)
    return (
        <div
            className='w-[302px] bg-amber-50 rounded-[0px_24px_24px_0px] px-5 py-10 flex flex-col gap-10 fixed h-screen'
        >
            <div className='w-[262px] flex items-center gap-3 p-2 rounded-md shadow-[0px_0px_4px_2px_rgba(125,168,225,0.12)]'>
                <Image
                    src={profile}
                    alt="Logo"
                    width={200}
                    height={60}
                    className="object-cover rounded-lg h-[60px] w-[60px]"
                />
                <div>
                    <Link href="/user">
                        <h6 className='text-sm text-slate-700 font-semibold'>{currentUser?.name}</h6>
                        <p className='text-xs font-normal text-slate-500'>{currentUser?.departmentInfo?.jobTitleInfo.title}</p>
                    </Link>
                </div>
            </div>
            <div className='w-[262px] flex flex-col gap-2'>
                {
                    items.map((i,index) => {
                        const isActive = pathname === i.url;
                        return (
                            <Link key={index} href={i.url} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 ${isActive
                                    ? "text-blue-900 bg-[#B8D5ED]"
                                    : "text-slate-700 bg-white hover:bg-slate-100"
                                }`}>
                                <i.icon className='text-slate-700 w-4 h-4' />
                                <h6 className='text-sm text-slate-700 font-normal'>{i.title}</h6>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default SideBar
 