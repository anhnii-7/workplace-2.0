"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, User } from "lucide-react";

interface WishlistCardProps {
  user: {
    name: string;
    lastName: string;
    department: string;
    jobTitle: string;
    avatar?: string;
  };
  onMeet: () => void;
  className?: string;
}

export function WishlistCard({ user, onMeet, className = "" }: WishlistCardProps) {
  return (
    <div className={`p-3 relative ${className}`}>
      <div className="absolute bg-blue-400 rounded-full p-2 top-[-30px] right-40">
        <Heart className="text-white" />
      </div>
      
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name.charAt(0)}{user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Badge
            variant="outline"
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
          </div>
          
          <div className="flex items-center gap-3">
            <User /> 
            <p className="text-sm text-stone-500">{user.jobTitle}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin /> 
            <p className="text-sm text-stone-500">{user.department}</p>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="bg-blue-400 text-white text-sm font-medium mt-4 w-full"
        onClick={onMeet}
      >
        Уулзах уу
      </Button>
    </div>
  );
} 