"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface EventListProps {
  events: Event[];
  joinedEvents: string[];
  loading: boolean;
  onJoin: (eventId: string) => void;
  onEdit: (event: Event) => void;
  formatDate: (dateString: string) => string;
  currentUser?: any;
}

export function EventList({ events, joinedEvents, loading, onJoin, onEdit, formatDate, currentUser }: EventListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Эвентүүд ачаалж байна...</p>
      </div>
    );
  }
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">Эвент олдсонгүй</div>
    );
  }
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {events.map((event) => {
        const isJoined = joinedEvents.includes(event._id);
        const isFull = event.participants.length >= event.maxParticipants;
        const remainingSpots = event.maxParticipants - event.participants.length;
        const isOrganizer = currentUser && currentUser.name === event.organizer;
        return (
          <Card key={event._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
                      <p className="text-gray-500 text-sm">{event.eventType.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={isFull ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-900"}>
                      {isFull ? "Дүүрсэн" : `${remainingSpots} хүн дутуу`}
                    </Badge>
                    {isOrganizer && (
                      <Button size="icon" variant="ghost" onClick={() => onEdit(event)} title="Засах">
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-base">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                  <span className="flex items-center gap-1">
                    📅 {formatDate(event.eventDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    🕒 {event.eventTime}
                  </span>
                  <span className="flex items-center gap-1">
                    📍 {event.eventLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    👥 {event.participants.length}/{event.maxParticipants} хүн бүртгүүлсэн байна
                  </span>
                </div>
                <Button
                  className={`w-full font-semibold py-2 rounded-lg transition ${isJoined ? "bg-green-500 text-white" : isFull ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                  disabled={isFull && !isJoined}
                  onClick={() => onJoin(event._id)}
                >
                  {isJoined ? "Гарах" : isFull ? "Дүүрсэн" : "Эвентэд нэгдэх"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 