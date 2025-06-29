"use client";
import { useEffect, useState } from "react";
import { Hobby } from "../hobby/page";
import axios from "axios";
import Image from "next/image";
import { AddHobbyDailog } from "../components/addHobby";

const MyHobby = () => {
  const [myHobbies, setMyHobbies] = useState<Hobby[]>([]);
  const [allHobbies, setAllHobbies] = useState<Hobby[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Эхлээд userId-г авна
  useEffect(() => {
    const userRes = localStorage.getItem("currentUser");
    if (userRes) {
      const user = JSON.parse(userRes);
      setMyHobbies(user.hobbyInfo || []);
      setUserId(user._id);
    }
  }, []);

  // Хэрэглэгчийн хоббиуд болон бүх хоббиудыг авах
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Хэрэглэгчийн хоббиудыг авах
        const userHobbiesResponse = await axios.get(`/api/user/by-hobby/${userId}`);
        let userHobbyData = userHobbiesResponse.data;

        if (userHobbyData && typeof userHobbyData === "object" && !Array.isArray(userHobbyData)) {
          userHobbyData = userHobbyData.hobbies || userHobbyData.data || userHobbyData;
        }

        // Бүх хоббиудыг авах
        const allHobbiesResponse = await axios.get('/api/hobby');
        let allHobbyData = allHobbiesResponse.data;

        if (allHobbyData && typeof allHobbyData === "object") {
          if (allHobbyData.success && allHobbyData.data) {
            allHobbyData = allHobbyData.data;
          } else if (allHobbyData.hobbies && Array.isArray(allHobbyData.hobbies)) {
            allHobbyData = allHobbyData.hobbies;
          }
        }

        // State-г шинэчлэх
        if (Array.isArray(userHobbyData)) {
          setMyHobbies(userHobbyData);
        } else {
          console.error("User hobbies data is not an array:", userHobbyData);
        }

        if (Array.isArray(allHobbyData)) {
          setAllHobbies(allHobbyData);
        } else {
          console.error("All hobbies data is not an array:", allHobbyData);
        }

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Хобби нэмэгдсэний дараа currentUser-г шинэчлэх callback функц
  const handleHobbiesAdded = async (addedHobbyIds: string[]) => {
    try {
      if (!Array.isArray(allHobbies)) {
        console.error("allHobbies is not an array:", allHobbies);
        return;
      }

      // Нэмэгдсэн хоббиудын мэдээллийг allHobbies array-с олох
      const addedHobbies = allHobbies.filter(hobby => 
        hobby && hobby._id && addedHobbyIds.includes(hobby._id)
      );
      
      console.log("Added hobbies:", addedHobbies);
      
      // myHobbies state-г шинэчлэх
      setMyHobbies(prev => [...prev, ...addedHobbies]);
      
      // localStorage дахь currentUser-г шинэчлэх
      const userRes = localStorage.getItem("currentUser");
      if (userRes) {
        const user = JSON.parse(userRes);
        user.hobbyInfo = [...(user.hobbyInfo || []), ...addedHobbies];
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Error updating user hobbies:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-10">
        <h1 className="text-4xl font-semibold text-slate-700 text-center p-4">
          Миний хобби
        </h1>
        <div className="flex justify-center">
          <p className="text-slate-500">Хобби ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      <h1 className="text-4xl font-semibold text-slate-700 text-center p-4">
        Миний хобби
      </h1>
      <div className="grid grid-cols-4 gap-5 w-full ">
        {myHobbies.map((hobby) => (
          <div
            key={hobby._id}
            className="w-[267px] h-[288px] flex flex-col gap-3 border-1 border-[#B8D5ED] rounded-3xl bg-[#E5EFF8] box-border justify-between"
          >
            <div className="w-[140px] h-[224px] flex items-center place-self-center">
              <Image
                src={hobby.image}
                alt={hobby.title}
                style={{ objectFit: "contain" }}
                width={140}
                height={224}
              />
            </div>
            <p className="bg-slate-50 text-center leading-7 rounded-b-3xl text-lg py-3 text-slate-800 font-medium">
              {hobby.title}
            </p>
          </div>
        ))}

        {/* Хобби нэмэх диалог */}
        <AddHobbyDailog 
          hobbies={allHobbies}
          userId={userId}
          onHobbiesAdded={handleHobbiesAdded}
        />
      </div>
    </div>
  );
};

export default MyHobby;