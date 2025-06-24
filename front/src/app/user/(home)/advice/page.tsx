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
import { Heart, MapPin, Search, User } from "lucide-react";
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
  const [currentUser, setCurrentUser] = useState<any>(null)
  console.log(currentUser)
  // console.log(users)
  useEffect(() => {
    const currentUserString = localStorage.getItem('currentUser');
    setCurrentUser(currentUserString ? JSON.parse(currentUserString) : null)
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      currentUser.role === "mentor" ? user.role === "new" : user.role === "mentor"
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
    return <div className="flex justify-center items-center h-screen">
      Loading user data...
    </div>;
  }

  const onChangeValue = (event: any) => {
    // console.log(event.target.value, filteredUsers)
  }


  return (
    <div className="px-10 h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-stone-800 text-3xl font-semibold py-30 text-center">
          {currentUser?.role === "mentor"
            ? "Таны хүсэлт явуулах боломжтой ажилчид"
            : "Таны боломжит mentor-ууд"}
        </h1>
      </div>

      <div className="grid gap-10">
        <div className="flex gap-3">
          <div className="bg-indigo-50 flex gap-4 px-4 items-center rounded-md">
            <Search />
            <Input
              onChange={onChangeValue}
              type="text"
              placeholder={currentUser?.role === "mentor"
                ? "Шинэ ажилчдын нэр болон хэлтсээр хайх..."
                : "Mentor-уудын нэр болон хэлтсээр хайх..."}
              className="w-[300px] focus:outline-none focus:ring-0 focus:border-0 border-0"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px] bg-indigo-50">
              <SelectValue placeholder="Ангилал" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүгд</SelectItem>
              <SelectItem value="design">Дизайн</SelectItem>
              <SelectItem value="development">Хөгжүүлэлт</SelectItem>
              <SelectItem value="marketing">Маркетинг</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Ачааллаж байна...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>{currentUser?.role === "mentor"
              ? "Шинэ ажилчид олдсонгүй"
              : "Mentor олдсонгүй"}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user._id} className="p-3">
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={user.name.charAt(0) + user.lastName.charAt(0)} />
                        <AvatarFallback>
                          {user.name.charAt(0)}{user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        variant={"outline"}
                        className="bg-indigo-50 text-blue-900 text-xs font-medium px-6 py-1"
                      >
                        Уулзъя л даа
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between w-full items-center">
                        <h2 className="text-lg font-semibold text-stone-700">
                          {user.name} {user.lastName}
                        </h2>
                        <Heart className="cursor-pointer hover:fill-red-500" />
                      </div>
                      <div className="flex items-center gap-3">
                        <User />
                        <p className="text-sm text-stone-500">
                          {user.departmentInfo?.title || "Unknown Department"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin />
                        <p className="text-sm text-stone-500">
                          {user.hobbyInfo[0]?.title || "No Hobby"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant={"outline"}
                    className="bg-blue-400 text-white text-sm font-medium mt-4 w-full hover:bg-blue-500"
                  >
                    Уулзах уу
                  </Button>
                </Card>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Select>
                <SelectTrigger className="w-[180px] bg-indigo-50">
                  <SelectValue placeholder="Хүний тоо" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <Pagination>
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
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}