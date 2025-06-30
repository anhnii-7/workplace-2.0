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
import Link from "next/link"
import SuccessDialog from "./components/SuccessDialog"


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
  image?: string
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
  slice(arg0: number, arg1: number): unknown
  _id: string,
  title: string,
  image: string
}

export default function HobbyInsertPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [users, setUsers] = useState<User[]>([]);
  const [hobbies, setHobbies] = useState<HobbyInfo[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [checkUserTitle, setCheckUserTitle] = useState<string>("all");
  const [currentHobby, setCurrentHobby] = useState<HobbyInfo | null>(null);
  // console.log("USERS", users);
  // console.log("checkUserTitle", setCheckUserTitle);
  console.log("filters", filteredUsers);
  // console.log("selectedCategory", selectedCategory);
  const [loadingUsers, setLoadingUsers] = useState<Record<string, boolean>>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<Record<string, boolean>>({});
  const params = useParams();
  console.log(pendingRequests, "Pending Requests");
    useEffect(() => {
    const fetchPendingRequests = async () => {
      if (!currentUser?._id) return;
      
      try {
        const response = await axios.get(`/api/request?userId=${currentUser._id}&type=sent&status=pending`);
        const requests = (response.data as any)?.data?.requests || [];
        
        const pendingMap = requests.reduce((acc: Record<string, boolean>, request: any) => {
          acc[request.to._id] = true;
          return acc;
        }, {});
        
        setPendingRequests(pendingMap);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    fetchPendingRequests();
  }, [currentUser?._id]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`/api/user/by-hobby?id=${params.id}`);
      console.log(response.data.data, "Users Data");
      const currentUserString = localStorage.getItem("currentUser");
      if (!currentUserString) {
        router.push("/login");
        return;
      }
      const currentUser = JSON.parse(currentUserString);
      setCurrentUser(currentUser);

      const filteredUsers = (response.data as any).data.filter((user: User) => user._id !== currentUser._id);
      setUsers(filteredUsers);
      // setFilteredUsers(filteredUsers);
      const hobbyResponse = await axios.get('/api/hobby');
      const matchedHobby = hobbyResponse.data.data.find((h: HobbyInfo) => h._id === params.id);
      setCurrentHobby(matchedHobby);
    }
    getUsers();
  }, [params.id]);
  useEffect(() => {
    if (selectedCategory === "all") {
      setCurrentHobby(null);
    } else {
      const matchedHobby = hobbies.find(h => h.title === selectedCategory);
      setCurrentHobby(matchedHobby || null);
    }
  }, [selectedCategory, hobbies]);
  useEffect(() => {
    const getHobbies = async () => {
      const response = await axios.get('/api/hobby');
      setHobbies(response.data.data)
    }
    getHobbies();
  }, []);

  useEffect(() => {
    // console.log("FILTERED USERS", selectedCategory);
    // console.log("USERS", users);
    console.log(users.filter(u => u.hobby.includes(params.id as string)), "Hobby Filter Check");
    setFilteredUsers(users);

      // setFilteredUsers(users);

      // console.log(users, "Naraa");
      // setFilteredUsers(filtered);
  }, [selectedCategory, users]);

  // console.log(users.filter(u => u.hobby.includes(selectedCategory)), "Hobby Filter Check");

  const handleHobbyChange = (hobbyId: string) => {
    if (hobbyId === "all") {
      return;
    }
    router.push(`/user/hobby/${hobbyId}`);
  };

const handleSendRequest = async (toUserId: string) => {
    setLoadingUsers(prev => ({ ...prev, [toUserId]: true }));
    try {
      await axios.post("/api/request", {
        from: currentUser._id,
        to: toUserId,
        message: "Сонирхлоороо холбогдох хүсэлт илгээж байна",
        status: "pending",
        isActive: true
      });
      
      // Update pending requests state
      setPendingRequests(prev => ({ ...prev, [toUserId]: true }));
      setShowSuccessDialog(true);
      
      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 3000);
    } catch (error: any) {
      // ... (keep your existing error handling)
    } finally {
      setLoadingUsers(prev => ({ ...prev, [toUserId]: false }));
    }
  };


  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
        </h1>

        <div className="mb-8">
         <Select
            value={params.id as string}
            onValueChange={handleHobbyChange}
          >
            <SelectTrigger className="w-48 bg-blue-50 border-blue-200">
              <SelectValue>
                {currentHobby ? currentHobby.title : ''}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">Бүх сонирхол</SelectItem> */}
              {hobbies.map(hobby => (
                <SelectItem value={hobby._id} key={hobby._id}>
                  {hobby.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        
          {/* <Link href="/user/hobby/685794d7ba3a1fd08e086659">Naka</Link> */}
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card key={user._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-26 h-24 mb-3">
                      <Image src={`${user.image}`} alt="image" width={124} height={120}></Image>
                      {/* <AvatarImage src={`/avatars/${user._id}.jpg`} alt={user.name} />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
                        {user.lastName.slice(0, 1)}{user.name.slice(0, 1)}
                      </AvatarFallback> */}
                    </div>

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
                      >{Array.isArray(user.hobbyInfo)
                        ? (user.hobbyInfo as HobbyInfo[]).slice(0, 2).map((hobby: HobbyInfo) => (<div key={hobby._id}>{hobby.title}</div>))
                        : <div>{(user.hobbyInfo as HobbyInfo)?.title || "Сонирхол байхгүй"}</div>
                      }
                        {/* {user.hobbyInfo?.title || "Сонирхол байхгүй"} */}
                      </Badge>
                    </div>

                    {!pendingRequests[user._id] ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-blue-50 text-sm text-blue-600 border-blue-200 py-2 rounded-md hover:bg-blue-100 transition-colors"
                    onClick={() => handleSendRequest(user._id)}
                    disabled={loadingUsers[user._id]}
                  >
                    {loadingUsers[user._id] ? "Илгээж байна..." : "Хүсэлт илгээх"}
                  </Button>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-2">
                    Хүсэлт илгээгдсэн
                  </div>
                )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">
                {selectedCategory === "all"
                  ? "Одоогоор хэрэглэгч байхгүй байна."
                  : `${selectedCategory} сонирхолтой хэрэглэгч олдсонгүй.`}
              </p>
            </div>
          )}
        </div>
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  )
}