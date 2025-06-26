"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
        </div>

        {/* Tabs */}
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
                  </div>

                  {/* Role */}
                  <div className="flex items-center space-x-2 w-full">
                    <span className="text-sm text-gray-600">{user.role}</span>
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
      </div>
    </div>
  )
}
