"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  availableSchedules?: string[]
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
  title: string
}

export type HobbyInfo = {
  _id: string,
  title: string,
  image: string
}

export default function HobbyInsertPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [hobbies, setHobbies] = useState<HobbyInfo[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const params = useParams();
  console.log(users, "USERS")
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`/api/user/by-hobby?id=${params.id}`);
    
      setUsers(response.data.data);
    }
    getUsers();
    const currentUserString = localStorage.getItem("currentUser");
    if (!currentUserString) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(currentUserString);
    setCurrentUser(user);
  }, [params.id]);

  useEffect(() => {
    const getHobbies = async () => {
      const response = await axios.get('/api/hobby');
      setHobbies(response.data.data)
    }
    getHobbies();
  }, []);

  const handleSendRequest = async (toUserId: string) => {
    setIsLoading(true);
    try {
      const selectedUser = users.find(user => user._id === toUserId);
      
      if (!selectedUser?.availableSchedules || selectedUser.availableSchedules.length === 0) {
        toast.error("Энэ хэрэглэгчид уулзах боломжтой цаг алга байна", {
          position: "top-center",
          duration: 3000,
        });
        return;
      }

      const selectedDate = selectedUser.availableSchedules[0];
      
      await axios.post("/api/request", {
        from: currentUser._id,
        to: toUserId,
        message: "Сонирхлоороо холбогдох хүсэлт илгээж байна",
        selectedSchedule: selectedDate,
        status: "pending", 
        isActive: true    
      });

    
      setShowSuccessDialog(true);
      
    
      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 3000);

    } catch (error: any) {
      console.error("Error creating request:", error);
      let errorMessage = "Хүсэлт илгээхэд алдаа гарлаа";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
        </h1>

        <div className="mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-blue-50 border-blue-200">
              <SelectValue placeholder='Сонирхол сонгох' />
            </SelectTrigger>
            <SelectContent>
              {hobbies.map(hobby => (
                <SelectItem value={hobby.title} key={hobby._id}>{hobby.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <AddEventDialog hobbyId={hobbyId} onEventCreated={handleEventCreated} /> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-3">
          {users.map((user) => (
            <Card key={user._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-3">
                    <AvatarImage src={`/avatars/${user._id}.jpg`} alt={user.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
                      {user.lastName.slice(0, 1)}{user.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1 py-[6px] text-center w-full">
                    <div className="w-full">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {user.lastName.slice(0, 1)}.{user.name}
                      </h3>
                    </div>

                    <div className="w-full">
                      <span className="text-sm font-normal text-gray-600">
                        {user.departmentInfo?.jobTitleInfo?.title || "Алба байхгүй"}
                      </span>
                    </div>

                    <div className="w-full">
                      <span className="text-sm font-normal text-gray-500">
                        {user.departmentInfo?.title || "Хэлтэс байхгүй"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 w-full my-3">
                    <Badge
                      variant="secondary"
                      className="flex w-full rounded-full py-1 px-3 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                    >
                      {user.hobbyInfo?.title || "Сонирхол байхгүй"}
                    </Badge>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-blue-50 text-sm text-blue-600 border-blue-200 py-2 rounded-md hover:bg-blue-100 transition-colors"
                    onClick={() => handleSendRequest(user._id)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Илгээж байна..." : "Хүсэлт илгээх"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Амжилттай</DialogTitle>
            <DialogDescription className="text-center">
              <Image src={`/alertpinguin.png`} alt="image" width={400} height={400}></Image>
              Хүсэлт амжилттай илгээгдлээ!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}