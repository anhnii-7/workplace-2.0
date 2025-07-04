"use client"

import { useEffect, useState } from "react"
import type { Hobby } from "../hobby/page"
import axios from "axios"
import Image from "next/image"
import { AddHobbyDialog } from "../components/addHobby"
import { Card } from "@/components/ui/card"

const MyHobby = () => {
  const [myHobbies, setMyHobbies] = useState<Hobby[]>([])
  const [allHobbies, setAllHobbies] = useState<Hobby[]>([])
  const [userId, setUserId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // localStorage-с userId болон hobby мэдээлэл авах
  useEffect(() => {
    const userRes = localStorage.getItem("currentUser")
    if (userRes) {
      const user = JSON.parse(userRes)
      console.log("localStorage user:", user)
      setUserId(user._id)

      // localStorage-д hobbies байвал myHobbies-д тохируулах
      if (user.hobbies && Array.isArray(user.hobbies)) {
        setMyHobbies(user.hobbies)
      }
    }
  }, [])

  // Хэрэглэгчийн hobby болон бүх hobby-г API-с авах
  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      try {
        // GET user hobby
        const userRes = await fetch(`/api/user/by-hobby/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const res = await userRes.json()
        const userHobbyData = res.data || res.hobbies || res
        console.log("User hobby data:", userHobbyData)

        let userHobbies: Hobby[] = []

        // Response format шалгах
        if (Array.isArray(userHobbyData) && userHobbyData.length > 0) {
          const userObj = userHobbyData[0]
          if (Array.isArray(userObj.hobbies)) {
            userHobbies = userObj.hobbies
          }
        }

        if (userHobbies.length > 0) {
          setMyHobbies(userHobbies)

          // localStorage шинэчлэх
          const currentUserStr = localStorage.getItem("currentUser")
          if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr)
            currentUser.hobbies = userHobbies
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
          }
        }

        // GET all hobbies
        const allHobbyRes = await axios.get("/api/hobby")
        const hobbyData = allHobbyRes.data

        let allFromAPI: Hobby[] = []
        if (Array.isArray(hobbyData?.data)) {
          allFromAPI = hobbyData.data
        } else if (Array.isArray(hobbyData?.hobbies)) {
          allFromAPI = hobbyData.hobbies
        } else if (Array.isArray(hobbyData)) {
          allFromAPI = hobbyData
        }

        if (allFromAPI.length > 0) {
          setAllHobbies(allFromAPI)
        }
      } catch (error) {
        console.error("Алдаа гарлаа:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId])

  // Хобби нэмэх үед дуудагдах callback
  const handleHobbiesAdded = async (addedHobbyIds: string[]) => {
    try {
      // API-аас хэрэглэгчийн шинэчлэгдсэн хоббиудыг авах
      const userRes = await fetch(`/api/user/by-hobby/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const res = await userRes.json()
      const userHobbyData = res.data || res.hobbies || res

      let updatedHobbies: Hobby[] = []
      if (Array.isArray(userHobbyData) && userHobbyData.length > 0) {
        const userObj = userHobbyData[0]
        if (Array.isArray(userObj.hobbies)) {
          updatedHobbies = userObj.hobbies
        }
      }

      // State шинэчлэх
      setMyHobbies(updatedHobbies)

      // localStorage шинэчлэх
      const currentUserStr = localStorage.getItem("currentUser")
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr)
        currentUser.hobbies = updatedHobbies
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        console.log("Updated localStorage with new hobbies:", updatedHobbies)
      }
    } catch (error) {
      console.error("Хобби шинэчлэхэд алдаа гарлаа:", error)
    }
  }

  if (isLoading) {
    return <div className="text-center p-10 text-slate-500">Хобби ачааллаж байна...</div>
  }

  return (
    <div className="flex flex-col items-center gap-10 relative">
          <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363331/greee-1_jcxmpi.png`} 
            width={171} 
            height={149} 
            className="w-[171px] h-[149px] absolute -bottom-20 left-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363216/green-2_ktnkvs.png`} 
            width={240} 
            height={240} 
            className="w-[70px] h-[94px] absolute -bottom-10 -right-5 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363167/red-ball_v73ekg.png`} 
            width={124} 
            height={124} 
            className="w-[124px] h-[124px] absolute top-10 -right-10 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363263/green_z5wo1z.png`} 
            width={94} 
            height={100} 
            className="w-[94px] h-[100px] absolute top-14 -left-10 z-10 " 
            alt="containerIMG"
            priority 
          />
      <h1 className="text-2xl font-normal text-slate-700 text-center py-[14px] px-[24px]">Миний хобби</h1>

      <div className="grid grid-cols-4 gap-5 w-full">
        {myHobbies.map((hobby) => (
          <Card  key={hobby._id} className="p-0 w-[268px] h-[288px] flex flex-col gap-3 box-border border border-amber-200 bg-amber-50 z-50">
            <div className=" w-full rounded-3xl h-[224px] bg-amber-50 overflow-hidden relative">
              <Image
                src={hobby?.image}
                fill={true}
                alt="sport"
                className="place-self-center p-9"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="bg-amber-100 text-center rounded-b-2xl text-lg py-3 text-amber-900">
              {hobby?.title}
            </p>
          </Card>
        ))}

        <AddHobbyDialog hobbies={allHobbies} userId={userId} onHobbiesAdded={handleHobbiesAdded} />
      </div>
    </div>
  )
}

export default MyHobby
