"use client";

import { BookOpenCheck, CalendarDays, Clock3, MapPin, Users } from "lucide-react";

export type Event = {
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
};

interface EventCardProps {
  event: Event;
  isJoined: boolean;
  onJoinLeave: (eventId: string) => void;
  showJoinButton?: boolean;
}

export function EventCard({ event, isJoined, onJoinLeave, showJoinButton = true }: EventCardProps) {
  const isFull = event.participants.length >= event.maxParticipants;
  const remainingSpots = event.maxParticipants - event.participants.length;

  return (
    <div className="relative bg-[#F6FAFF] rounded-2xl p-6 flex flex-col gap-4 shadow-none border border-transparent min-h-[220px] h-full">
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${isFull ? "bg-[#1A237E] text-white" : "bg-[#E3E8F7] text-[#1A237E]"}`}>
          {isFull ? "Дүүрсэн" : `${remainingSpots} хүн дутуу`}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-white w-12 h-12 flex items-center justify-center rounded-xl">
          <BookOpenCheck className="text-blue-900 w-7 h-7" />
        </div>
        <div>
          <h2 className="text-[20px] font-semibold text-slate-800 leading-6">{event.name}</h2>
          <p className="text-sm text-slate-600">{event.eventType.title}</p>
        </div>
      </div>
      <p className="text-slate-700 text-sm font-normal">{event.description}</p>
      <div className="flex flex-row flex-wrap gap-2 mt-2">
        <span className="flex items-center gap-1 bg-[#F3F6FB] rounded-lg px-2 py-1 text-xs text-slate-700"><CalendarDays className="w-4 h-4" /> {new Date(event.eventDate).toLocaleDateString()}</span>
        <span className="flex items-center gap-1 bg-[#F3F6FB] rounded-lg px-2 py-1 text-xs text-slate-700"><Clock3 className="w-4 h-4" /> {event.eventTime}</span>
        <span className="flex items-center gap-1 bg-[#F3F6FB] rounded-lg px-2 py-1 text-xs text-slate-700"><MapPin className="w-4 h-4" /> {event.eventLocation}</span>
        <span className="flex items-center gap-1 bg-[#F3F6FB] rounded-lg px-2 py-1 text-xs text-slate-700"><Users className="w-4 h-4" /> {event.participants.length}/{event.maxParticipants} хүн бүртгүүлсэн байна</span>
      </div>
      {showJoinButton && (
        <button
          className={`mt-4 w-full font-normal py-2 rounded-lg transition bg-blue-50 text-blue-700 hover:bg-blue-100 text-base`}
          disabled={isFull && !isJoined}
          onClick={() => onJoinLeave(event._id)}
        >
          {isJoined ? "Гарах" : isFull ? "Дүүрсэн" : "Эвентэд нэгдэх"}
        </button>
      )}
    </div>
  );
} 