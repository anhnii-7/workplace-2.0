"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Brush, Calendar, MapPin } from "lucide-react";

export default function RequestPage() {
  return (
    <div className="w-full h-screen ">
      <div className="text-center py-30">
        <h1 className="text-slate-800 text-3xl font-semibold">
          Таны хүсэлтүүд
        </h1>
      </div>
      <div className="flex items-center">
        <Tabs defaultValue="res" className="w-[1090px]">
          <TabsList className="w-[1090px] bg-indigo-50 rounded-[6px] mb-8">
            <TabsTrigger value="res">Ирсэн хүсэлтүүд</TabsTrigger>
            <TabsTrigger value="req">Илгээсэн хүсэлтүүд</TabsTrigger>
          </TabsList>
          <TabsContent value="res">
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
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={"outline"}
                  className="border-blue-400 text-cyan-900"
                >
                  Амжихгүй нь ээ хө
                </Button>
                <Button variant={"outline"} className="bg-blue-400 text-white">
                  Өдрөө сонгох уу{" "}
                </Button>
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
