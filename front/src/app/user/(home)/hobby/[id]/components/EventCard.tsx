import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck,
  CalendarDays,
  Clock3,
  MapPin,
  User,
  Users,
} from "lucide-react";

export const EventCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="bg-blue-50 w-[64px] h-[64px] flex justify-center items-center rounded-xl">
            <BookOpenCheck className="text-blue-900" />
          </div>
          <div>
            <p className="text-2xl font-semibold leading-8">Book Club </p>
            <p className="text-base font-normal leading-6">Ном унших</p>
          </div>
        </div>
        <div>
          <Badge className="bg-indigo-50 text-blue-900 text-xs font-medium leading-4">
          2 хүн дутуу
          </Badge>
        </div>
      </div>
      <p className="text-slate-600 text-base font-normal leading-6 "> 
        Сүүлд уншсан номоо ярьцгаая
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 ">
          <div className="flex gap-2 items-center px-4 py-2">
            <CalendarDays />{" "}
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              07-02
            </p>
          </div>
          <div className="flex gap-2 items-center  px-4 py-2">
            <Clock3 />
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              12 : 30
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-2 items-center  px-4 py-2">
            <User />{" "}
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              Г. Хулан
            </p>
          </div>

          <div className="flex gap-2 items-center  px-4 py-2">
            <MapPin />
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              Lobby lounge
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center  px-4 py-2">
          <Users />
          <p className="text-slate-700 font-normal leading-5 text-sm ">
            3/5 хүн бүртгүүлсэн байна
          </p>
        </div>
      </div>
      <Button className=" w-full bg-blue-400 text-white hover:bg-blue-500 cursor-pointer">Эвентэд нэгдэх</Button>
    </div>
  );
};
