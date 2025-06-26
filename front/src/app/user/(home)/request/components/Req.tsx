"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCheck, Clock4, MapPin, User } from "lucide-react";
import { useState } from "react";

export const ReqBody = () => {
  type EventType = "advice" | "hobby";

  const [currentUser, setCurrentUser] = useState<any>(null);
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-blue-100 p-6 rounded-[8px] flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 bg-green-50 rounded-md px-4 py-2 items-center w-[334px]">
            <CheckCheck className="text-green-900 w-4 h-4"/>
            <p className="text-sm font-medium leading-5 text-emerald-900">
              Болзоот өдрөө хүлээж байна : 06-18
            </p>
          </div>
          <Badge
            className={`text-white text-xs font-semibold text-center${
              currentUser?.role === "advice" ? "bg-cyan-700 " : " bg-indigo-700"
            }`}
          >
            {currentUser?.role === "advice" ? "Хобби" : "Зөвлөгөө"}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[8px] px-6 py-3 flex items-center gap-4">
            <Avatar className="w-[64px] h-[64px]">
              <AvatarImage src={"AG"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <h1 className="text-slate-800 font-semibold leading-7 text-lg">
                Г. Хулан
              </h1>
            </div>
          </div>
          <div className="bg-white rounded-[8px] p-3 flex flex-col gap-2">
            <div className="flex gap-3 ">
              <User className="w-5 h-5" />{" "}
              <p className="text-slate-700 text-base font-medium leading-6 ">
                Хөгжүүлэгч
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
        </div>
        <Textarea
          className="bg-white"
          defaultValue="Сайн байна уу? Шинээр ажилд ороод удаагүй шинэхэн ботго танаа, сонирхол нэгтэй тул уулзаж санал бодлоо солилцох уу ?"
        ></Textarea>
      </div>
      <div className="bg-blue-100 p-6 rounded-[8px] flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 bg-amber-50 rounded-md px-4 py-2 items-center">
            <Clock4 className="w-4 h-4"/>
            <p className="text-sm font-medium leading-5 text-slate-700 w-[334px]">
              Хүлээгдэж байна
            </p>
          </div>
          <Badge
            className={`text-white text-xs font-semibold text-center${
              currentUser?.role === "advice" ? "bg-cyan-700 " : " bg-indigo-700"
            }`}
          >
            {currentUser?.role === "advice" ? "Хобби" : "Зөвлөгөө"}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[8px] px-6 py-3 flex items-center gap-4">
            <Avatar className="w-[64px] h-[64px]">
              <AvatarImage src={"AG"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <h1 className="text-slate-800 font-semibold leading-7 text-lg">
                Ж. Хулан
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
        </div>
        <Textarea
          className="bg-white"
          defaultValue="Hi, ажилд ороод удаагүй байгаа болохоор сүүлийн үед бага зэрэг дизайнер хийх нь хэцүү санагдаж байгаа тул тантай уулзаж санаа бодлоо хуваалцах болон дизайнтай холбоотой зөвлөгөө авах хүсэлтэй байна."
        ></Textarea>
      </div>
    </div>
  );
};
