"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarSearch, Users, MapPin, Heart, Plus, Briefcase } from "lucide-react"
import { useState } from "react"

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

const mockEvents = [
  {
    _id: "1",
    title: "Сагсан бөмбөгийн тэмцээн",
    description: "Компанийн дотоод сагсан бөмбөгийн тэмцээн зохион байгуулж байна.",
    date: "2024-01-15",
    participants: 8,
    status: "Идэвхтэй",
    category: "Сагсан бөмбөг",
  },
  {
    _id: "2",
    title: "Ном уншигчдын клуб",
    description: "Сарын эцэст ном уншигчдын клубын уулзалт болно.",
    date: "2024-01-20",
    participants: 5,
    status: "Хүлээгдэж буй",
    category: "Ном",
  },
  {
    _id: "3",
    title: "Астрологийн семинар",
    description: "Одны зураг болон астрологийн үндсийг судлах семинар.",
    date: "2024-01-25",
    participants: 12,
    status: "Идэвхтэй",
    category: "Астрологи",
  },
]

export default function HobbyInsertPage() {
  const [selectedCategory, setSelectedCategory] = useState("")

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

          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Эвент үүсгэх
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="workerlist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-100 mb-8 h-12">
            <TabsTrigger value="workerlist" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Ажилчдын жагсаалт
            </TabsTrigger>
            <TabsTrigger value="eventlist" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Эвентын жагсаалт
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workerlist" className="w-full">
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
                        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
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
                            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                      >
                        Хүсэлт илгээх
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eventlist" className="w-full">
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
                          {mockEvents.filter((e) => e.status === "Хүлээгдэж буй").length}
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
                          {mockEvents.reduce((total, event) => total + event.participants, 0)}
                        </p>
                        <p className="text-gray-600">Нийт оролцогчид</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEvents.map((event) => (
                  <Card key={event._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">{event.title}</h3>
                          <Badge
                            className={
                              event.status === "Идэвхтэй"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📅 {event.date}</span>
                          <span>👥 {event.participants} хүн</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                            Оролцох
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Дэлгэрэнгүй
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
