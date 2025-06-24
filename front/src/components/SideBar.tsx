import { BookOpen, ChevronDown, HeartHandshake, HelpCircle, MessageSquare, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const SideBar = () => {
  return (
    <div
        className='w-[302px] bg-white h-auto px-5 py-10 flex flex-col gap-10'
    >
        <div className='flex items-center gap-3 p-2'>
            <Image
                src="https://res.cloudinary.com/dl3wkodkk/image/upload/v1748261376/07e9eaaf-18e3-40b0-86be-ea5e0781c68d_esxixq.jpg"
                alt="Logo"
                width={200}
                height={60}
                className="object-cover rounded-lg h-[60px] w-[60px]"
            />
            <div>
                <h6 className='text-sm text-slate-700 font-semibold'>Чингүүн</h6>
                <p className='text-xs font-normal text-slate-500'>Хөгжүүлэгч</p>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <MessageSquare className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Зөвлөгөө</h6>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <HeartHandshake className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Сонирхлоороо нэгдье</h6>                     
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <BookOpen className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Хүсэлтүүд</h6>    
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <span className='text-slate-500 font-medium text-sm'>Миний хуудас</span>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <MessageSquare className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Хувийн мэдээлэл</h6>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <Plus className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Хобби нэмэх</h6>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <HelpCircle className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Тусламж</h6>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-slate-200 rounded-full cursor-pointer px-4 py-2'>
                <Trash2 className='text-slate-700 w-4 h-4' />
                <h6 className='text-sm text-slate-700 font-semibold'>Бүртгэл устгах</h6>
            </div>
        </div>
    </div>
  )
}

export default SideBar