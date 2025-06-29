"use client";

import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  labelColor: string;
}

export function SummaryCard({ 
  icon: Icon, 
  value, 
  label, 
  bgColor, 
  iconColor, 
  textColor, 
  labelColor 
}: SummaryCardProps) {
  return (
    <div className={`flex-1 flex items-center ${bgColor} rounded-2xl p-6 min-w-[220px]`} style={{ boxShadow: "none" }}>
      <div className="bg-white rounded-full p-4 mr-4 flex items-center justify-center">
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <div>
        <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
        <p className={`text-base ${labelColor}`}>{label}</p>
      </div>
    </div>
  );
} 