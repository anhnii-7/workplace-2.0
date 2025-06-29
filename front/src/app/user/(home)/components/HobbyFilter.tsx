"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Hobby = {
  title: string;
  _id: string;
  image: string;
};

interface HobbyFilterProps {
  selectedHobby: string;
  onHobbyChange: (hobbyId: string) => void;
  hobbies: Hobby[];
  placeholder?: string;
  className?: string;
}

export function HobbyFilter({ 
  selectedHobby, 
  onHobbyChange, 
  hobbies, 
  placeholder = "Бүх эвент",
  className = ""
}: HobbyFilterProps) {
  return (
    <Select value={selectedHobby} onValueChange={onHobbyChange}>
      <SelectTrigger className={`w-64 bg-blue-50 border-blue-200 ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Бүх эвент</SelectItem>
        {hobbies.map(hobby => (
          <SelectItem value={hobby._id} key={hobby._id}>
            {hobby.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 