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
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  _id: string;
  name: string;
  description: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  maxParticipants: number;
  participants: string[];
  organizer: string;
  eventType: {
    _id: string;
    title: string;
    image: string;
  };
}

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onEventUpdated?: () => void;
}

export const EventCard = ({ event, onEdit, onEventUpdated }: EventCardProps) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participantUsers, setParticipantUsers] = useState<any[]>([]);

  useEffect(() => {
    // Get current user from localStorage
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const user = JSON.parse(currentUserString);
      setCurrentUser(user);
      setIsJoined(event.participants.includes(user.name));
    }
  }, [event.participants]);

  useEffect(() => {
    if (showParticipants && event.participants.length > 0) {
      // Fetch user info for all participants
      axios.post('/api/user/by-ids', { ids: event.participants })
        .then(res => setParticipantUsers(res.data.data))
        .catch(() => setParticipantUsers([]));
    }
  }, [showParticipants, event.participants]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', { month: '2-digit', day: '2-digit' });
  };

  const currentParticipants = event.participants.length;
  const isFull = currentParticipants >= event.maxParticipants;
  const remainingSpots = event.maxParticipants - currentParticipants;

  const getStatusText = () => {
    if (isFull) return "Дүүрсэн";
    return `${remainingSpots} хүн дутуу`;
  };

  const getStatusColor = () => {
    if (isFull) return "bg-red-50 text-red-900";
    return "bg-indigo-50 text-blue-900";
  };

  const handleJoinLeave = async () => {
    if (!currentUser) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }

    setIsLoading(true);
    const action = isJoined ? "leave" : "join";

    try {
      const response = await axios.patch(`/api/event/${event._id}`, {
        action,
        userName: currentUser._id
      });

      const responseData = response.data as { success: boolean; data: Event; message: string };

      if (responseData.success) {
        setIsJoined(!isJoined);
        toast.success(responseData.message);
        onEventUpdated?.(); // Refresh parent component
      } else {
        toast.error(responseData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Error joining/leaving event:", error);
      toast.error(error.response?.data?.message || "Эвентэд нэгдэхэд алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="bg-blue-50 w-[64px] h-[64px] flex justify-center items-center rounded-xl">
            <BookOpenCheck className="text-blue-900" />
          </div>
          <div>
            <p className="text-2xl font-semibold leading-8">{event.name}</p>
            <p className="text-base font-normal leading-6">{event.eventType.title}</p>
          </div>
        </div>
        <div>
          <Badge className={`${getStatusColor()} text-xs font-medium leading-4`}>
            {getStatusText()}
          </Badge>
        </div>
      </div>
      <p className="text-slate-600 text-base font-normal leading-6"> 
        {event.description}
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 ">
          <div className="flex gap-2 items-center px-4 py-2">
            <CalendarDays />{" "}
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              {formatDate(event.eventDate)}
            </p>
          </div>
          <div className="flex gap-2 items-center  px-4 py-2">
            <Clock3 />
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              {event.eventTime}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-2 items-center  px-4 py-2">
            <User />{" "}
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              {event.eventLocation}
            </p>
          </div>

          {/* Show the button only if the event is full */}
          {currentParticipants === event.maxParticipants && (
            <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
              <DialogTrigger asChild>
                <Button
                  className="w-full mt-2 bg-[#FFE9A0] text-[#B08500] border border-[#FFD36A] hover:bg-[#FFD36A] font-semibold rounded-lg"
                  variant="outline"
                  onClick={() => setShowParticipants(true)}
                >
                  Бүртгүүлсэн ажилчдыг харах
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl w-full bg-[#FFF9E6]">
                <DialogTitle className="sr-only">Бүртгүүлсэн ажилчид</DialogTitle>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#FFF6D1] p-4 rounded-xl">
                    <BookOpenCheck className="text-yellow-700 w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{event.name}</h2>
                    <p className="text-lg text-slate-600">Эвентэд нэгдсэн хүмүүс</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {participantUsers.map(user => (
                    <div key={user._id} className="flex items-center border border-yellow-200 rounded-lg p-3 bg-white gap-4">
                      <img src={user.image || '/default-avatar.png'} alt={user.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-slate-800">{user.lastName} {user.name}</div>
                        <div className="text-slate-500">{user.departmentInfo?.jobTitleInfo?.title || ''}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <Button 
        className={`w-full transition-colors ${
          isJoined 
            ? "bg-green-500 hover:bg-green-600 text-white" 
            : isFull 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-400 text-white hover:bg-blue-500 cursor-pointer"
        }`}
        disabled={isFull && !isJoined || isLoading}
        onClick={handleJoinLeave}
      >
        {isLoading ? "Уучлаарай..." : isJoined ? "Гарах" : isFull ? "Дүүрсэн" : "Эвентэд нэгдэх"}
      </Button>
      {onEdit && (
        <Button 
          variant="outline"
          className="w-full mt-2 border-blue-400 text-blue-700 hover:bg-blue-50 opacity-50 cursor-not-allowed"
          onClick={() => {}}
          disabled
        >
          Засах
        </Button>
      )}
    </div>
  );
};
