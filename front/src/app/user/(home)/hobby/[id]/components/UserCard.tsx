import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "./types"

interface UserCardProps {
  user: User
  onSendRequest: (userId: string) => Promise<void>
  isLoading: boolean
}

export default function UserCard({ user, onSendRequest, isLoading }: UserCardProps) {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-3">
            <AvatarImage src={`/avatars/${user._id}.jpg`} alt={user.name} />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
              {user.lastName.slice(0, 1)}{user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 py-[6px] text-center w-full">
            <div className="w-full">
              <h3 className="font-semibold text-gray-800 text-lg">
                {user.lastName.slice(0, 1)}.{user.name}
              </h3>
            </div>

            <div className="w-full">
              <span className="text-sm font-normal text-gray-600">
                {user.departmentInfo?.jobTitleInfo?.title || "Алба байхгүй"}
              </span>
            </div>

            <div className="w-full">
              <span className="text-sm font-normal text-gray-500">
                {user.departmentInfo?.title || "Хэлтэс байхгүй"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full my-3">
            <Badge
              variant="secondary"
              className="flex w-full rounded-full py-1 px-3 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              {user.hobbyInfo?.title || "Сонирхол байхгүй"}
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full bg-blue-50 text-sm text-blue-600 border-blue-200 py-2 rounded-md hover:bg-blue-100 transition-colors"
            onClick={() => onSendRequest(user._id)}
            disabled={isLoading}
          >
            {isLoading ? "Илгээж байна..." : "Хүсэлт илгээх"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 