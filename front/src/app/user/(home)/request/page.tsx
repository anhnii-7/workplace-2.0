import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ReqBody } from "./components/Req";
import { ResBody } from "./components/Res";
import Image from "next/image";
export default function RequestPage() {
  return (
    <div className="w-full h-screen px-5 relative">
          <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363331/greee-1_jcxmpi.png`} 
            width={171} 
            height={149} 
            className="w-[171px] h-[149px] absolute -bottom-20 left-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363216/green-2_ktnkvs.png`} 
            width={240} 
            height={240} 
            className="w-[70px] h-[94px] absolute bottom-20 -right-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363167/red-ball_v73ekg.png`} 
            width={124} 
            height={124} 
            className="w-[124px] h-[124px] absolute top-15 -right-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363263/green_z5wo1z.png`} 
            width={94} 
            height={100} 
            className="w-[94px] h-[100px] absolute top-24 -left-10 z-10 " 
            alt="containerIMG"
            priority 
          />
      <div className="text-center p-4 mb-14 z-20">
        <h1 className="text-slate-800 text-3xl leading-8 font-medium">
          Танд ирсэн мэдэгдлүүд
        </h1>
      </div>
      <div className="flex items-center z-20">
        <Tabs defaultValue="res" className="w-full z-20">
          <TabsList className="w-full bg-white border border-amber-200 mb-8 h-15 p-2 rounded-xl gap-5">
            <TabsTrigger
              value="res"
              className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 data-[state=active]:font-medium data-[state=active]:py-3 data-[state=active]:rounded-lg rounded-lg text-gray-400 text-sm py-3 font-medium "
            >
              Ирсэн хүсэлтүүд
            </TabsTrigger>
            <TabsTrigger
              value="req"
              className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 data-[state=active]:font-medium data-[state=active]:py-3 data-[state=active]:rounded-lg rounded-lg text-gray-400 text-sm py-3 font-medium"
            >
              Илгээсэн хүсэлтүүд
            </TabsTrigger>
          </TabsList>
          <TabsContent value="res">
            <ResBody />
          </TabsContent>
          <TabsContent value="req">
            <ReqBody />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
