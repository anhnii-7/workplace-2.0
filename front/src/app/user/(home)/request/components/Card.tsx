import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button'
import axios from 'axios';
import {
    Calendar,
    CalendarDays,
    CheckCheck,
    Clock3,
    Clock4,
    Frown,
    MapPin,
    User,
    Users
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface CardProps {
    notif: any;
    direction: 'sent' | 'recieved'; // Note the correct spelling
    onRemove?: () => void;
}
const Card = ({notif, direction, onRemove} : CardProps) => {
    // Choose the correct user aggregate based on direction
    const main = direction === 'recieved'
    ? notif.fromUser
    : notif.toUser;
    // {     notif.type === "Event" ? (       <div> {/* Event UI */} </div>     ) :
    // notif.type === "Request" ? (       <div> {/* Request UI */} </div>     ) :
    // null   }
    // console.log(direction)
    console.log(notif)
    const handleAcceptRequest = async (requestId: string) => {
        console.log(requestId)
        const response = await axios.put(`/api/request/${requestId}`, {
            status: "accepted"
        })
        if (onRemove) onRemove();
    }
    const handleDeclineRequest = async (requestId: string) => {
        console.log(requestId)
        const response = await axios.put(`/api/request/${requestId}`, {
            status: "declined"
        })
        if (onRemove) onRemove();
    }
    return (<> {
        notif.type === "Request" ? (<div
                 className={`w-full bg-amber-50 h-fit rounded-lg p-6 flex flex-col gap-10
                    ${direction === "sent" ? "h-[348px]":"h-[324px]"}
                    `
                }>
                    {
                        notif?.request[0]?.status==="pending" && direction === "sent"? (<>
                        <div className='w-[487px] py-3 flex items-center'>
                            <div className={`w-[334px] bg-orange-100 border-amber-100 flex items-center py-2.5 px-4 rounded-md gap-2`}>
                                <Clock4 className='h-4 w-4'
                                    color='#78350F'
                                />
                                <span className='text-sm font-medium text-amber-900'>
                                    Хүсэлт хүлээгдэж байна
                                </span>
                            </div>    
                        </div>  
                        </>): notif?.request[0]?.status === "accepted" && direction === "sent" ?(<>
                            <div className={`w-[334px] bg-green-50 border-green-800 flex py-2.5 px-4 rounded-md gap-2 flex-col`}>
                            <div className='flex gap-3 items-center'>
                                <CheckCheck className='h-4 w-4'
                                    color='#14532D'
                                />
                                <span className='text-sm font-medium text-emerald-800'>
                                    Хүсэлт зөвшөөрөгдсөн байна. Амжилт хүсье!
                                </span>
                            </div>
                        </div> 
                        </>):(<>
                            <div className={`w-[334px] bg-red-50 border-red-800 flex py-2.5 px-4 rounded-md gap-2 flex-col`}>
                            <div className='flex gap-3 items-center'>
                                <Frown className='h-4 w-4'
                                    color='#991B1B'
                                />
                                <span className='text-sm font-medium text-red-800'>
                                    Уучлаарай завгүй байна.
                                </span>
                            </div>
                        </div>
                        </>)
                    }
                <div className='flex gap-5'>
                    
                    <div
                        className='flex-1 bg-white rounded-lg flex items-center px-3 py-4.5 gap-3'>
                        <Image
                            src={main
                                ?.image || "/avatar.png"}
                            width={64}
                            height={64}
                            alt='User'
                            priority={false}
                            loading="lazy"
                            className='w-[64px] h-[64px] object-cover rounded-lg'/>
                        <span className='text-lg text-slate-800 font-semibold'>
                            {
                                main
                                    ?.name || "Title"
                            }
                        </span>
                    </div>
                    <div className='flex-1 bg-white rounded-lg py-4 px-3 gap-1'>
                        <div className='flex items-center gap-3 py-1'>
                            <User className='text-slate-700 text-base font-medium w-5 h-5'/>
                            <span className='text-slate-700 text-base font-medium'>
                                {
                                    main
                                        ?.jobTitle || "JobTitle"
                                }
                            </span>
                        </div>
                        <div className='flex items-center gap-3 py-1'>
                            <MapPin className='text-slate-700 text-base font-medium w-5 h-5'/>
                            <span className='text-slate-700 text-base font-medium'>
                                {
                                    main
                                        ?.departmentInfo
                                            ?.title || main
                                                ?.department || "Department"
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md px-3 py-2'>
                    <span className='text-sm font-normal'>
                        {
                            notif?.request[0]?.message|| "description"
                        }
                    </span>
                </div>
                <div className='flex gap-5'>
                    {direction === "recieved" ? (
                        <>
                            <Button className='flex-1 text-sm font-medium text-black border-amber-200 border-1 bg-white hover:bg-white' onClick={() => handleDeclineRequest(notif.request[0]._id)}>
                                Татгалзах
                            </Button>
                            <Button className='flex-1 text-sm font-medium text-amber-900 bg-amber-200 hover:bg-amber-200' onClick={() => handleAcceptRequest(notif.request[0]._id)}>
                                Зөвшөөрөх
                            </Button>
                        </>
                    ) : null}
                </div>
            </div>
            ): notif.type === "Event" && direction !== "sent" ? (
            <div
                // className='w-[535px] h-[324px] bg-[#E5EFF8] rounded-lg p-6 flex flex-col gap-5 [&>*]:box-border'>
                className='w-full h-[324px] bg-amber-50 rounded-lg p-6 flex flex-col gap-5 [&>*]:box-border'>
                <div className='flex gap-5 justify-between'>
                    <div className='rounded-lg flex items-center gap-3'>
                        <div
                            className='w-16 h-16 bg-yellow-100 rounded-lg flex justify-center items-center'>
                            <Calendar className='h-6 w-6' color='#78350F'/>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-2xl text-slate-700 font-semibold'>
                                {
                                    notif
                                        ?.event
                                            ?.name || "Title"
                                }
                            </span>
                            <span className='text-slate-600 text-base font-normal'>
                                {
                                    notif
                                        ?.eventTypeInfo
                                            ?.title
                                }
                            </span>
                        </div>
                    </div>
                    <Badge
                        className='bg-amber-900 text-sx font-medium w-fit h-fit flex items-center rounded-full px-3 py-1'>
                        <span className='text-white'>
                            2 хүн дутуу
                        </span>
                    </Badge>
                </div>
                <span className='text-base font-normal text-slate-600'>
                    {
                        notif
                            ?.event
                                ?.description || "description"
                    }
                </span>
                <div className='grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-3'>
                    <div className='flex gap-2 py-2 px-4 items-center bg-white rounded-md'>
                        <CalendarDays className='h-4 w-4'/>
                        <span>
                            {
                                notif
                                    ?.event
                                        ?.eventDate
                                            ? new Date(notif.event.eventDate)
                                                .toISOString()
                                                .slice(5, 10)
                                            : "Start Date"
                            }
                        </span>

                    </div>
                    <div className='flex gap-2 py-2 px-4 items-center bg-white rounded-md'>
                        <Clock3 className='h-4 w-4'/>
                        <span>
                            {
                                notif
                                    ?.event
                                        ?.eventTime || "Start Date"
                            }
                        </span>
                    </div>
                    <div className='flex gap-2 py-2 px-4 items-center bg-white rounded-md'>
                        <MapPin className='h-4 w-4'/>
                        <span>
                            {
                                notif
                                    ?.event
                                        ?.eventLocation || "Start Date"
                            }
                        </span>
                    </div>
                    <div className='flex gap-2 py-2 px-4 items-center bg-white rounded-md'>
                        <Users className='h-4 w-4'/>
                        <span>
                            {
                                notif
                                    ?.event
                                        ?.maxParticipants || "Start Date"
                            }
                        </span>
                    </div>
                </div>
                <Button className='flex-1 text-sm font-medium text-amber-900 bg-amber-200 hover:bg-amber-200 hover:text-amber-900'>Эвентэд нэгдэх</Button>
            </div>
            ) : null }
        </>
        )
}

export default Card;