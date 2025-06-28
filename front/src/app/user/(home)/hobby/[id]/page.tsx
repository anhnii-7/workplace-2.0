"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"

export type User = {
  _id: string
  email: string
  name: string
  lastName: string
  role: "new" | "old" | "mentor",
  password: string
  hobby: string
  experience: string
  hobbyInfo: HobbyInfo
  department: string
  departmentInfo: DepartmentInfo
  createdAt?: Date
  updatedAt?: Date
}

export type JobTitleInfo = {
  _id: string
  title: string
}

export type DepartmentInfo = {
  id: string
  jobTitle: string
  jobTitleInfo: JobTitleInfo
}

export type HobbyInfo = {
  _id: string,
  title: string,
  image: string
}


export default function HobbyInsertPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [hobbies, setHobbies] = useState<HobbyInfo[]>([])
  const params = useParams();

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`/api/user/by-hobby?id=${params.id}`);
      setUsers(response.data.users);
    }
    getUsers();
  }, [params.id]);

  useEffect(() => {
    const getHobbies = async () => {
      const response = await axios.get('/api/hobby');
      setHobbies(response.data)
    }
    getHobbies();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div className="w-full">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
        </h1>

        {/* Controls */}
        <div className="mb-8">
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
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-5 py-3 px-6 place-self-center">
          {users.map((user) => (
            <Card key={user._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <Avatar className="w-31 h-30 mb-3">
                    <AvatarImage src={""} alt={user.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-600">{user.lastName.slice(0, 1)}{user.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1 py-[6px] text-center">
                    {/* Name */}
                    <div className="w-full">
                      <h3 className="font-semibold text-gray-800 text-lg">{user.lastName.slice(0, 1)}.{user.name}</h3>
                    </div>

                    {/* Role */}
                    <div className="w-full">
                      <span className="text-sm font-normal text-gray-600">{user.departmentInfo.jobTitleInfo.title}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="grid grid-cols-2 gap-3 w-full my-3">
                    <Badge
                      key={user.hobbyInfo.title}
                      variant="secondary"
                      className="flex w-full rounded-full py-1 px-3 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                    >
                      {user.hobbyInfo.title}
                    </Badge>
                    {/* {user.hobby.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex w-full rounded-full py-1 px-3 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))} */}
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
      </div>
    </div>
  )
}
