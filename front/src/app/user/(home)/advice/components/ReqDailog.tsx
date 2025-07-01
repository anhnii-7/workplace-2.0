"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  CalendarDays,
  User,
  User2Icon,
  MapPinIcon,
  Plus,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  lastName: string;
  department: string;
  role: string;
  hobby: string;
  experience: string;
  hobbyInfo: {
    _id: string;
    title: string;
  }[];
  departmentInfo: {
    _id: string;
    title: string;
    jobTitle?: string;
    jobTitleInfo: {
      _id: string;
      title: string;
    };
  };
  availableSchedules?: string[];
}

interface ReqDailogpageProps {
  user: User;
  selectedMentor: User | null;
  setSelectedMentor: (user: User | null) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  formData: {
    message: string;
    selectedDate: string;
  };
  setFormData: (data: { message: string; selectedDate: string }) => void;
  handleScheduleSelect: (schedule: string) => void;
  createRequest: (
    toUserId: string,
    message: string,
    selectedDate: string
  ) => Promise<any>;
  formatDate: (dateString: string) => string;
  extractDuration: (text: string) => string;
}

export function ReqDailogpage({
  user,
  selectedMentor,
  setSelectedMentor,
  isDialogOpen,
  setIsDialogOpen,
  formData,
  setFormData,
  handleScheduleSelect,
  createRequest,
  formatDate,
  extractDuration,
}: ReqDailogpageProps) {
  const handlePresetMessage = (message: string) => {
    setFormData({
      ...formData,
      message: message,
    });
  };

  console.log(user)

  const handleScheduleButtonClick = (schedule: string) => {
    setSelectedMentor(user);
    handleScheduleSelect(schedule);
    setIsDialogOpen(true);
  };
  const formatMonthDay = (dateString: string) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };
  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="flex gap-2">
            {user.availableSchedules?.map((schedule) => (
              <button
                key={schedule}
                className={`border-1 bg-amber-200 text-amber-900 rounded-md py-2 px-4  w-full hover:bg-amber-300 cursor-pointer ${formData.selectedDate === schedule ? 'bg-blue-100 border-blue-600' : ''
                  }`}
                onClick={() => handleScheduleButtonClick(schedule)}
              >
                {formatMonthDay(schedule)}
              </button>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl bg-blue-50 ">
          <div className="h-[172px]">
            <DialogTitle className="text-2xl text-slate-800 font-semibold">
              Хүлээн авагчийн мэдээлэл
            </DialogTitle>
            <div className="grid grid-cols-3 gap-4 mt-10">
              <Card className=" relative p-4 border-2 border-amber-200 ">
                <div className="flex flex-row gap-4 items-center">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={`/avatars/${selectedMentor?._id}.jpg`} />
                    <AvatarFallback>
                      {selectedMentor?.name.charAt(0)}
                      {selectedMentor?.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="font-semibold text-lg leading-7 text-slate-800">
                    {selectedMentor?.lastName.slice(0, 1)}.
                    {selectedMentor?.name}
                  </h3>
                </div>
                <div className=" py-1 px-3 bg-indigo-50 text-blue-900 text-xs font-medium leading-4 rounded-full absolute top-4 right-1 ">
                  {" "}
                  {selectedMentor
                    ? extractDuration(selectedMentor.experience)
                    : "N/A"}
                </div>
              </Card>
              <Card className="p-4 border-2 border-amber-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User2Icon className="w-4 h-4" />
                    <span>
                      {selectedMentor?.departmentInfo?.jobTitleInfo?.title ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border-2 border-amber-200">
                    <MapPinIcon className="w-4 h-4" />
                    <span>
                      {selectedMentor?.departmentInfo?.title || "N/A"}
                    </span>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-2 border-amber-200">
                <div className="space-y-3">
                  <h4 className="font-medium">Уулзах өдөр :</h4>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>{formData.selectedDate}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <form
            className="h-[207px]"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedMentor) return;
              try {
                await createRequest(
                  selectedMentor._id,
                  formData.message,
                  formData.selectedDate
                );
              } catch (error) {

              }
            }}
          >
            <div className="space-y-4">
              <div>
                <Label className="text-2xl font-semibold leadinf-8 text-slate-800 pb-4">
                  Ямар шалтгааны улмаас уулзах хүсэлт илгээж байгаа вэ ?
                </Label>
                <div className="flex gap-2 mt-2">
                  {selectedMentor?.availableSchedules?.map((schedule) => (
                    <Button
                      className="bg-amber-200 hover:bg-amber-300 text-amber-900"
                      key={schedule}
                      type="button"
                      variant={
                        formData.selectedDate === schedule
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleScheduleSelect(schedule)}
                    >
                      {formatDate(schedule)}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-white rounded-md px-3 py-2 gap-3 flex flex-col">
                  <div
                    className="bg-[#FAFAFA] flex gap-3 px-2 py-[6px] cursor-pointer hover:bg-slate-100"
                    onClick={() =>
                      handlePresetMessage(
                        "Өдрийн мэнд, тантай уулзаж зөвлөгөө авах хүсэлтэй байна."
                      )
                    }
                  >
                    <Plus />
                    <p className="text-slate-500 text-sm font-normal leading-5">
                      Өдрийн мэнд, тантай уулзаж зөвлөгөө авах хүсэлтэй байна.
                    </p>
                  </div>
                  <div
                    className="bg-[#FAFAFA] flex gap-3 px-2 py-[6px] cursor-pointer hover:bg-slate-100"
                    onClick={() =>
                      handlePresetMessage(
                        "Өдрийн мэнд, танаас суралцах хүсэлтэй байна аа"
                      )
                    }
                  >
                    <Plus />
                    <p className="text-slate-500 text-sm font-normal leading-5">
                      Өдрийн мэнд, танаас суралцах хүсэлтэй байна аа
                    </p>
                  </div>
                  <div className="bg-[#FAFAFA] flex gap-3 px-2 py-[6px]">
                    <Plus />
                    <input
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="text-slate-800 text-sm font-normal leading-5 w-full bg-transparent border-none outline-none"
                      placeholder="Энд дарж бичнэ үү ..."
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="bg-amber-200 hover:bg-amber-300 text-amber-900"
                disabled={!formData.selectedDate || !formData.message.trim()}
              >
                Хүсэлт илгээх
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}