"use client";

import { Plus } from "lucide-react";

interface AddEventCardProps {
  onClick: () => void;
  className?: string;
}

export function AddEventCard({ onClick, className = "" }: AddEventCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-[220px] h-full bg-[#F6FAFF] border-2 border-dashed border-blue-200 rounded-2xl cursor-pointer transition hover:bg-blue-50 hover:border-blue-400 ${className}`}
      onClick={onClick}
      style={{ boxShadow: "none" }}
    >
      <Plus className="w-16 h-16 text-blue-300" />
    </div>
  );
} 