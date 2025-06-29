"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Event } from "@/app/user/(home)/components/EventCard";
import { Hobby } from "@/app/user/(home)/components/HobbyFilter";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  // Fetch all hobbies
  const getHobbies = async () => {
    try {
      const response = await axios.get('/api/hobby');
      const data = response.data as { success: boolean; data: Hobby[]; message?: string };
      if (data.success) {
        setHobbies(data.data);
      } else {
        setHobbies([]);
      }
    } catch (error) {
      setHobbies([]);
    }
  };

  // Fetch all events
  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/event');
      const data = response.data as { success: boolean; data: Event[]; message?: string };
      if (data.success) {
        setEvents(data.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Join/Leave event
  const handleJoinEvent = async (eventId: string, currentUser: any) => {
    if (!currentUser) {
      alert("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }
    try {
      const response = await axios.patch(`/api/event/${eventId}`, {
        action: joinedEvents.includes(eventId) ? "leave" : "join",
        userName: currentUser.name
      });
      if (response.data.success) {
        setJoinedEvents((prev) =>
          prev.includes(eventId)
            ? prev.filter((id) => id !== eventId)
            : [...prev, eventId]
        );
        getEvents();
      } else {
        alert(response.data.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Эвентэд нэгдэхэд алдаа гарлаа");
    }
  };

  // Filter events by hobby
  const getFilteredEvents = (selectedHobby: string) => {
    return selectedHobby === "all"
      ? events
      : events.filter(event => event.eventType._id === selectedHobby);
  };

  // Count pending events
  const getPendingEventsCount = () => {
    return events.filter(e => e.participants.length < e.maxParticipants).length;
  };

  useEffect(() => {
    getHobbies();
    getEvents();
  }, []);

  return {
    events,
    hobbies,
    loading,
    joinedEvents,
    getEvents,
    getHobbies,
    handleJoinEvent,
    getFilteredEvents,
    getPendingEventsCount,
  };
} 