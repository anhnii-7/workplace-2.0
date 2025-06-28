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
    <div className="min-h-screen w-full">
      <div className="w-full px-6 py-6">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
        </h1>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-blue-50 border-blue-200">
              <SelectValue placeholder='' />
            </SelectTrigger>
            <SelectContent>
              {
                hobbies.map(hobby => (
                  <SelectItem value={hobby.title} key={hobby._id}>{hobby.title}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          <AddEventDialog hobbyId={hobbyId} onEventCreated={handleEventCreated} />
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-5 py-3 px-6 place-self-center">
          {mockUsers.map((user) => (
            <Card key={user._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <Avatar className="w-31 h-30 mb-3">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                    <AvatarFallback className="bg-gray-200 text-gray-600">{user.lastName}</AvatarFallback>
                  </Avatar>

                 <div className="flex flex-col gap-[2px] py-[6px] text-center">
                   {/* Name */}
                   <div className="w-full">
                    <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
                  </div>

                  {/* Role */}
                  <div className="w-full">
                    <span className="text-sm font-normal text-gray-600">{user.role}</span>
                  </div>
                 </div>

                  {/* Tags */}
                  <div className="grid grid-cols-2 gap-3 w-full my-3">
                    {user.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex w-full rounded-full py-1 px-3 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-blue-50 text-sm text-blue-600 border-blue-200 py-2 px-16 rounded-md hover:bg-blue-100 transition-colors"
                      onClick={() => console.log(`Sending request to ${user.name}`)}
                    >
                      Хүсэлт илгээх
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
