"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarSearch, Users } from "lucide-react";

interface EventStatsCardsProps {
  pendingCount: number | string;
  totalParticipants: number | string;
  loading?: boolean;
}

export function EventStatsCards({ pendingCount, totalParticipants, loading }: EventStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-50 p-4 rounded-xl">
              <CalendarSearch className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? "..." : pendingCount}
              </p>
              <p className="text-gray-600">Хүлээгдэж буй эвентүүд</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? "..." : totalParticipants}
              </p>
              <p className="text-gray-600">Нийт оролцогчид</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 