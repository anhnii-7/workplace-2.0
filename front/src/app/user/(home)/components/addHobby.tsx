import {
Dialog,
DialogContent,
DialogFooter,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Hobby } from "../hobby/page";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function DialogDemo({ hobbies }: { hobbies: Hobby[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[202px] h-[288px] rounded-xl bg-slate-50 flex justify-center items-center">
          <Plus className="text-slate-400" size={64} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-[1084px] w-fit flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-slate-700 text-2xl font-semibold leading-8">Өөрийн дуртай хэдэн ч төрлийн сонирхлыг сонгох боломжтой</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-5 w-full">
          {hobbies && hobbies.length > 0 ? (
            hobbies.map((hobby) => {
              return (
                <Card className="p-0 w-[202px] h-[290px] flex flex-col gap-3 box-border" key={hobby._id}>
                  <div className=" w-full rounded-3xl h-[224px] bg-white overflow-hidden relative">
                    <Image
                      src={hobby.image}
                      fill={true}
                      alt="sport"
                      className="place-self-center"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="bg-slate-50 text-center rounded-b-2xl text-lg py-3 text-slate-800">
                    {hobby.title}
                  </p>
                </Card>
              );
            })
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">Хоббинууд ачаалж байна...</p>
            </div>
          )}
        </div>
        <DialogFooter className="w-full">
          <button className="w-full mt-6 px-4 rounded-md cursor-pointer py-3 bg-blue-400 text-white text-sm font-medium leading-5 hover:bg-blue-500">
            Нэмэх
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 500 zaaj bgaa