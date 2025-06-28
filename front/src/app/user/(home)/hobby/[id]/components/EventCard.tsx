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
}

export const EventCard = ({ event, onEdit }: EventCardProps) => {
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
              {event.organizer}
            </p>
          </div>

          <div className="flex gap-2 items-center  px-4 py-2">
            <MapPin />
            <p className="text-slate-700 font-normal leading-5 text-sm ">
              {event.eventLocation}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center  px-4 py-2">
          <Users />
          <p className="text-slate-700 font-normal leading-5 text-sm ">
            {currentParticipants}/{event.maxParticipants} хүн бүртгүүлсэн байна
          </p>
        </div>
      </div>
      <Button 
        className={`w-full transition-colors ${
          isFull 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-400 text-white hover:bg-blue-500 cursor-pointer"
        }`}
        disabled={isFull}
      >
        {isFull ? "Дүүрсэн" : "Эвентэд нэгдэх"}
      </Button>
      {onEdit && (
        <Button 
          variant="outline"
          className="w-full mt-2 border-blue-400 text-blue-700 hover:bg-blue-50"
          onClick={() => onEdit(event)}
        >
          Засах
        </Button>
      )}
    </div>
  );
};
