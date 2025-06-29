"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/app/user/(home)/components/UserCard";

export interface Request {
  _id: string;
  from: string | User;
  to: string | User;
  message: string;
  selectedSchedule: string;
  status: "pending" | "accepted" | "declined";
  isActive: boolean;
  mentorNotes?: string;
  meetingDate?: string;
  meetingLocation?: string;
  createdAt: string;
}

export function useRequests() {
  const [requests, setRequests] = useState<{
    sent: Request[];
    received: Request[];
  }>({ sent: [], received: [] });
  const [loading, setLoading] = useState(false);

  const fetchRequests = async (userId: string) => {
    try {
      const response = await axios.get("/api/request", {
        params: {
          userId,
          type: "all",
        },
      });
      const data = response.data as { success: boolean; data: Request[]; message?: string };
      
      if (data.success && data.data) {
        setRequests({
          sent: data.data.filter(
            (req: Request) => typeof req.from !== "string" && req.from._id === userId
          ),
          received: data.data.filter(
            (req: Request) => typeof req.to !== "string" && req.to._id === userId
          ),
        });
      } else {
        console.error("Failed to fetch requests:", data.message);
        setRequests({ sent: [], received: [] });
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests({ sent: [], received: [] });
    }
  };

  const createRequest = async (
    toUserId: string,
    message: string,
    selectedDate: string,
    fromUserId: string
  ) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/request", {
        from: fromUserId,
        to: toUserId,
        message,
        selectedSchedule: selectedDate,
        status: "pending",
        isActive: true,
      });

      if (response.data.success) {
        await fetchRequests(fromUserId);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      console.error("Error creating request:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Хүсэлт илгээхэд алдаа гарлаа" 
      };
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (
    requestId: string,
    status: string,
    notes?: string,
    userId?: string
  ) => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/request/${requestId}`, {
        status,
        mentorNotes: notes,
      });

      if (response.data.success && userId) {
        await fetchRequests(userId);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      console.error("Error updating request:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Хүсэлт шинэчлэхэд алдаа гарлаа" 
      };
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = async (requestId: string, userId?: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/request/${requestId}`);

      if (response.data.success && userId) {
        await fetchRequests(userId);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      console.error("Error canceling request:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Хүсэлт цуцлахдаа алдаа гарлаа" 
      };
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const extractDuration = (text: string) => {
    const match = text.match(/(\d+)\s*(жил|сар)/);
    return match ? match[0] : text;
  };

  return {
    requests,
    loading,
    fetchRequests,
    createRequest,
    updateRequest,
    cancelRequest,
    formatDate,
    extractDuration,
  };
} 