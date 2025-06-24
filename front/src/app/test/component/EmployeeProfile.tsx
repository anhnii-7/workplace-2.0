import React from 'react'
import Image from 'next/image'
import { Command, User } from 'lucide-react'
function EmployeeProfile() {
    return (
        <div>
            <div className='flex gap-6 justify-center items-center border-b border-b-gray-400 pb-[20px]'>
                <div className='relative'>
                    <div className='bg-yellow-400 rounded-full w-[30px] h-[30px] absolute -right-4 -top-4 flex justify-center items-center' >1</div>
                    <Image width={110} height={110} src={`/avatar.png`} alt='avatar'></Image>
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold'>А.Гансүх</h1>
                    <p className='font-normal text-gray-500'>Ахлах дизайнер</p>
                    <div className='flex gap-1 '><Command></Command> <p>19 уулзалт</p></div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile
