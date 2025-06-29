"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Check } from "lucide-react";
import { Hobby } from "../hobby/page";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface DialogDemoProps {
  hobbies: Hobby[];
  userId?: string;
  onHobbiesAdded?: (addedHobbies: string[]) => void;
}

export function AddHobbyDailog({
  hobbies: propsHobbies,
  userId: propUserId,
  onHobbiesAdded,
}: DialogDemoProps) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(false);
  const [userExistingHobbies, setUserExistingHobbies] = useState<string[]>([]);

  // API-аас бүх хоббиудыг авах функц
  const getAllHobbies = async () => {
    try {
      setLoading(true);
      console.log("Fetching all hobbies from /api/hobby...");

      const response = await axios.get("/api/hobby");
      console.log("Hobbies API response:", response.data);

      let hobbyData = response.data;

      // Response format шалгах
      if (hobbyData && typeof hobbyData === "object") {
        if (hobbyData.success && hobbyData.data) {
          // { success: true, data: Hobby[] } format
          setHobbies(hobbyData.data);
        } else if (Array.isArray(hobbyData)) {
          // Шууд array format
          setHobbies(hobbyData);
        } else if (hobbyData.hobbies && Array.isArray(hobbyData.hobbies)) {
          // { hobbies: Hobby[] } format
          setHobbies(hobbyData.hobbies);
        } else {
          console.error("Unexpected hobbies data format:", hobbyData);
          setHobbies([]);
        }
      } else {
        console.error("Invalid hobbies data:", hobbyData);
        setHobbies([]);
      }
    } catch (error) {
      console.error("Error fetching all hobbies:", error);
      setHobbies([]);
    } finally {
      setLoading(false);
    }
  };

  // Props хоббиуд ба API хоббиудыг харьцуулах
  const filterAvailableHobbies = (
    allHobbies: Hobby[],
    userHobbies: Hobby[]
  ) => {
    if (!Array.isArray(allHobbies) || !Array.isArray(userHobbies)) {
      return allHobbies || [];
    }

    const userHobbyIds = userHobbies.map((hobby) => hobby._id);
    return allHobbies.filter((hobby) => !userHobbyIds.includes(hobby._id));
  };

  // Эхний useEffect - хоббиудыг авах
  useEffect(() => {
    console.log("Props hobbies:", propsHobbies);
    console.log("Props hobbies length:", propsHobbies?.length);

    // Хэрэв props-оос ирсэн hobbies нь хэрэглэгчийн одоо байгаа хоббиуд бол
    // API-аас бүх хоббиудыг авах хэрэгтэй
    if (!propsHobbies || propsHobbies.length === 0) {
      console.log("No props hobbies, fetching all hobbies from API");
      getAllHobbies();
    } else {
      // Props-оос ирсэн хоббиуд нь хэрэглэгчийн одоо байгаа хоббиуд байж болно
      // Тиймээс API-аас бүх хоббиудыг авах
      console.log("Props hobbies exist, but fetching all hobbies to compare");
      getAllHobbies();
    }
  }, []);

  // UserId тохируулах
  useEffect(() => {
    if (propUserId) {
      setUserId(propUserId);
    } else if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [propUserId]);

  // Хэрэглэгчийн одоо байгаа хоббиудыг авах
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRes = localStorage.getItem("currentUser");
      if (userRes) {
        const user = JSON.parse(userRes);
        const existingHobbyIds =
          user.hobbyInfo?.map((hobby: Hobby) => hobby._id) || [];
        console.log("User existing hobby IDs:", existingHobbyIds);
        setUserExistingHobbies(existingHobbyIds);
      }
    }
  }, []);

  // Хобби сонгох/сонгохгүй байх
  const toggleHobby = (hobbyId: string) => {
    if (userExistingHobbies.includes(hobbyId)) {
      return;
    }

    setSelectedHobbies((prev) =>
      prev.includes(hobbyId)
        ? prev.filter((id) => id !== hobbyId)
        : [...prev, hobbyId]
    );
  };

  // Сонгосон хоббиудыг хадгалах
  const handleSaveHobbies = async () => {
    if (selectedHobbies.length === 0) {
      alert("Хобби сонгоно уу!");
      return;
    }

    if (!userId) {
      alert("Хэрэглэгч олдсонгүй. Дахин нэвтэрнэ үү.");
      return;
    }

    setIsLoading(true);

    try {
      const promises = selectedHobbies.map((hobbyId) =>
        fetch("/api/user/by-hobby", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            hobbyId: hobbyId,
          }),
        })
      );

      const responses = await Promise.all(promises);

      // Алдаа шалгах
      const errors = [];
      for (let i = 0; i < responses.length; i++) {
        if (!responses[i].ok) {
          const errorData = await responses[i].json();
          errors.push(
            errorData.message || `Хобби ${i + 1} нэмэхэд алдаа гарлаа`
          );
        }
      }

      if (errors.length > 0) {
        console.error("Errors adding hobbies:", errors);
        alert(`Зарим хобби нэмэхэд алдаа гарлаа: ${errors.join(", ")}`);
      } else {
        
      }

      // Callback дуудах
      if (onHobbiesAdded) {
        onHobbiesAdded(selectedHobbies);
      }

      // Reset
      setSelectedHobbies([]);
      setIsOpen(false);
    } catch (error) {
      console.error("Network error:", error);
      
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-[267px] h-[288px] flex flex-col gap-3 rounded-3xl bg-slate-50 box-border items-center justify-center">
        <Plus className="text-slate-400" size={64} />
        <p className="text-slate-500 font-medium">Хобби ачааллаж байна...</p>
      </div>
    );
  }

  // Хэрэв hobbies хоосон эсвэл байхгүй бол
  if (!hobbies || hobbies.length === 0) {
    return (
      <div className="w-[267px] h-[288px] flex flex-col gap-3 rounded-3xl bg-slate-50 box-border items-center justify-center">
        <Plus className="text-slate-400" size={64} />
        <p className="text-slate-500 font-medium">Хобби олдсонгүй</p>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="w-[267px] h-[288px] flex flex-col gap-3 rounded-3xl bg-slate-50 box-border items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="text-slate-400" size={64} />
          <p className="text-slate-500 font-medium">Хобби нэмэх</p>
        </div>
      </DialogTrigger>

      <DialogContent className="h-[1084px] w-[988px] box-border flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-slate-700 text-2xl font-semibold leading-8">
            Өөрийн дуртай хэдэн ч төрлийн сонирхлыг сонгох боломжтой
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-5 w-full overflow-y-auto max-h-[800px] px-2">
          {hobbies.length === 0 ? (
            <div className="col-span-4 text-center py-10">
              <p className="text-slate-500">Хобби олдсонгүй</p>
            </div>
          ) : (
            hobbies.map((hobby) => {
              const isSelected = selectedHobbies.includes(hobby._id);
              const isAlreadyOwned = userExistingHobbies.includes(hobby._id);

              return (
                <div
                  className={`w-[220px] h-[288px] flex flex-col gap-3 border-2 rounded-3xl box-border justify-between transition-all relative ${
                    isAlreadyOwned
                      ? "border-[#B8D5ED] bg-[#E5EFF8]  opacity-60 cursor-not-allowed"
                      : isSelected
                      ? "border-[#B8D5ED] bg-[#E5EFF8] cursor-pointer"
                      : "border-[#B8D5ED] bg-white cursor-pointer hover:border-blue-400 hover:bg-[#E5EFF8]"
                  }`}
                  key={hobby._id}
                  onClick={() => toggleHobby(hobby._id)}
                >
                  <div className="w-[140px] h-[224px] flex items-center place-self-center">
                    <Image
                      src={hobby.image}
                      alt={hobby.title}
                      className={`place-self-center ${
                        isAlreadyOwned ? "" : ""
                      }`}
                      style={{ objectFit: "contain" }}
                      width={140}
                      height={224}
                    />
                  </div>

                  <div>
                    <p
                      className={`text-center leading-7 rounded-b-3xl text-lg py-3 font-medium transition-colors ${
                        isAlreadyOwned
                          ? "bg-gray-100 text-slate-800 "
                          : isSelected
                          ? "bg-blue-100 "
                          : "bg-slate-50 text-slate-800"
                      }`}
                    >
                      {hobby.title}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <DialogFooter className="w-full">
          <div className="w-full space-y-3">
            <button
              className={`w-full mt-6 px-4 rounded-md cursor-pointer py-3 text-white text-sm font-medium leading-5 transition-colors ${
                isLoading
                  ? "bg-blue-500 cursor-not-allowed"
                  : selectedHobbies.length > 0 && userId
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-500 text-white opacity-60 cursor-not-allowed"
              }`}
              onClick={handleSaveHobbies}
              disabled={isLoading || selectedHobbies.length === 0 || !userId}
            >
              {isLoading
                ? "Нэмж байна..."
                : !userId
                ? "Хэрэглэгч олдсонгүй"
                : "Нэмэх"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
