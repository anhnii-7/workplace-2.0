"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Brush, Calendar, MapPin, User } from "lucide-react";

export default function RequestPage() {
  return (
    <div className="w-full h-screen ">
      <div className="text-center pb-[60px]">
        <h1 className="text-slate-700 text-2xl leading-8 font-semibold">
          Танд ирсэн мэдэгдлүүд
        </h1>
      </div>
      <div className="flex items-center">
        <Tabs defaultValue="res" className="w-full">
          <TabsList className="w-full bg-blue-100 rounded-[6px] mb-8">
            <TabsTrigger value="res">Ирсэн хүсэлтүүд</TabsTrigger>
            <TabsTrigger value="req">Илгээсэн хүсэлтүүд</TabsTrigger>
          </TabsList>
          <TabsContent value="res" className="flex flex-col gap-5">
            <div className="bg-blue-200 p-6 rounded-[8px] flex flex-col gap-10">
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
          </TabsContent>
          <TabsContent value="req">
            <div className="bg-indigo-50 p-6 rounded-[8px] flex flex-col gap-10">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-[8px] p-3 flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={"AG"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="text-slate-800 font-semibold leading-7 text-lg">
                      Ner bnaa
                    </h1>
                    <Badge className="text-xs font-medium bg-[#FFF8E8] py-1 text-gray-900">
                      Ботго
                    </Badge>
                  </div>
                </div>
                <div className="bg-white rounded-[8px] p-3 flex flex-col gap-1">
                  <div className="flex gap-3 ">
                    <Brush /> <p>Дизайнер</p>
                  </div>
                  <div className="flex gap-3 ">
                    {" "}
                    <MapPin /> <p>Хөгжүүлэлтийн хэлтэс</p>
                  </div>
                </div>
                <div className="bg-white rounded-[8px] p-3 flex flex-col gap-2 ">
                  <p className="text-slate-700 text-base font-medium leading-6 ">
                    Ажиллаж буй хугацаа :
                  </p>
                  <div className="flex items-center gap-3">
                    <Calendar />
                    <p>3 sar</p>
                  </div>
                </div>
              </div>
              <Textarea className="bg-white"></Textarea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
