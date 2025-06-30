"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarSearch, Users, Plus, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface Hobby {
  _id: string;
  title: string;
  image?: string;
  users?: string[]; // Array of user IDs
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    maxParticipants: "",
    description: "",
  });
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [selectedHobby, setSelectedHobby] = useState<string>("all");
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [response, setResponse] = useState<any>(null);
  useEffect(() => {
    // Get current user from localStorage
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const user = JSON.parse(currentUserString);
      setCurrentUser(user);
    }
    // Fetch hobbies
    axios.get("/api/hobby").then(res => {
      const data = res.data as { success: boolean; data: Hobby[] };
      if (data.success) setHobbies(data.data);
    });
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ success: boolean; data: Event[]; count: number }>("/api/event");
      if (response.data.success) {
        setEvents(response.data.data);
        // Update joined events based on current user's participation
        if (currentUser) {
          const userJoinedEvents = response.data.data
            .filter((event: Event) => event.participants.includes(currentUser.name))
            .map((event: Event) => event._id);
          setJoinedEvents(userJoinedEvents);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Эвентүүдийг ачаалж чадсангүй");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleCreateEvent = async () => {
    // Frontend validation
    if (!newEvent.name || !newEvent.eventType || !newEvent.eventDate || !newEvent.eventTime || !newEvent.eventLocation || !newEvent.maxParticipants || !newEvent.description) {
      toast.error("Бүх талбарыг бүрэн бөглөнө үү!");
      return;
    }
    if (isNaN(Number(newEvent.maxParticipants)) || Number(newEvent.maxParticipants) < 1) {
      toast.error("Хүний хязгаар зөв байх ёстой!");
      return;
    }
    try {
      // Get current user from localStorage
      const currentUserString = localStorage.getItem("currentUser");
      if (!currentUserString) {
        toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
        return;
      }
      const currentUser = JSON.parse(currentUserString);
      const eventData = {
        ...newEvent,
        maxParticipants: parseInt(newEvent.maxParticipants),
        eventDate: new Date(newEvent.eventDate).toISOString(),
        organizer: currentUser.name,
      };
      const response = await axios.post("/api/event", eventData);
      const responseData = response.data as { success: boolean; data: Event; message: string };
       // Find the selected hobby and get its users array
       const selectedHobbyObj = hobbies.find(hobby => hobby._id === newEvent.eventType);
       const toUsers = selectedHobbyObj?.users || [];
       const notificationResponse = await axios.post("/api/notification", {
        from: currentUser._id,
        to: toUsers,
        type: "Event",
        typeId: response.data.data._id
      });
      const notification = notificationResponse.data as {success: boolean; data: Request; message: string}
      if (responseData.success) {
        setShowSuccessBanner(true);
        setTimeout(() => setShowSuccessBanner(false), 4000);
        setIsCreateEventOpen(false);
        setIsSuccessOpen(true);
        setNewEvent({
          name: "",
          eventType: "",
          eventDate: "",
          eventTime: "",
          eventLocation: "",
          maxParticipants: "",
          description: "",
        });
        fetchEvents();

      } else {
        toast.error(responseData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || error.message || "Эвент үүсгэхэд алдаа гарлаа");
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    if (!currentUser) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }
    const isCurrentlyJoined = joinedEvents.includes(eventId);
    const action = isCurrentlyJoined ? "leave" : "join";
    try {
      const response = await axios.patch(`/api/event/${eventId}`, {
        action,
        userName: currentUser.name,
      });
      const responseData = response.data as { success: boolean; data: Event; message: string };
      if (responseData.success) {
        setJoinedEvents((prev) => {
          if (isCurrentlyJoined) {
            return prev.filter((id) => id !== eventId);
          } else {
            return [...prev, eventId];
          }
        });
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === eventId ? responseData.data : event))
        );
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Error joining/leaving event:", error);
      toast.error(error.response?.data?.message || "Эвентэд нэгдэхэд алдаа гарлаа");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", { month: "2-digit", day: "2-digit" });
  };

  // Filter events by selected hobby
  const filteredEvents = selectedHobby === "all"
    ? events
    : events.filter(e => e.eventType && e.eventType._id === selectedHobby);

  const handleEditEvent = async () => {
    if (!editEvent) return;
    try {
      const response = await axios.put(`/api/event/${editEvent._id}`, {
        ...editEvent,
        eventType: typeof editEvent.eventType === 'object' ? editEvent.eventType._id : editEvent.eventType,
        maxParticipants: Number(editEvent.maxParticipants),
        eventDate: new Date(editEvent.eventDate).toISOString(),
      });
      const responseData = response.data as { success: boolean; data: Event; message: string };
      if (responseData.success) {
        toast.success("Эвент амжилттай засагдлаа!");
        setIsEditOpen(false);
        setEditEvent(null);
        fetchEvents();
      } else {
        toast.error(responseData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Error editing event:", error);
      toast.error(error.response?.data?.message || "Эвент засахад алдаа гарлаа");
    }
  };
  // console.log("test")
  console.log(hobbies)
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {showSuccessBanner && (
        <div className="fixed top-8 right-8 z-50 bg-white border border-blue-100 rounded-xl shadow-lg px-8 py-4 flex flex-col items-start animate-fade-in-up" style={{ minWidth: 340 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400 text-2xl">✨</span>
            <span className="font-bold text-lg text-gray-800 underline">Таны эвент амжилттай үүсгэгдлээ</span>
            <span className="text-yellow-400 text-2xl">✨</span>
          </div>
          <div className="text-gray-600 text-base">Та хүсэлт хэсгээс хариугаа хянах боломжтой, баярлалаа</div>
        </div>
      )}
      <div className="w-full px-6 py-6">
        {/* Hobby filter dropdown */}
        <div className="flex justify-start mb-6">
          <Select value={selectedHobby} onValueChange={setSelectedHobby}>
            <SelectTrigger className="w-60 bg-white border-gray-200 shadow-sm">
              <SelectValue placeholder="Бүх эвент" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх эвент</SelectItem>
              {hobbies.map(hobby => (
                <SelectItem value={hobby._id} key={hobby._id}>{hobby.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Олуулаа илүү хөгжилтэй
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <CalendarSearch className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {loading ? "..." : filteredEvents.filter((e) => e.participants.length < e.maxParticipants).length}
                  </p>
                  <p className="text-gray-600">Хүлээгдэж буй эвентүүд</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {loading ? "..." : filteredEvents.reduce((total, event) => total + event.participants.length, 0)}
                  </p>
                  <p className="text-gray-600">Идэвхтэй байгаа ажилчид</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mb-8">
          
        </div>
        <div>
          {loading ? (
            <div className="text-center py-8">
              <p>Эвентүүд ачаалж байна...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Event Card - always first */}
              <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                <DialogTrigger asChild>
                  <Card
                    className="flex items-center justify-center h-56 min-h-[220px] bg-blue-50 border-2 border-dashed border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors shadow-none"
                    style={{ minHeight: 220 }}
                  >
                    <Plus className="w-16 h-16 text-blue-400" />
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Шинэ эвент үүсгэх</DialogTitle>
                    <p className="text-sm text-gray-600">
                      Хамт олонтойгоо цагийг илүү зугаатай өнгөрөөх боломжийг бүтээцгээе
                    </p>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="eventHobby">Хобби</Label>
                      <Select
                        value={newEvent.eventType}
                        onValueChange={val => setNewEvent({ ...newEvent, eventType: val })}
                      >
                        <SelectTrigger id="eventHobby" className="w-full bg-white border-gray-200">
                          <SelectValue placeholder="Хобби сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {hobbies.map(hobby => (
                            <SelectItem value={hobby._id} key={hobby._id}>{hobby.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="eventName">Эвентийн нэр</Label>
                      <Input
                        id="eventName"
                        placeholder="Энд бичих орууна уу ..."
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Өдөр</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={newEvent.eventDate}
                          onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Цаг</Label>
                        <Input
                          id="eventTime"
                          type="time"
                          value={newEvent.eventTime}
                          onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="eventLocation">Хаяг</Label>
                      <Input
                        id="eventLocation"
                        placeholder="Энд бичих орууна уу ..."
                        value={newEvent.eventLocation}
                        onChange={(e) => setNewEvent({ ...newEvent, eventLocation: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventLimit">Хүний хязгаар</Label>
                      <Input
                        id="eventLimit"
                        type="number"
                        placeholder="Энд бичих орууна уу ..."
                        value={newEvent.maxParticipants}
                        onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventDescription">Тайлбар</Label>
                      <Textarea
                        id="eventDescription"
                        placeholder="Асуух зүйл байвал > 99123489"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setIsCreateEventOpen(false)}>
                      Буцах
                    </Button>
                    <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={async () => {
                      if (!newEvent.eventType) {
                        toast.error("Хобби сонгоно уу!");
                        return;
                      }
                      await handleCreateEvent();
                    }}>
                      Эвент үүсгэх
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              {/* Event Cards */}
              {filteredEvents.map((event) => {
                const isJoined = joinedEvents.includes(event._id);
                const isFull = event.participants.length >= event.maxParticipants;
                const remainingSpots = event.maxParticipants - event.participants.length;
                const canEdit = currentUser && event.organizer === currentUser.name;
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
                              <h3 className="font-semibold text-gray-800">{event.name}</h3>
                              <p className="text-sm text-gray-500">{event.eventType.title}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              isFull
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {isFull ? "Дүүрсэн" : `${remainingSpots} хүн дутуу`}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(event.eventDate)}</span>
                            <span className="ml-4">🕐 {event.eventTime}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="ml-4">📍 {event.eventLocation}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>
                              {event.participants.length}/{event.maxParticipants} хүн бүртгүүлсэн байна
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {event.organizer === currentUser.name&& <Button size="sm" variant="outline" className="flex-1" disabled={!canEdit}
                            onClick={() => {
                              if (canEdit) {
                                setEditEvent(event);
                                setIsEditOpen(true);
                              }
                            }}>
                            Засах
                          </Button>
                          }
                          <Button
                            size="sm"
                            className={`flex-1 transition-colors ${
                              isJoined
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : isFull
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                            onClick={() => !isFull && handleJoinEvent(event._id)}
                            disabled={isFull && !isJoined}
                          >
                            {isJoined ? "Орсон" : isFull ? "Дүүрсэн" : "Эвентэд нэгдэх"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Edit Event Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Эвент засах</DialogTitle>
          </DialogHeader>
          {editEvent && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="editEventName">Эвентийн нэр</Label>
                <Input
                  id="editEventName"
                  value={editEvent.name}
                  onChange={e => setEditEvent({ ...editEvent, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editEventDate">Өдөр</Label>
                  <Input
                    id="editEventDate"
                    type="date"
                    value={editEvent.eventDate.slice(0, 10)}
                    onChange={e => setEditEvent({ ...editEvent, eventDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editEventTime">Цаг</Label>
                  <Input
                    id="editEventTime"
                    type="time"
                    value={editEvent.eventTime}
                    onChange={e => setEditEvent({ ...editEvent, eventTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="editEventLocation">Хаяг</Label>
                <Input
                  id="editEventLocation"
                  value={editEvent.eventLocation}
                  onChange={e => setEditEvent({ ...editEvent, eventLocation: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editEventLimit">Хүний хязгаар</Label>
                <Input
                  id="editEventLimit"
                  type="number"
                  value={editEvent.maxParticipants}
                  onChange={e => setEditEvent({ ...editEvent, maxParticipants: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="editEventDescription">Тайлбар</Label>
                <Textarea
                  id="editEventDescription"
                  value={editEvent.description}
                  onChange={e => setEditEvent({ ...editEvent, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsEditOpen(false)}>
              Буцах
            </Button>
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={handleEditEvent}>
              Хадгалах
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
