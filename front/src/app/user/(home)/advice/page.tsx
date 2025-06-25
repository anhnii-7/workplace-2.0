"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CalendarDays, Heart, LocateIcon, LocationEditIcon, MapPin, MapPinIcon, MessageSquare, Search, User, User2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardEmployee from "../components/LeaderboardEmployee";
import EmployeeProfile from "../components/EmployeeProfile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  lastName: string;
  department: string;
  role: string;
  hobby: string;
  experience: string;
  hobbyInfo: {
    _id: string;
    title: string;
  }[];
  departmentInfo: {
    _id: string;
    title: string;
    jobTitle?: string;
    jobTitleInfo: {
      _id: string;
      title: string;
    }
  };
  availableSchedules?: string[];
}

interface Request {
  _id: string;
  from: string | User;
  to: string | User;
  message: string;
  selectedSchedule: string;
  status: 'pending' | 'accepted' | 'declined';
  isActive: boolean;
  mentorNotes?: string;
  meetingDate?: string;
  meetingLocation?: string;
  createdAt: string;
}

export default function WishPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [requests, setRequests] = useState<{ sent: Request[], received: Request[] }>({ sent: [], received: [] });
  const [formData, setFormData] = useState({
    message: '',
    selectedDate: ''
  });
  console.log(requests)
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'send' | 'received'>('send');
  const [selectedMentor, setSelectedMentor] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const extractDuration = (text: string) => {
    const match = text.match(/(\d+)\s*(жил|сар)/);
    return match ? match[0] : text;
  };

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    if (!currentUserString) {
      router.push('/login');
      return;
    }
    const user = JSON.parse(currentUserString);
    setCurrentUser(user);
    fetchUsers();
    fetchRequests(user._id);
  }, [router]);

  useEffect(() => {
    if (currentUser && users.length > 0) {
      const filtered = users.filter((user) =>
        currentUser.role === "mentor"
          ? user.role === "new"
          : user.role === "mentor"
      ).filter(user =>
        `${user.name} ${user.lastName} ${user.departmentInfo?.title}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, currentUser, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/user/with-info");

      if (response.data.success && response.data.userWithInfo) {
        setUsers(response.data.userWithInfo);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to load users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async (userId: string) => {
    try {
      const response = await axios.get('http://localhost:8000/request', {
        params: {
          userId,
          type: 'all'
        }
      });
      setRequests({
        sent: response.data.requests.filter((req: Request) => req.from === userId),
        received: response.data.requests.filter((req: Request) => req.to === userId)
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error("Failed to load requests");
    }
  };

  const createRequest = async (toUserId: string, message: string, selectedDate: string) => {
    try {
      const response = await axios.post('http://localhost:8000/request', {
        from: currentUser._id,
        to: toUserId,
        message,
        selectedSchedule: selectedDate
      });
      fetchRequests(currentUser._id);
      toast.success("Request sent successfully");
      setIsDialogOpen(false);
      return response.data;
    } catch (error: any) {
      console.error('Error creating request:', error);
      toast.error(error.response?.data?.message || "Failed to send request");
      throw error;
    }
  };

  const updateRequest = async (requestId: string, status: string, notes?: string) => {
    try {
      const response = await axios.put(`http://localhost:8000/request/${requestId}`, {
        status,
        mentorNotes: notes
      });
      fetchRequests(currentUser._id);
      toast.success(`Request ${status}`);
      return response.data;
    } catch (error: any) {
      console.error('Error updating request:', error);
      toast.error(error.response?.data?.message || "Failed to update request");
      throw error;
    }
  };

  const cancelRequest = async (requestId: string) => {
    try {
      await axios.delete(`http://localhost:8000/request/${requestId}`);
      fetchRequests(currentUser._id);
      toast.success("Request cancelled");
    } catch (error: any) {
      console.error('Error cancelling request:', error);
      toast.error(error.response?.data?.message || "Failed to cancel request");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleScheduleSelect = (schedule: string) => {
    setFormData({
      ...formData,
      selectedDate: schedule
    });
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="flex gap-6 mt-[40px] p-4">
      {/* Main Content - Users List */}
      <div className="flex-1 bg-red-400">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-stone-800 text-2xl font-semibold ${currentUser?.role === "mentor" ? "" : "bg-white py-4 px-8 rounded-xl"}`}>
            {currentUser?.role === "mentor"
              ? "Шинэ ажилчидтай холбох гүүр тань болж өгье"
              : "Эргэлзэх зүйл, айх айдасгүй хүссэн асуултаа асуух боломж"}
          </h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-stone-800 text-xl font-medium">
            {currentUser?.role === "mentor"
              ? "Шинэ ажилчдын жагсаалт"
              : "Ахлах ажилчдын жагсаалт"}
          </h2>
          <div className="bg-white rounded-xl p-3">
            <p className="text-slate-700 font-normal">{filteredUsers.length} хүн</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="flex gap-3">
            <div className="bg-indigo-50 flex gap-4 px-4 items-center rounded-md">
              <Search />
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder={
                  currentUser?.role === "mentor"
                    ? "Шинэ ажилчдын нэр болон хэлтсээр хайх..."
                    : "Mentor-уудын нэр болон хэлтсээр хайх..."
                }
                className="w-[300px] focus:outline-none focus:ring-0 focus:border-0 border-0"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Ачааллаж байна...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>
                {currentUser?.role === "mentor"
                  ? "Шинэ ажилчид олдсонгүй"
                  : "Mentor олдсонгүй"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredUsers.map((user) => (
                <Card key={user._id} className="p-4 hover:shadow-lg transition-shadow w-[379px] ">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-24 h-24 rounded-lg">
                        <AvatarImage
                          src={`/avatars/${user._id}.jpg`}
                          alt={`${user.name} ${user.lastName}`}
                        />
                        <AvatarFallback className="text-[28px]">
                          {user.name.charAt(0)}{user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between w-full items-center">
                       <p className="text-[20px] text-slate-700">
                          {user.departmentInfo?.jobTitleInfo?.title || "No Position"}
                        </p>
                        <Badge variant="outline" className="w-[56px] h-[24px] bg-blue-200 rounded-2xl">
                          {extractDuration(user.experience)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4" />
                        <h2 className="text-sm font-normal text-stone-700">
                          {user.name} {user.lastName}
                        </h2>
                      </div>
                      <div>Туслалцаа хэрэгтэй байна.</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-blue-500 text-white w-full hover:bg-blue-600"
                          onClick={() => setSelectedMentor(user)}
                        >
                          Уулзах хүсэлт илгээх
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Хүлээн авагчийн мэдээлэл</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-4 my-6">
                          <Card className="flex gap-4 p-4 items-center">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={`/avatars/${selectedMentor?._id}.jpg`} />
                              <AvatarFallback>{selectedMentor?.name.charAt(0)}{selectedMentor?.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{selectedMentor?.lastName.slice(0, 1)}.{selectedMentor?.name}</h3>
                              <p className="text-sm text-gray-500">Mentor</p>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <User2Icon className="w-4 h-4" />
                                <span>{selectedMentor?.departmentInfo?.jobTitleInfo?.title || "N/A"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{selectedMentor?.departmentInfo?.title || "N/A"}</span>
                              </div>
                            </div>
                          </Card>
                          <Card className="p-4">
                            <div className="space-y-3">
                              <h4 className="font-medium">Ажиллаж буй хугацаа</h4>
                              <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                <span>{selectedMentor ? extractDuration(selectedMentor.experience) : "N/A"}</span>
                              </div>
                            </div>
                          </Card>
                        </div>
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          if (!selectedMentor) return;
                          try {
                            await createRequest(
                              selectedMentor._id,
                              formData.message,
                              formData.selectedDate
                            );
                          } catch (error) {
                            // Error handled in createRequest
                          }
                        }}>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-lg font-semibold">
                                Боломжит цагууд
                              </Label>
                              <div className="flex gap-2 mt-2">
                                {selectedMentor?.availableSchedules?.map((schedule) => (
                                  <Button
                                    key={schedule}
                                    type="button"
                                    variant={formData.selectedDate === schedule ? "default" : "outline"}
                                    onClick={() => handleScheduleSelect(schedule)}
                                  >
                                    {formatDate(schedule)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="message" className="text-lg font-semibold">
                                Ямар шалтгааны улмаас уулзах хүсэлт илгээж байгаа вэ?
                              </Label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full h-40 rounded-lg border p-3 mt-2"
                                required
                                placeholder="Уулзалтын зорилго, асууж байгаа асуултаа дэлгэрэнгүй бичнэ үү..."
                              />
                            </div>
                          </div>
                          <DialogFooter className="mt-6">
                            <Button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-600"
                              disabled={!formData.selectedDate}
                            >
                              Хүсэлт илгээх
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-96 space-y-6">
        {/* Leaderboard */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-center text-gray-500">
              Уулзалтын тоогоор тэргүүлэгчдийн жагсаалт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmployeeProfile />
            <div className="space-y-3 mt-4">
              <LeaderboardEmployee />
              <LeaderboardEmployee />
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">
              Боломжит өдрөө сонгоорой
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              captionLayout="dropdown"
            />
          </CardContent>
        </Card>

        {/* Requests */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-center">Хүсэлтүүд</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as 'send' | 'received')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="send">Илгээсэн</TabsTrigger>
                <TabsTrigger value="received">Хүлээн авсан</TabsTrigger>
              </TabsList>

              <TabsContent value="send" className="mt-4">
                {requests.sent.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Илгээсэн хүсэлт байхгүй</p>
                ) : (
                  <div className="space-y-3">
                    {requests.sent.map((request) => (
                      <Card key={request._id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={typeof request.to !== 'string' ? `/avatars/${request.to._id}.jpg` : ''} />
                                <AvatarFallback>
                                  {typeof request.to !== 'string' ? request.to.name.charAt(0) : '?'}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {typeof request.to !== 'string' ?
                                  `${request.to.name} ${request.to.lastName}` : 'Unknown'}
                              </span>
                            </div>
                            <div className="mt-2 space-y-1">
                              <Badge variant={request.status === 'accepted' ? 'default' :
                                request.status === 'declined' ? 'destructive' : 'outline'}>
                                {request.status === 'pending' ? 'Хүлээгдэж буй' :
                                  request.status === 'accepted' ? 'Зөвшөөрсөн' : 'Татгалзсан'}
                              </Badge>
                              <p className="text-sm text-gray-500">
                                {formatDate(request.selectedSchedule)}
                              </p>
                            </div>
                          </div>
                          {request.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelRequest(request._id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              Цуцлах
                            </Button>
                          )}
                        </div>
                        <p className="mt-3 text-sm">{request.message}</p>
                        {request.status === 'accepted' && request.meetingLocation && (
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{request.meetingLocation}</span>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="received" className="mt-4">
                {requests.received.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Хүлээн авсан хүсэлт байхгүй</p>
                ) : (
                  <div className="space-y-3">
                    {requests.received.map((request) => (
                      <Card key={request._id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={typeof request.from !== 'string' ? `/avatars/${request.from._id}.jpg` : ''} />
                                <AvatarFallback>
                                  {typeof request.from !== 'string' ? request.from.name.charAt(0) : '?'}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {typeof request.from !== 'string' ?
                                  `${request.from.name} ${request.from.lastName}` : 'Unknown'}
                              </span>
                            </div>
                            <div className="mt-2 space-y-1">
                              <Badge variant={request.status === 'accepted' ? 'default' :
                                request.status === 'declined' ? 'destructive' : 'outline'}>
                                {request.status === 'pending' ? 'Хүлээгдэж буй' :
                                  request.status === 'accepted' ? 'Зөвшөөрсөн' : 'Татгалзсан'}
                              </Badge>
                              <p className="text-sm text-gray-500">
                                {formatDate(request.selectedSchedule)}
                              </p>
                            </div>
                          </div>
                          {request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateRequest(request._id, 'accepted')}
                              >
                                Зөвшөөрөх
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const notes = prompt('Татгалзах шалтгаанаа бичнэ үү:');
                                  if (notes !== null) {
                                    updateRequest(request._id, 'declined', notes);
                                  }
                                }}
                              >
                                Татгалзах
                              </Button>
                            </div>
                          )}
                        </div>
                        <p className="mt-3 text-sm">{request.message}</p>
                        {request.status !== 'pending' && request.mentorNotes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium">Тайлбар:</p>
                            <p className="text-sm text-gray-600">{request.mentorNotes}</p>
                          </div>
                        )}
                        {request.status === 'accepted' && (
                          <div className="mt-3 space-y-2">
                            {request.meetingLocation && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{request.meetingLocation}</span>
                              </div>
                            )}
                            {request.meetingDate && (
                              <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="w-4 h-4" />
                                <span>{formatDate(request.meetingDate)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}