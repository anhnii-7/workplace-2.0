"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Хайх...",
  className = ""
}: SearchBarProps) {
  return (
    <div className={`bg-white flex gap-4 px-4 items-center rounded-md w-[379px] h-[38px] ${className}`}>
      <Search />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-[300px] focus:outline-none focus-visible:ring-0 focus:ring-0 focus:border-0 border-0"
      />
    </div>
  );
} 