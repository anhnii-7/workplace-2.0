"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User } from "lucide-react";

export interface User {
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
    };
  };
  availableSchedules?: string[];
}

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
  buttonText?: string;
  showSchedule?: boolean;
}

export function UserCard({ user, onSelect, buttonText = "Уулзах", showSchedule = false }: UserCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow w-[359px] flex flex-col gap-3">
      <div className="flex justify-around gap-4 items-center">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24 rounded-lg">
            <AvatarImage
              src={`/avatars/${user._id}.jpg`}
              alt={`${user.name} ${user.lastName}`}
            />
            <AvatarFallback className="text-[28px]">
              {user.name.charAt(0)}
              {user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Badge
            variant="outline"
            className="bg-indigo-50 text-blue-900 text-xs font-medium px-6 py-1"
          >
            {user.experience}
          </Badge>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-lg font-semibold text-stone-700">
              {user.lastName.slice(0, 1)}.{user.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <User /> 
            <p className="text-sm text-stone-500">
              {user.departmentInfo?.jobTitleInfo?.title || "N/A"}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin /> 
            <p className="text-sm text-stone-500">
              {user.departmentInfo?.title || "N/A"}
            </p>
          </div>
          
          {showSchedule && user.availableSchedules && user.availableSchedules.length > 0 && (
            <div className="text-xs text-stone-500">
              Боломжит цаг: {user.availableSchedules.length} өдөр
            </div>
          )}
        </div>
      </div>
      
      <Button
        variant="outline"
        className="bg-blue-400 text-white text-sm font-medium"
        onClick={() => onSelect(user)}
      >
        {buttonText}
      </Button>
    </Card>
  );
} 