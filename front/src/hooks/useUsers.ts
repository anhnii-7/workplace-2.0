"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/app/user/(home)/components/UserCard";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/with-info");
      const data = response.data as { success: boolean; data: User[] };

      if (data.success && data.data) {
        setUsers(data.data);
      } else {
        console.error("Unexpected response format:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = (currentUser: any) => {
    if (currentUser && users.length > 0) {
      const filtered = users
        .filter((user) =>
          currentUser.role === "mentor"
            ? user.role === "new"
            : user.role === "mentor"
        )
        .filter((user) =>
          `${user.name} ${user.lastName} ${user.departmentInfo?.title}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
    fetchUsers,
    filterUsers,
  };
} 