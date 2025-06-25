"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarSearch, Users, MapPin, Heart, Plus, Briefcase, Calendar, User } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data based on the screenshot
const mockUsers = [
  {
    _id: "1",
    name: "Г.Хулан",
    lastName: "Г",
    role: "Дизайнер",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Ном", "Астрологи"],
  },
  {
    _id: "2",
    name: "Б.Санаа",
    lastName: "Б",
    role: "Хөгжүүлэгч",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Ном"],
  },
  {
    _id: "3",
    name: "У.Болд",
    lastName: "У",
    role: "Дизайнер",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Уулзах"],
  },
  {
    _id: "4",
    name: "Г.Батсайхан",
    lastName: "Г",
    role: "Дизайнер",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Ном", "Видео тоглоом"],
  },
  {
    _id: "5",
    name: "Р.Удвал",
    lastName: "Р",
    role: "Хөгжүүлэгч",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Бисалгал", "Ном"],
  },
  {
    _id: "6",
    name: "Х.Сайханбилэгт",
    lastName: "Х",
    role: "Хүний нөөц",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Астрологи"],
  },
  {
    _id: "7",
    name: "Е.Индрам",
    lastName: "Е",
    role: "Дизайнер",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Сагсан бөмбөг", "Ном"],
  },
  {
    _id: "8",
    name: "Л.Нранцацралт",
    lastName: "Л",
    role: "Хүний нөөц",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Сагсан бөмбөг", "Ном"],
  },
  {
    _id: "9",
    name: "Б.Бундан",
    lastName: "Б",
    role: "Нягтлан",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Сагсан бөмбөг", "Ном"],
  },
  {
    _id: "10",
    name: "Г.Лувсандорж",
    lastName: "Г",
    role: "Хөгжүүлэгч",
    department: "Сагсан бөмбөг",
    avatar: "/placeholder.svg?height=80&width=80",
    tags: ["Сагсан бөмбөг", "Ном"],
  },
]

const initialEvents = [
  {
    _id: "1",
    title: "Book Club",
    description: "Сууд унших номоо ярьцгаая",
    date: "07-02",
    time: "12:30",
    currentParticipants: 3,
    maxParticipants: 5,
    status: "2 хүн дутуу",
    category: "Ном унших",
    organizer: "Г.Хулан",
    location: "Lobby lounge",
  },
  {
    _id: "2",
    title: "CS 1.6",
    description: "Асуух зүйл байвал > 99123489",
    date: "06-25",
    time: "19:00",
    currentParticipants: 4,
    maxParticipants: 10,
    status: "6 хүн дутуу",
    category: "Наг уяай дээ",
    organizer: "Г.Хулан",
    location: "Ace Sport",
  },
  {
    _id: "3",
    title: "Астрологийн семинар",
    description: "Одны зураг болон астрологийн үндсийг судлах семинар.",
    date: "2024-01-25",
    time: "14:00",
    currentParticipants: 12,
    maxParticipants: 15,
    status: "Идэвхтэй",
    category: "Астрологи",
    organizer: "Г.Хулан",
    location: "Conference Room",
  },
]

export default function HobbyInsertPage() {
  const [events, setEvents] = useState(initialEvents)
  const [joinedEvents, setJoinedEvents] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("workerlist")
  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "",
    date: "",
    time: "",
    location: "",
    limit: "",
    description: "",
  })

  const handleCreateEvent = () => {
    // Create new event object
    const createdEvent = {
      _id: Date.now().toString(), // Simple ID generation
      title: newEvent.name,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      currentParticipants: 1, // Creator is automatically joined
      maxParticipants: Number.parseInt(newEvent.limit) || 10,
      status: `${(Number.parseInt(newEvent.limit) || 10) - 1} хүн дутуу`,
      category: newEvent.type,
      organizer: "Г.Хулан", // Current user
      location: newEvent.location,
    }

    // Add the new event to the events list
    setEvents((prevEvents) => [...prevEvents, createdEvent])

    // Automatically join the creator to the event
    setJoinedEvents((prev) => [...prev, createdEvent._id])

    // Close create modal and show success
    setIsCreateEventOpen(false)
    setIsSuccessOpen(true)

    // Switch to event list tab to show the new event
    setActiveTab("eventlist")

    // Reset form
    setNewEvent({
      name: "",
      type: "",
      date: "",
      time: "",
      location: "",
      limit: "",
      description: "",
    })
  }

  const handleJoinEvent = (eventId: string) => {
    setJoinedEvents((prev) => {
      if (prev.includes(eventId)) {
        // Leave event - decrease participant count
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? {
                  ...event,
                  currentParticipants: event.currentParticipants - 1,
                  status: `${event.maxParticipants - (event.currentParticipants - 1)} хүн дутуу`,
                }
              : event,
          ),
        )
        return prev.filter((id) => id !== eventId)
      } else {
        // Join event - increase participant count
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? {
                  ...event,
                  currentParticipants: event.currentParticipants + 1,
                  status:
                    event.currentParticipants + 1 >= event.maxParticipants
                      ? "Дүүрсэн"
                      : `${event.maxParticipants - (event.currentParticipants + 1)} хүн дутуу`,
                }
              : event,
          ),
        )
        return [...prev, eventId]
      }
    })
  }

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
                <div>
                  <Label htmlFor="eventType">Төрөл</Label>
                  <Input
                    id="eventType"
                    placeholder="Энд бичих орууна уу ..."
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate">Өдөр</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventTime">Цаг</Label>
                    <Input
                      id="eventTime"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="eventLocation">Хаяг</Label>
                  <Input
                    id="eventLocation"
                    placeholder="Энд бичих орууна уу ..."
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="eventLimit">Хүний хязгаар</Label>
                  <Input
                    id="eventLimit"
                    placeholder="Энд бичих орууна уу ..."
                    value={newEvent.limit}
                    onChange={(e) => setNewEvent({ ...newEvent, limit: e.target.value })}
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-100 mb-8 h-12 rounded-lg">
            <TabsTrigger
              value="workerlist"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Ажилчдын жагсаалт
            </TabsTrigger>
            <TabsTrigger
              value="eventlist"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Эвентын жагсаалт
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workerlist" className="w-full mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
              {mockUsers.map((user) => (
                <Card key={user._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Avatar */}
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gray-200 text-gray-600">{user.lastName}</AvatarFallback>
                      </Avatar>

                      {/* Name and Heart */}
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
                        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                      </div>

                      {/* Role */}
                      <div className="flex items-center space-x-2 w-full">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{user.role}</span>
                      </div>

                      {/* Department */}
                      <div className="flex items-center space-x-2 w-full">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{user.department}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 w-full">
                        {user.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 transition-colors"
                        onClick={() => console.log(`Sending request to ${user.name}`)}
                      >
                        Хүсэлт илгээх
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eventlist" className="w-full mt-6">
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
                          {events.filter((e) => e.status.includes("дутуу")).length}
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
                          {events.reduce((total, event) => total + event.currentParticipants, 0)}
                        </p>
                        <p className="text-gray-600">Нийт оролцогчид</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => {
                  const isJoined = joinedEvents.includes(event._id)
                  const isFull = event.currentParticipants >= event.maxParticipants
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
                                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                                <p className="text-sm text-gray-500">{event.category}</p>
                              </div>
                            </div>
                            <Badge
                              className={
                                isFull
                                  ? "bg-red-100 text-red-700"
                                  : event.status.includes("дутуу")
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                              }
                            >
                              {event.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600">{event.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                              <span className="ml-4">🕐 {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <User className="w-4 h-4" />
                              <span>{event.organizer}</span>
                              <span className="ml-4">📍 {event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Users className="w-4 h-4" />
                              <span>
                                {event.currentParticipants}/{event.maxParticipants} хүн бүртгүүлсэн байна
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
