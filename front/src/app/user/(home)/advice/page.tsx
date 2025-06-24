"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Heart, MapPin, MessageSquare, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  lastName: string;
  department: string;
  role: string;
  hobby: string;
  hobbyInfo: {
    _id: string;
    title: string;
  }[];
  departmentInfo: {
    _id: string;
    title: string;
    jobTitle?: string;
  };
}

export default function WishPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  console.log(currentUser);
  // console.log(users)
  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    setCurrentUser(currentUserString ? JSON.parse(currentUserString) : null);
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      currentUser.role === "mentor"
        ? user.role === "new"
        : user.role === "mentor"
    );
    setFilteredUsers(filtered);
  }, [users, currentUser]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/user/with-info");

      console.log("Response data:", response.data);
      if (response.data.success && response.data.userWithInfo) {
        setUsers(response.data.userWithInfo);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  if (currentUser === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading user data...
      </div>
    );
  }

  const onChangeValue = (event: any) => {
    // console.log(event.target.value, filteredUsers)
  };

  return (
    <div className="px-10 h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-stone-800 text-2xl font-semibold = text-center${
            currentUser?.role === "mentor"
              ? ""
              : " bg-white py-4 px-[33px] mt-10 rounded-xl"
          }`}
        >
          {currentUser?.role === "mentor"
            ? "Шинэ ажилчидтай холбох гүүр тань болж өгье"
            : "Эргэлзэх зүйл, айх айдасгүй хүссэн асуултаа асуух боломж"}
        </h1>
      </div>

      <div className="flex justify-between">
        <h2 className="text-stone-800 text-xl font-medium py-9 ">
          {currentUser?.role === "mentor"
            ? "Шинэ ажилчдын жагсаалт"
            : "Ахлах ажилчдын жагсаалт"}
        </h2>
        <div className="bg-white rounded-xl p-[10px]">
          <image></image>
          <p className="text-slate-700 font-normal text-xl leading-7 ">too</p>
        </div>
      </div>
      <div className="grid gap-10">
        <div className="flex gap-3">
          <div className="bg-indigo-50 flex gap-4 px-4 items-center rounded-md">
            <Search />
            <Input
              onChange={onChangeValue}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredUsers.map((user) => (
                <Card key={user._id} className="p-3">
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-[100px] h-[104px] rounded-[8px]">
                        <AvatarImage
                          src={user.name.charAt(0) + user.lastName.charAt(0)}
                        />
                        <AvatarFallback>
                          {user.name.charAt(0)}
                          {user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between w-full items-center">
                        <p className="text-lg font-semibold leading-7 text-slate-700 ">
                          {user.departmentInfo?.title || "Unknown Department"}
                        </p>
                        <p className="text-sm font-normal leading-5 ">jil </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <User />

                        <h2 className="text-sm font-normal text-stone-700 leading-5">
                          {user.name} {user.lastName}
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare />
                        <p className="text-sm font-normal leading-5 text-slate-700">
                          {user.hobbyInfo[0]?.title || "No Hobby"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {" "}
                    <Button
                      variant={"outline"}
                      className="bg-blue-400 text-white text-sm font-medium  w-full hover:bg-blue-500 hover:text-white cursor-pointer"
                    >
                      Уулзах уу
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-between items-center">
             
              {/* <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
