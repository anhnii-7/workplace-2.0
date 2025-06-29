"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

export const ResBody = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
    if (user?._id) {
      fetch(`/api/notification?to=${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          // Only show notifications where to === current user
          setNotifications(data.data.filter((n: any) => n.to === user._id));
        });
    }
  }, []);
  console.log(notifications[3] , "res")
  if (!currentUser) return null;
  console.log(notifications)
  return (
    <div className="grid grid-cols-2 gap-5 mx-[60px]">
      {notifications.length === 0 && (
        <div className="col-span-2 text-center text-gray-400">Ирсэн хүсэлт алга байна</div>
      )}
      {notifications.map((notif) => {
        if (currentUser._id === notif.to) {
          return <Card notif={notif} direction="recieved" key={notif._id}/>;
        }
        return null;
      })}
    </div>
  );
};