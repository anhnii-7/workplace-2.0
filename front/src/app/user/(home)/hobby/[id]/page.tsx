"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
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
  const [loadingUsers, setLoadingUsers] = useState<Record<string, boolean>>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<Record<string, boolean>>({});
  const [response, setResponse] = useState<any>([]);

  const params = useParams();
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
      const currentUserString = localStorage.getItem("currentUser");
      if (!currentUserString) {
        router.push("/login");
        return;
      }
      const currentUser = JSON.parse(currentUserString);
      setCurrentUser(currentUser);

      const filteredUsers = (response.data as any).data.filter((user: User) => user._id !== currentUser._id);
      setUsers(filteredUsers);
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
    setFilteredUsers(users);
  }, [selectedCategory, users]);

  const handleHobbyChange = (hobbyId: string) => {
    if (hobbyId === "all") {
      return;
    }
    router.push(`/user/hobby/${hobbyId}`);
  };

  const handleSendRequest = async (toUserId: string) => {
    setLoadingUsers(prev => ({ ...prev, [toUserId]: true }));
    try {
      const response = await axios.post("/api/request", {
        from: currentUser._id,
        to: toUserId,
        message: "Сонирхлоороо холбогдох хүсэлт илгээж байна",
        status: "pending",
        isActive: true
      });
      // Update pending requests state
      setPendingRequests(prev => ({ ...prev, [toUserId]: true }));
      setShowSuccessDialog(true);
      // setResponse(response.data);
      const notification = await axios.post("/api/notification", {
        from: currentUser._id,
        to: toUserId,
        type: "Request",
        typeId: response.data.request._id
      });
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
    <div className="min-h-screen w-full relative">
          <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363331/greee-1_jcxmpi.png`} 
            width={171} 
            height={149} 
            className="w-[171px] h-[149px] absolute bottom-20 left-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363216/green-2_ktnkvs.png`} 
            width={240} 
            height={240} 
            className="w-[70px] h-[94px] absolute bottom-60 -right-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363167/red-ball_v73ekg.png`} 
            width={124} 
            height={124} 
            className="w-[124px] h-[124px] absolute top-15 -right-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363263/green_z5wo1z.png`} 
            width={94} 
            height={100} 
            className="w-[94px] h-[100px] absolute top-14 -left-10 z-10 " 
            alt="containerIMG"
            priority 
          />
      <div className="w-full z-20  ">
        
        <h1 className="text-2xl font-medium text-slate-800 text-center py-4 px-6 mt-[5px]">
          Цайны цагийн сонирхолтой яриа
        </h1>

        <div className="grid grid-cols-2 gap-5 my-10 text-slate-900 text-sm font-medium">
          <Select
            value={params.id as string}
            onValueChange={handleHobbyChange}
          >
            <SelectTrigger className="w-full bg-white border border-amber-200 rounded-md">
              <SelectValue className="text-slate-900 text-sm">
                {currentHobby ? currentHobby.title : ''}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {hobbies.map(hobby => (
                <SelectItem value={hobby._id} key={hobby._id} className="text-slate-900 text-sm">
                  {hobby.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-full"></div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="relative group">
                <Card className="bg-white px-3 border-1 border-amber-100 py-6 w-[267.5px] h-[284px] group-hover:opacity-70 group-hover:border-1 group-hover:border-amber-200 transition-all duration-300">
                  <CardContent className="p-0 group-hover:blur-xs">
                    <div className="flex flex-col items-center object-fit">
                      <div className="w-[124px] h-[120px] rounded-xl relative">
                        <Image
                          src={`${user.image}`}
                          alt="image"
                          className="object-fill absolute border-none rounded-xl"
                          fill
                        />
                      </div>

                      <div className="flex flex-col gap-1 my-3 text-center w-full">
                        <p className="font-semibold text-slate-800 text-lg">
                          {user.lastName.slice(0, 1)}.{user.name}
                        </p>
                        <p className="text-sm font-normal text-gray-600">
                          {user.departmentInfo?.jobTitleInfo?.title || "Алба байхгүй"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full pt-4">
                        {Array.isArray(user.hobbyInfo)
                          ? (user.hobbyInfo as HobbyInfo[]).slice(0, 2).map((hobby: HobbyInfo) => (
                            <Badge
                              variant="secondary"
                              key={hobby._id}
                              className={`flex w-full rounded-full py-1 px-3 text-xs bg-red-50 font-medium text-slate-800 hover:bg-amber-100 cursor-pointer transition-colors`}
                            >
                              {hobby.title}
                            </Badge>
                          ))
                          : <div>{(user.hobbyInfo as HobbyInfo)?.title || "Сонирхол байхгүй"}</div>
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>


                <div className="absolute bottom-4 left-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Button
                    className="pointer-events-auto text-sm font-medium text-amber-900 border-blue-200 py-[10px] rounded-md hover:bg-amber-300 transition-colors w-[230px] bg-amber-200"
                    onClick={() => handleSendRequest(user._id)}
                    disabled={loadingUsers[user._id]}
                  >
                    {loadingUsers[user._id] ? "Илгээж байна..." : "Хүсэлт илгээх"}
                  </Button>
                </div>
              </div>
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