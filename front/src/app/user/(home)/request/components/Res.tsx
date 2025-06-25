"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


import { Textarea } from "@/components/ui/textarea";
import {
  Brush,
  Calendar,
  CheckCheck,
  Clock4,
  MapPin,
  User,
} from "lucide-react";
import { useState } from "react";



export const ResBody = () => {
    return(
        <div className="flex flex-col gap-5">
            <div className="bg-blue-200 p-6 rounded-[8px] flex flex-col gap-10">
              <div>
                <Badge className="font-semibold text-xs text-white bg-cyan-700 leading-4 flex justify-self-end">
                  Зөвлөгөө
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-[8px] px-6 py-3 flex items-center gap-4">
                  <Avatar className="w-[64px] h-[64px]">
                    <AvatarImage src={"AG"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ">
                    <h1 className="text-slate-800 font-semibold leading-7 text-lg">
                      Г. Гансүх
                    </h1>
                  </div>
                </div>
                <div className="bg-white rounded-[8px] p-3 flex flex-col gap-2">
                  <div className="flex gap-3 ">
                    <User className="w-5 h-5" />{" "}
                    <p className="text-slate-700 text-base font-medium leading-6 ">
                      Ахлах дизайнер
                    </p>
                  </div>
                  <div className="flex gap-3 ">
                    {" "}
                    <MapPin className="w-5 h-5" />{" "}
                    <p className="text-slate-700 text-base font-medium leading-6">
                      Хөгжүүлэлтийн хэлтэс
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-[8px] p-3 flex flex-col gap-2 ">
                  <p className="text-slate-700 text-base font-medium leading-6 ">
                    Ажиллаж буй хугацаа :
                  </p>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <p className="text-slate-700 text-base font-medium leading-6 ">
                      5 жил
                    </p>
                  </div>
                </div>
              </div>
              <Textarea
                className="bg-white"
                defaultValue="  Шинээр ажилд орсонд нь баяр хүргэе. Манай багт тавтай морил.
                Ахлах дизайнерын хувьд хамтран ажиллах болсондоо баяртай байна.
                Шинэ хамт олондоо дасан зохицох үүднээс багийн ахлагчтай
                хувьчилсал уулзалт хийж дотно яриа болон хувьчилсан зөвлөгөө
                авах зэрэг олон асуудлаар хандаж уулзах боломжтой шүү."
              ></Textarea>
              <div className="grid grid-cols-2 gap-5">
                <button className="bg-white text-blue-400 flex px-4 py-2 items-center rounded-md border-1 border-blue-400 hover:bg-blue-50 cursor-pointer  justify-center">
                  Боломжит өдрийн хүсэлт илгээх
                </button>
                <button
                  className="bg-blue-400 text-white flex justify-center px-4 py-2 items-center  rounded-md border-1 border-blue-500 hover:bg-blue-500 cursor-pointer"
                  type="submit"
                >
                  Зөвшөөрөх
                </button>
              </div>
            </div>
            <div className="bg-blue-100 p-6 rounded-[8px] flex flex-col gap-10">
              <div>
                <Badge className="font-semibold text-xs text-white bg-cyan-700 leading-4 flex justify-self-end">
                  Зөвлөгөө
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-[8px] px-6 py-3 flex items-center gap-4">
                  <Avatar className="w-[64px] h-[64px]">
                    <AvatarImage src={"AG"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ">
                    <h1 className="text-slate-800 font-semibold leading-7 text-lg">
                      Д. Болдбаатар
                    </h1>
                  </div>
                </div>
                <div className="bg-white rounded-[8px] p-3 flex flex-col gap-2">
                  <div className="flex gap-3 ">
                    <User className="w-5 h-5" />{" "}
                    <p className="text-slate-700 text-base font-medium leading-6 ">
                      Ерөнхий менежер
                    </p>
                  </div>
                  <div className="flex gap-3 ">
                    {" "}
                    <MapPin className="w-5 h-5" />{" "}
                    <p className="text-slate-700 text-base font-medium leading-6">
                      Хөгжүүлэлтийн хэлтэс
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-[8px] p-3 flex flex-col gap-2 ">
                  <p className="text-slate-700 text-base font-medium leading-6 ">
                    Ажиллаж буй хугацаа :
                  </p>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <p className="text-slate-700 text-base font-medium leading-6 ">
                      3 жил
                    </p>
                  </div>
                </div>
              </div>
              <Textarea
                className="bg-white"
                defaultValue="  Шинээр ажилд орсонд нь баяр хүргэе. Манай багт тавтай морил.
                Ахлах дизайнерын хувьд хамтран ажиллах болсондоо баяртай байна.
                Шинэ хамт олондоо дасан зохицох үүднээс багийн ахлагчтай
                хувьчилсал уулзалт хийж дотно яриа болон хувьчилсан зөвлөгөө
                авах зэрэг олон асуудлаар хандаж уулзах боломжтой шүү."
              ></Textarea>
              <div className="grid grid-cols-2 gap-5">
                <button className="bg-white text-blue-400 flex px-4 py-2 items-center rounded-md border-1 border-blue-400 hover:bg-blue-50 cursor-pointer  justify-center">
                  Боломжит өдрийн хүсэлт илгээх
                </button>
                <button
                  className="bg-blue-400 text-white flex justify-center px-4 py-2 items-center  rounded-md border-1 border-blue-500 hover:bg-blue-500 cursor-pointer"
                  type="submit"
                >
                  Зөвшөөрөх
                </button>
              </div>
            </div>
        </div>
    )}