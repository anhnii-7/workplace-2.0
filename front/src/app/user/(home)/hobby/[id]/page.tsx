"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HobbyUserCard } from "../../components/HobbyUserCard"
import { PageHeader } from "../../components/PageHeader"
import { SuccessDialog } from "../../components/SuccessDialog"
import { useHobbies } from "@/hooks/useHobbies"

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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const params = useParams();

  const { hobbies, users, loading, fetchUsersByHobby, sendRequest } = useHobbies();

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    if (!currentUserString) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(currentUserString);
    setCurrentUser(user);
    
    if (params.id) {
      fetchUsersByHobby(params.id as string);
    }
  }, [params.id, router]);

  const handleSendRequest = async (toUserId: string) => {
    const result = await sendRequest(toUserId, currentUser);
    
    if (result.success) {
      setShowSuccessDialog(true);
      setTimeout(() => {
        setShowSuccessDialog(false);
      }, 3000);
    } else {
      toast.error(result.message, {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <PageHeader 
        title="Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе"
        animated={false}
        className="mb-8"
      />

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-3">
        {users.map((user) => (
          <HobbyUserCard
            key={user._id}
            user={user}
            onSendRequest={handleSendRequest}
            isLoading={loading}
          />
        ))}
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Хүсэлт амжилттай илгээгдлээ!"
        message="Таны хүсэлтийг хүлээн авлаа. Хариу ирэхэд мэдэгдэх болно."
      />
    </div>
  )
}