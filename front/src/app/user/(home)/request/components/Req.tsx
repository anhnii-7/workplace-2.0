"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCheck, MapPin, User } from "lucide-react";
import Card from "./Card";

export const ReqBody = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
    if (user?._id) {
      fetch(`/api/notification?from=${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          // Only show notifications where from === current user
          const notificationsArr = Array.isArray(data.data) ? data.data : [];
          setNotifications(notificationsArr.filter((n: any) => n.from === user._id));
        });
    }
  }, []);
  console.log(notifications , "req")
  if (!currentUser) return null;

  return (
    <div className="grid grid-cols-2 gap-6">
      {notifications.length === 0 && (
        <div className="col-span-2 text-center text-gray-400">Илгээсэн хүсэлт алга байна</div>
      )}
      {notifications.map((notif, index) => {
        if (currentUser._id === notif.from) {
          return <Card notif={notif} direction="sent" key={notif._id+index}/>;
        }
        return null;
      })}
    </div>
  );
};
