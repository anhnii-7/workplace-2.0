import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ReqBody } from "./components/Req";
import { ResBody } from "./components/Res";

export default function RequestPage() {
  return (
    <div className="w-full h-screen px-5">
      <div className="text-center p-4 mb-14">
        <h1 className="text-slate-800 text-3xl leading-8 font-medium">
          Танд ирсэн мэдэгдлүүд
        </h1>
      </div>
      <div className="flex items-center ">
        <Tabs defaultValue="res" className="w-full h-15 p-2">
          <TabsList className="w-full bg-slate-50 py-3 mb-8">
            <TabsTrigger
              value="res"
              className="data-[state=active]:bg-[#E5EFF8] data-[state=active]:text-slate-800 data-[state=active]:font-medium data-[state=active]:py-3 data-[state=active]:rounded-[8px_0px_0px_8px] rounded-[8px_0px_0px_8px] text-slate-400 text-sm py-3 font-medium "
            >
              Ирсэн хүсэлтүүд
            </TabsTrigger>
            <TabsTrigger
              value="req"
              className="data-[state=active]:bg-[#E5EFF8] data-[state=active]:text-slate-800 data-[state=active]:font-medium data-[state=active]:py-3 data-[state=active]:rounded-[0px_8px_8px_0px] rounded-[0px_8px_8px_0px] text-slate-400 text-sm py-3 font-medium"
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
