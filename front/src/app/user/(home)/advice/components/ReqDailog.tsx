"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, User } from "lucide-react";

export const ReqDailogpage = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Хүлээн авагчийн мэдээлэл</DialogTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card>
                {" "}
                <Avatar className="w-16 h-16">
                  <AvatarImage src={"AG"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge className="text-xs font-medium bg-[#FFF8E8] py-1 text-gray-900">
                  Ботго
                </Badge>
              </Card>
              <Card>
                {" "}
                <div className="flex items-center gap-3">
                  <User /> <p className="text-sm text-stone-500">Дизайнер</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin />{" "}
                  <p className="text-sm text-stone-500">Хөгжүүлэлтийн хэлтэс</p>
                </div>
              </Card>
              <Card>
                <p>Ажиллаж буй хугацаа :</p>
                <div className="flex items-center gap-3">
                  <Calendar />
                  <p> 3 сар</p>
                </div>
              </Card>
            </div>

          
          </DialogHeader>
          <div className="flex flex-col gap-4">
          <DialogTitle>
              Ямар шалтгааны улмаас уулзах хүсэлт илгээж байгаа вэ ?
            </DialogTitle>
            <div>
            <Textarea />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
