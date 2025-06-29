import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ReqBody } from "./components/Req";
import { ResBody } from "./components/Res";

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
