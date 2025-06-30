"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarSearch, Users, Plus,Calendar, User } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { toast } from "sonner"

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

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const [events, setEvents] = useState<Event[]>([])
  const [joinedEvents, setJoinedEvents] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hobbyId, setHobbyId] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    name: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    maxParticipants: "",
    description: "",
  })

  useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      setHobbyId(id);
      setNewEvent(prev => ({ ...prev, eventType: id }));
    };
    getParams();
  }, [params]);

  useEffect(() => {
    // Get current user from localStorage
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const user = JSON.parse(currentUserString);
      setCurrentUser(user);
    }
  }, []);

  const fetchEvents = async () => {
    if (!hobbyId) return;
    
    try {
      setLoading(true)
      const response = await axios.get<{ success: boolean; data: Event[]; count: number }>('/api/event')
      
      if (response.data.success) {
        // Filter events for this specific hobby
        const hobbyEvents = response.data.data.filter((event: Event) => 
          event.eventType._id === hobbyId
        )
        setEvents(hobbyEvents)
        
        // Update joined events based on current user's participation
        if (currentUser) {
          const userJoinedEvents = hobbyEvents
            .filter((event: Event) => event.participants.includes(currentUser.name))
            .map((event: Event) => event._id);
          setJoinedEvents(userJoinedEvents);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error)
      toast.error("Эвентүүдийг ачаалж чадсангүй")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hobbyId) {
      fetchEvents()
    }
  }, [hobbyId, currentUser])

  const handleCreateEvent = async () => {
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
        organizer: currentUser.name, // Add the current user's name as organizer
      }

      const response = await axios.post('/api/event', eventData)
      const responseData = response.data as { success: boolean; data: Event; message: string };
      
      if (responseData.success) {
        toast.success("Эвент амжилттай үүсгэгдлээ!")
        setIsCreateEventOpen(false)
        setIsSuccessOpen(true)
        
        // Reset form
        setNewEvent({
          name: "",
          eventType: hobbyId,
          eventDate: "",
          eventTime: "",
          eventLocation: "",
          maxParticipants: "",
          description: "",
        })
        
        // Refresh events
        fetchEvents()
      } else {
        toast.error(responseData.message || "Алдаа гарлаа")
      }
    } catch (error: any) {
      console.error("Error creating event:", error)
      toast.error(error.response?.data?.message || "Эвент үүсгэхэд алдаа гарлаа")
    }
  }

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
        userName: currentUser.name
      });

      const responseData = response.data as { success: boolean; data: Event; message: string };

      if (responseData.success) {
        // Update local state
    setJoinedEvents((prev) => {
          if (isCurrentlyJoined) {
            return prev.filter((id) => id !== eventId);
          } else {
            return [...prev, eventId];
          }
        });

        // Update events list with the updated event
        setEvents((prevEvents) => 
          prevEvents.map((event) => 
            event._id === eventId ? responseData.data : event
          )
        );

        toast.success(responseData.message);
      } else {
        toast.error(responseData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Error joining/leaving event:", error);
      toast.error(error.response?.data?.message || "Эвентэд нэгдэхэд алдаа гарлаа");
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', { month: '2-digit', day: '2-digit' });
  };
  console.log(events)
  console.log("test")
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-6 py-6">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
        </h1>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-blue-50 border-blue-200">
              <SelectValue placeholder="Сагсан бөмбөг" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="esports">Э-спорт</SelectItem>
              <SelectItem value="basketball">Сагсан бөмбөг</SelectItem>
              <SelectItem value="astrology">Астрологи</SelectItem>
              <SelectItem value="books">Ном</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Эвент үүсгэх
              </Button>
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
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={handleCreateEvent}>
                  Эвент үүсгэх
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Таны эвент амжилттай үүсгэгдлээ, баярлалаа</h3>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <CalendarSearch className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">
                      {loading ? "..." : events.filter((e) => e.participants.length < e.maxParticipants).length}
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
                      {loading ? "..." : events.reduce((total, event) => total + event.participants.length, 0)}
                    </p>
                    <p className="text-gray-600">Нийт оролцогчид</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          {loading ? (
            <div className="text-center py-8">
              <p>Эвентүүд ачаалж байна...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => {
                const isJoined = joinedEvents.includes(event._id)
                const isFull = event.participants.length >= event.maxParticipants
                const remainingSpots = event.maxParticipants - event.participants.length
                
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
                            <User className="w-4 h-4" />
                            <span>{event.organizer}</span>
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
                          <Button size="sm" variant="outline" className="flex-1">
                            Засах
                          </Button>
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
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Энэ хоббид одоогоор эвент байхгүй байна.</p>
              <p className="text-gray-400 text-sm mt-2">Эхний эвентээ үүсгэж эхлээрэй!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



