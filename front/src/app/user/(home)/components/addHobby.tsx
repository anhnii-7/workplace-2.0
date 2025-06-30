"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Check } from "lucide-react"
import type { Hobby } from "../hobby/page"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"

interface DialogDemoProps {
  hobbies: Hobby[]
  userId?: string
  onHobbiesAdded?: (addedHobbies: string[]) => void
}

export function AddHobbyDialog({ hobbies: propsHobbies, userId: propUserId, onHobbiesAdded }: DialogDemoProps) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [userId, setUserId] = useState<string>("")
  const [allHobbies, setAllHobbies] = useState<Hobby[]>([])
  const [userExistingHobbies, setUserExistingHobbies] = useState<Hobby[]>([])
  const [loading, setLoading] = useState(false)

  // API-аас бүх хоббиудыг авах функц
  const getAllHobbies = async () => {
    try {
      setLoading(true)
      console.log("Fetching all hobbies from /api/hobby...")
      const response = await axios.get("/api/hobby")
      console.log("Hobbies API response:", response.data)

      const hobbyData = response.data
      let hobbies: Hobby[] = []

      // Response format шалгах
      if (hobbyData?.success && Array.isArray(hobbyData.data)) {
        hobbies = hobbyData.data
      } else if (Array.isArray(hobbyData)) {
        hobbies = hobbyData
      } else if (Array.isArray(hobbyData?.hobbies)) {
        hobbies = hobbyData.hobbies
      }

      setAllHobbies(hobbies)
      console.log("All hobbies loaded:", hobbies)
    } catch (error) {
      console.error("Error fetching all hobbies:", error)
      setAllHobbies([])
    } finally {
      setLoading(false)
    }
  }

  // Хэрэглэгчийн одоо байгаа хоббиудыг авах
  const getUserHobbies = async (userId: string) => {
    try {
      console.log("Fetching user hobbies for userId:", userId)

      // localStorage-с эхлээд авах
      const currentUserStr = localStorage.getItem("currentUser")
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr)
        if (currentUser.hobbies && Array.isArray(currentUser.hobbies)) {
          setUserExistingHobbies(currentUser.hobbies)
          console.log("User hobbies from localStorage:", currentUser.hobbies)
          return
        }
      }

      // API-аас авах
      const response = await axios.get(`/api/user/by-hobby/${userId}`)
      const userHobbyData = response.data
      console.log("User hobby API response:", userHobbyData)

      let extractedHobbies: Hobby[] = []

      // API response format шалгах
      if (Array.isArray(userHobbyData) && userHobbyData.length > 0) {
        const userObj = userHobbyData[0]
        if (Array.isArray(userObj.hobbies)) {
          extractedHobbies = userObj.hobbies
        }
      } else if (userHobbyData?.data && Array.isArray(userHobbyData.data)) {
        extractedHobbies = userHobbyData.data
      } else if (userHobbyData?.hobbies && Array.isArray(userHobbyData.hobbies)) {
        extractedHobbies = userHobbyData.hobbies
      }

      console.log("Extracted user hobbies:", extractedHobbies)
      setUserExistingHobbies(extractedHobbies)

      // localStorage шинэчлэх
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr)
        currentUser.hobbies = extractedHobbies
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
      }
    } catch (error) {
      console.error("Error fetching user hobbies:", error)
      setUserExistingHobbies([])
    }
  }

  // UserId тохируулах
  useEffect(() => {
    if (propUserId) {
      setUserId(propUserId)
    } else if (typeof window !== "undefined") {
      const currentUserStr = localStorage.getItem("currentUser")
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr)
        if (currentUser._id) {
          setUserId(currentUser._id)
        }
      }
    }
  }, [propUserId])

  // Хоббиудыг авах
  useEffect(() => {
    getAllHobbies()
  }, [])

  // Dialog нээгдэх үед хэрэглэгчийн хоббиудыг шинэчлэх
  useEffect(() => {
    if (isOpen && userId) {
      console.log("Dialog opened, refreshing user hobbies for userId:", userId)
      getUserHobbies(userId)
      setSelectedHobbies([]) // Reset selection when dialog opens
    }
  }, [isOpen, userId])

  // Хобби сонгох/сонгохгүй байх
  const toggleHobby = (hobbyId: string) => {
    console.log("Toggling hobby:", hobbyId)

    // Хэрэглэгчийн одоо байгаа хобби эсэхийг шалгах
    const isAlreadyOwned = userExistingHobbies.some((hobby) => hobby._id === hobbyId)

    if (isAlreadyOwned) {
      console.log("Cannot select - user already has this hobby")
      return // Хэрэглэгчийн одоо байгаа хобби бол сонгох боломжгүй
    }

    setSelectedHobbies((prev) => {
      const newSelection = prev.includes(hobbyId) ? prev.filter((id) => id !== hobbyId) : [...prev, hobbyId]
      console.log("New selection:", newSelection)
      return newSelection
    })
  }

  // Сонгосон хоббиудыг хадгалах
  const handleSaveHobbies = async () => {
    if (selectedHobbies.length === 0) {
      alert("Хобби сонгоно уу!")
      return
    }

    if (!userId) {
      alert("Хэрэглэгч олдсонгүй. Дахин нэвтэрнэ үү.")
      return
    }

    setIsLoading(true)

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      // Хобби нэмэх API дуудлагууд
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
        }),
      )

      // Хобби дээр хэрэглэгч нэмэх
      const hobbyUpdatePromises = selectedHobbies.map(async (hobbyId) => {
        try {
          const res = await fetch(`/api/hobby/${hobbyId}`)
          const hobby = await res.json()
          const existingUsers = hobby.users || []

          return fetch(`/api/hobby/${hobbyId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              users: [...existingUsers, currentUser._id],
            }),
          })
        } catch (error) {
          console.error(`Error updating hobby ${hobbyId}:`, error)
          return null
        }
      })

      const [userResponses, hobbyResponses] = await Promise.all([
        Promise.all(promises),
        Promise.all(hobbyUpdatePromises),
      ])

      // Алдаа шалгах
      const errors = []
      for (let i = 0; i < userResponses.length; i++) {
        if (!userResponses[i].ok) {
          const errorData = await userResponses[i].json()
          errors.push(errorData.message || `Хобби ${i + 1} нэмэхэд алдаа гарлаа`)
        }
      }

      if (errors.length > 0) {
        console.error("Errors adding hobbies:", errors)
        alert(`Зарим хобби нэмэхэд алдаа гарлаа: ${errors.join(", ")}`)
      } else {
        // Амжилттай нэмэгдсэн
        console.log("Hobbies added successfully")
      }

      // Callback дуудах
      if (onHobbiesAdded) {
        onHobbiesAdded(selectedHobbies)
      }

      // Хэрэглэгчийн хоббиудыг дахин авах
      await getUserHobbies(userId)

      // Reset
      setSelectedHobbies([])
      setIsOpen(false)
    } catch (error) {
      console.error("Network error:", error)
      alert("Хобби нэмэхэд алдаа гарлаа!")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-[267px] h-[288px] flex flex-col gap-3 rounded-3xl bg-slate-50 box-border items-center justify-center">
        <Plus className="text-slate-400" size={64} />
        <p className="text-slate-500 font-medium">Хобби ачааллаж байна...</p>
      </div>
    )
  }

  // Хобби байхгүй бол
  if (allHobbies.length === 0 && !loading) {
    return (
      <div className="w-[267px] h-[288px] flex flex-col gap-3 rounded-3xl bg-slate-50 box-border items-center justify-center">
        <Plus className="text-slate-400" size={64} />
        <p className="text-slate-500 font-medium">Хобби олдсонгүй</p>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="w-[267px] h-[288px] flex flex-col gap-2 rounded-3xl bg-slate-50 box-border items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="text-slate-400" size={64} />
          <p className="text-slate-500 font-medium">Хобби нэмэх</p>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[988px] max-w-[90vw] box-border flex flex-col justify-between max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-slate-700 text-2xl font-semibold leading-8">
            Өөрийн дуртай хэдэн ч төрлийн сонирхлыг сонгох боломжтой
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-5 w-full overflow-y-auto max-h-[500px] px-2">
          {allHobbies.length === 0 ? (
            <div className="col-span-4 text-center py-10">
              <p className="text-slate-500">Хобби олдсонгүй</p>
            </div>
          ) : (
            allHobbies.map((hobby) => {
              const isSelected = selectedHobbies.includes(hobby._id)
              const isAlreadyOwned = userExistingHobbies.some((userHobby) => userHobby._id === hobby._id)

              return (
                <div
                  key={hobby._id}
                  className={`w-[220px] h-[288px] flex flex-col gap-3 border-2 rounded-3xl box-border justify-between transition-all relative ${
                    isAlreadyOwned
                      ? "border-[#B8D5ED] bg-[#E5EFF8] opacity-60 cursor-not-allowed"
                      : isSelected
                        ? "border-blue-400 bg-blue-50 cursor-pointer shadow-md"
                        : "border-gray-200 bg-white cursor-pointer hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
                  }`}
                  onClick={() => toggleHobby(hobby._id)}
                >
                  <div className="w-[140px] h-[224px] flex items-center place-self-center">
                    <Image
                      src={hobby.image || "/placeholder.svg"}
                      alt={hobby.title}
                      className="place-self-center"
                      style={{ objectFit: "contain" }}
                      width={140}
                      height={224}
                    />
                  </div>

                  <p
                    className={`text-center leading-7 rounded-b-3xl text-lg py-3 font-medium transition-colors ${
                      isAlreadyOwned
                        ? "bg-gray-100 text-gray-500"
                        : isSelected
                          ? "bg-blue-100 text-slate-800"
                          : "bg-slate-50 text-slate-800"
                    }`}
                  >
                    {hobby.title}
                  </p>

              

               

                  
                </div>
              )
            })
          )}
        </div>

        <DialogFooter className="w-full">
          <div className="w-full space-y-3">
         
            <button
              className={`w-full px-4 rounded-md py-3 text-sm font-medium leading-5 transition-colors ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed text-white"
                  : selectedHobbies.length > 0 && userId
                    ? "bg-blue-400  text-white cursor-pointer"
                    : "bg-blue-200 text-white cursor-not-allowed"
              }`}
              onClick={handleSaveHobbies}
              disabled={isLoading || selectedHobbies.length === 0 || !userId}
            >
              {isLoading
                ? "Нэмж байна..."
                : !userId
                  ? "Хэрэглэгч олдсонгүй"
                  : selectedHobbies.length > 0
                    ? `Hэмэх`
                    : "Hэмэх"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
