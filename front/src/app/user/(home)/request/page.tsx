import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ReqBody } from "./components/Req";
import { ResBody } from "./components/Res";

export default function RequestPage() {
  return (
    <div className="w-full h-screen px-5">
      <div className="text-center pb-[60px]">
        <h1 className="text-slate-700 text-2xl leading-8 font-semibold">
          Танд ирсэн мэдэгдлүүд
        </h1>
      </div>
      <div className="flex items-center ">
        <Tabs defaultValue="res" className="w-full ">
          <TabsList className="w-full bg-slate-50 rounded-[6px] mb-8 p-2">
            <TabsTrigger
              value="res"
              className="data-[state=active]:bg-[#E5EFF8] data-[state=active]:text-slate-800 data-[state=active]:font-semibold text-slate-500 text-base px-8 py-2 rounded-[6px] transition-colors h-[44px]"
            >
              Ирсэн хүсэлтүүд
            </TabsTrigger>
            <TabsTrigger
              value="req"
              className="data-[state=active]:bg-[#E5EFF8] data-[state=active]:text-slate-800 data-[state=active]:font-semibold text-slate-500 text-base px-8 py-2 rounded-[6px] transition-colors h-[44px]"
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
