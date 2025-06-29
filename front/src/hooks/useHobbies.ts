"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { HobbyUser } from "@/app/user/(home)/components/HobbyUserCard";

export interface HobbyInfo {
  _id: string;
  title: string;
  image: string;
}

export function useHobbies() {
  const [hobbies, setHobbies] = useState<HobbyInfo[]>([]);
  const [users, setUsers] = useState<HobbyUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHobbies = async () => {
    try {
      const response = await axios.get('/api/hobby');
      setHobbies(response.data.data);
    } catch (error) {
      console.error("Error fetching hobbies:", error);
      setHobbies([]);
    }
  };

  const fetchUsersByHobby = async (hobbyId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/by-hobby?id=${hobbyId}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users by hobby:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (toUserId: string, currentUser: any) => {
    try {
      setLoading(true);
      const selectedUser = users.find(user => user._id === toUserId);
      
      if (!selectedUser?.availableSchedules || selectedUser.availableSchedules.length === 0) {
        return { 
          success: false, 
          message: "Энэ хэрэглэгчид уулзах боломжтой цаг алга байна" 
        };
      }

      const selectedDate = selectedUser.availableSchedules[0];
      
      const response = await axios.post("/api/request", {
        from: currentUser._id,
        to: toUserId,
        message: "Сонирхлоороо холбогдох хүсэлт илгээж байна",
        selectedSchedule: selectedDate,
        status: "pending", 
        isActive: true    
      });

      if (response.data.success) {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      console.error("Error creating request:", error);
      let errorMessage = "Хүсэлт илгээхэд алдаа гарлаа";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  return {
    hobbies,
    users,
    loading,
    fetchHobbies,
    fetchUsersByHobby,
    sendRequest,
  };
} 