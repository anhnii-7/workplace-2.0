"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

export const ResBody = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [filteredNotif, setFilteredNotif] = useState<any[]>([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
    if (user?._id) {
      fetch(`/api/notification?to=${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          // Only show notifications where current user's ID is in the toUser array
          setNotifications(data.data.filter((n: any) => {
            // Check if toUser exists and is an array, then check if it includes the user ID
            if (n.toUser && Array.isArray(n.toUser)) {
              return n.toUser.some((userObj: any) => userObj._id === user._id);
            }
            // Fallback: check the original 'to' field if it's an array
            if (n.to && Array.isArray(n.to)) {
              return n.to.includes(user._id);
            }
            // Fallback: check if 'to' is a single value
            return n.to === user._id;
          }));
        });
    }
  }, []);

  useEffect(() => {
    setFilteredNotif(
      notifications.filter((n: any) => {
        if (n.type === 'Request') {
          // Only include if the first request's status is 'pending'
          return n.request && Array.isArray(n.request) && n.request[0]?.status === 'pending';
        }
        // For other types, include as before
        return true;
      })
    );
  }, [notifications]);

  console.log(notifications , "res")
  if (!currentUser) return null;
  // console.log(currentUser._id)

  return (
    <div className="grid grid-cols-2 gap-5">
      {notifications.length === 0 && (
        <div className="col-span-2 text-center text-gray-400">Ирсэн хүсэлт алга байна</div>
      )}
      {filteredNotif.map((notif) => {
        // Handle notif.to as array or single value
        if (Array.isArray(notif.to) ? notif.to.includes(currentUser._id) : currentUser._id === notif.to) {
          return <Card notif={notif} direction="recieved" key={notif._id} onRemove={() => setFilteredNotif((prev) => prev.filter((n) => n._id !== notif._id))} />;
        }
        return null;
      })}
    </div>
  );
};