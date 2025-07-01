"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarSearch, Users, Plus, Calendar, User, Clock, Pin, Map, MapIcon, BookOpenCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventCard } from "../hobby/[id]/components/EventCard";

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
  participantUsers: {
    _id: string;
    name: string;
  }[];
}

interface Hobby {
  _id: string;
  title: string;
  image?: string;
  users?: string[]; // Array of user IDs
}

export default function test() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

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
        organizer: currentUser._id,
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
      const notification = notificationResponse.data as { success: boolean; data: Request; message: string }
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
        userName: currentUser._id,
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
  console.log(events)
  return (
    <div className="min-h-screen w-full">
      {showSuccessBanner && (
        <div className="fixed w-[375px] h-[100px] top-8 right-8 z-50 bg-white border bg-amber-100 rounded-xl shadow-lg px-8 py-4 flex flex-col items-start animate-fade-in-up" style={{ minWidth: 340 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400 w-[23px] h-[28px]">✨</span>
            <span className="font-medium text-lg text-slate-800">Таны эвент амжилттай үүсгэгдлээ</span>
            <span className="text-yellow-400 w-[23px] h-[28px]">✨</span>
          </div>
          <div className="text-gray-600 text-base">Та хүсэлт хэсгээс хариугаа хянах боломжтой, баярлалаа</div>
        </div>
      )}
      <p className="text-slate-800 text-2xl font-medium text-center py-4 px-6">
        Олуулаа илүү хөгжилтэй
      </p>
      <div className="w-full">
        {/* Hobby filter dropdown */}
        <div className="grid grid-cols-2 gap-5 my-10">
          <Select value={selectedHobby} onValueChange={setSelectedHobby}>
            <SelectTrigger className="w-full bg-white border-amber-200 px-4 py-[10px]">
              <SelectValue placeholder="Бүх эвент" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm text-slate-600">Бүх эвент</SelectItem>
              {hobbies.map(hobby => (
                <SelectItem value={hobby._id} key={hobby._id} className=" text-sm text-slate-600">{hobby.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div></div>
        </div>
        <div className="flex flex-cols-2 gap-5 mb-5">
          <Card className="bg-orange-50 border border-orange-200 w-full p-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-5 rounded-lg">
                  <CalendarSearch className="w-6 h-6 text-yellow-900" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">
                    {loading ? "..." : filteredEvents.filter((e) => e.participants.length < e.maxParticipants).length}
                  </p>
                  <p className="text-base text-gray-600">Хүлээгдэж буй эвентүүд</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border border-green-200 w-full p-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-5 rounded-lg">
                  <Users className="w-6 h-6 text-green-900" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">
                    {loading ? "..." : filteredEvents.reduce((total, event) => total + event.participants.length, 0)}
                  </p>
                  <p className="text-base text-gray-600">Идэвхтэй байгаа ажилчид</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          {loading ? (
            <div className="text-center py-8">
              <p>Эвентүүд ачаалж байна...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {/* Add Event Card - always first */}
              <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                <DialogTrigger asChild>
                  <Card
                    className="flex items-center justify-center h-full bg-amber-50 border-none cursor-pointer"
                    style={{ minHeight: 220 }}
                  >
                    <Plus className="w-15 h-15 text-slate-400" />
                  </Card>
                </DialogTrigger>
                <DialogContent className="w-[744px] bg-background box-border h-fit px-10 py-15 top-[50%]">
                  <DialogHeader className="gap-1">
                    <DialogTitle className="text-2xl text-slate-700 font-medium">Шинэ эвент үүсгэх</DialogTitle>
                    <p className="text-lg  text-slate-700 font-normal">
                      Хамт олонтойгоо цагийг илүү зугаатай өнгөрөөх боломжийг бүтээцгээе
                    </p>
                  </DialogHeader>
                  <div className="flex flex-col gap-5">
                    <div>
                      <Label htmlFor="eventName" className="text-lg font-medium text-slate-700 mb-3">Эвэнтийн нэр</Label>
                      <Input
                        id="eventName"
                        placeholder="Энд бичиж оруулна уу ..."
                        className="text-slate-700 border-amber-200 text-sm font-normal bg-white"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventHobby" className="text-lg font-medium text-slate-700 mb-3">Төрөл</Label>
                      <Select
                        value={newEvent.eventType}
                        onValueChange={val => setNewEvent({ ...newEvent, eventType: val })}
                      >
                        <SelectTrigger id="eventHobby" className="w-full bg-white border-amber-200">
                          <SelectValue placeholder="Эвэнт үүсгэх төрлөө сонгоно уу..." className="text-slate-700 text-sm font-normal" />
                        </SelectTrigger>
                        <SelectContent>
                          {hobbies.map(hobby => (
                            <SelectItem value={hobby._id} key={hobby._id}>{hobby.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate" className="text-lg font-medium text-slate-700 mb-3">Өдөр</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          className="text-slate-700 border-amber-200 text-sm font-normal bg-white"
                          value={newEvent.eventDate}
                          onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime" className="text-lg font-medium text-slate-700 mb-3">Цаг</Label>
                        <Input
                          id="eventTime"
                          type="time"
                          className="text-slate-700 border-amber-200 text-sm font-normal bg-white"
                          value={newEvent.eventTime}
                          onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="eventLocation" className="text-lg font-medium text-slate-700 mb-3">Хаяг</Label>
                      <Input
                        id="eventLocation"
                        placeholder="Энд бичиж оруулна уу ..."
                        className="text-slate-700 border-amber-200 text-sm font-normal bg-white"
                        value={newEvent.eventLocation}
                        onChange={(e) => setNewEvent({ ...newEvent, eventLocation: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventLimit" className="text-lg font-medium text-slate-700 mb-3">Хүний хязгаар</Label>
                      <Input
                        id="eventLimit"
                        type="number"
                        className="text-slate-700 border-amber-200 text-sm font-normal bg-white"
                        placeholder="Энд бичиж оруулна уу ..."
                        value={newEvent.maxParticipants}
                        onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventDescription" className="text-lg font-medium text-slate-700 mb-3">Тайлбар</Label>
                      <Input
                        id="eventDescription"
                        type="text"
                        className="text-slate-700 border-amber-200 text-sm font-normal bg-white"
                        placeholder="Асуух зүйл байвал > 99123489"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      const formattedDate = tomorrow.toISOString().split('T')[0];

                      setNewEvent({
                        name: "Сагсан бөмбөгийн тэмцээн",
                        eventType: hobbies[0]?._id || "",
                        eventDate: formattedDate,
                        eventTime: "14:00",
                        eventLocation: "MCS Arena, 3-р давхар",
                        maxParticipants: "20",
                        description: "Сагсан бөмбөгийн тэмцээн - Асуух зүйл байвал > 99123489",
                      });
                    }}
                    disabled={isLoading}
                  >
                    Жишээ өгөгдөл
                  </Button>
                  <div className="flex gap-3 ">
                    <Button variant="outline" className="flex-1 border border-amber-200 text-amber-200 hover:bg-background" onClick={() => setIsCreateEventOpen(false)}>
                      Буцах
                    </Button>
                    <Button className="flex-1 bg-amber-200 hover:bg-amber-200" onClick={async () => {
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
                const currentParticipants = event.participants.length;
                return (
                  <Card key={event._id} className="bg-amber-50 border-none rounded-xl p-0">
                    <CardContent className="p-6">
                      <div className="space-y-5 ">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-5 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <Calendar color="#78350F" className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <h3 className="font-semibold text-slate-700 text-2xl">{event.name}</h3>
                              <p className="text-base text-gray-600">{event.eventType.title}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              isFull
                                ? "bg-amber-900 text-background py-1 px-3 rounded-full"
                                : "bg-amber-900 text-background py-1 px-3 rounded-full"
                            }
                          >
                            {isFull ? "Хүний тоо бүрдсэн" : `${remainingSpots} хүн дутуу`}
                          </Badge>
                        </div>
                        <p className="text-base text-slate-600">{event.description}</p>
                        <div>
                          <div className="grid grid-cols-2 gap-5 mb-3">
                            <div className="flex items-center text-sm text-slate-900 border-none rounded-lg bg-white px-4 py-2 w-full gap-2">
                              <Calendar className="w-4 h-4" />
                              <p>{formatDate(event.eventDate)}</p>
                            </div>
                            <div className="flex items-center text-sm text-slate-900 border-none rounded-lg bg-white px-4 py-2 w-full gap-2">
                              <Clock className="w-4 h-4" />
                              <p>{event.eventTime}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center text-sm text-slate-900 border-none rounded-lg bg-white px-4 py-2 w-full gap-2">
                              <MapIcon className="w-4 h-4" />
                              <p>{event.eventLocation}</p>
                            </div>
                            {
                              event.participants.length == event.maxParticipants && event.organizer == currentUser._id ? (
                                <div className="flex items-center text-sm text-slate-900 border-none rounded-lg bg-white px-4 py-2 w-full gap-2">
                                  <Users className="w-4 h-4" />
                                  <p>
                                    {
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
                                      <DialogContent className="w-[510px] h-fit px-10 pt-[31px] pb-[74px] bg-background">
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
                                          {event.participantUsers.map((user: any) => (
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
                                    }
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center text-sm text-slate-900 border-none rounded-lg bg-white px-4 py-2 w-full gap-2">
                                  <Users className="w-4 h-4" />
                                  <p>
                                    {event.participants.length}/{event.maxParticipants} хүн бүртгүүлсэн байна
                                  </p>
                                </div>
                              )
                            }
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {event.organizer === currentUser.name && <Button variant="outline" className="flex-1 py-[10px] text-sm text-blue-500 hover:bg-white hover:text-blue-400 rounded-md border-blue-400 font-medium" disabled={!canEdit}
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
                            className={`flex-1 transition-colors ${isJoined
                              ? "bg-green-500 text-white py-[10px] text-sm hover:bg-none hover:bg-green-500  font-medium"
                              : isFull
                                ? "bg-background text-brand-300 py-[10px] text-sm hover:bg-gray-400 font-medium"
                                : "bg-amber-200 text-amber-900 py-[10px] text-sm hover:bg-blue-200 font-medium"
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
        <DialogContent className="sm:max-w-[500px] ">
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
    </div >
  );
}
