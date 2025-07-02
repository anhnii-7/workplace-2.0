"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Check } from "lucide-react"
import type { Hobby } from "../hobby/page"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

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
      toast.error("Хоббиудыг ачааллахад алдаа гарлаа")
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
      toast.error("Хэрэглэгчийн хобби ачааллахад алдаа гарлаа")
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
      // console.log("Dialog opened, refreshing user hobbies for userId:", userId)
      getUserHobbies(userId)
      setSelectedHobbies([]) // Reset selection when dialog opens
    }
  }, [isOpen, userId])

  // Хобби сонгох/сонгохгүй байх
  const toggleHobby = (hobbyId: string) => {
    // console.log("Toggling hobby:", hobbyId)

    // Хэрэглэгчийн одоо байгаа хобби эсэхийг шалгах
    const isAlreadyOwned = userExistingHobbies.some((hobby) => hobby._id === hobbyId)

    if (isAlreadyOwned) {
      // console.log("Cannot select - user already has this hobby")
      toast.warning("Та энэ хоббиг аль хэдийн нэмсэн байна")
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
      toast.warning("Хобби сонгоно уу!")
      return
    }

    if (!userId) {
      toast.error("Хэрэглэгч олдсонгүй. Дахин нэвтэрнэ үү.")
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
        toast.error(`Зарим хобби нэмэхэд алдаа гарлаа: ${errors.join(", ")}`)
      } else {
        // Амжилттай нэмэгдсэн
        console.log("Hobbies added successfully")
        const addedCount = selectedHobbies.length
        toast(
          <div className="w-[330px] h-[76px] p-0 m-0 rounded-lg bg-whgite " >
            <p className="place-self-center text-lg text-slate-800 font-medium p-6 whitespace-nowrap leading-7">Таны хобби амжилттай нэмэгдлээ</p>
            <div className="absolute inset-x-0 top-1 flex justify-between w-full px-1">
              <img src="/star.svg" className="w-[23px] h-[28px]" />
              <img src="/star.svg" className="w-[23px] h-[28px]" />
            </div>
          </div>)
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
      toast.error("Хобби нэмэхэд алдаа гарлаа!")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-[268px] h-[288px] flex flex-col gap-3 rounded-3xl bg-amber-50 box-border items-center justify-center">
        <Plus className="text-slate-400" size={64} />
        <p className="text-slate-500 font-medium">Хобби ачааллаж байна...</p>
      </div>
    )
  }

  // Хобби байхгүй бол
  if (allHobbies.length === 0 && !loading) {
    return (
      <div className="w-[268px] h-[288px] flex flex-col gap-3 rounded-3xl bg-amber-50 box-border items-center justify-center">
        <Plus className="text-amber-900" size={64} />
        <p className="text-amber-500 font-medium">Хобби олдсонгүй</p>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="w-[268px] h-[288px] flex flex-col gap-2 rounded-3xl bg-amber-50 box-border items-center justify-center cursor-pointer hover:bg-amber-50 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="text-amber-900" size={64} />
          <p className="text-amber-900 font-medium">Хобби нэмэх</p>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[988px] max-w-[90vw] box-border flex flex-col justify-between max-h-[90vh] bg-white">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex justify-center text-slate-700 text-2xl font-semibold leading-8 py-1">
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
                  className={`w-[220px] h-[288px] flex flex-col gap-3 border-2 rounded-3xl box-border justify-between transition-all relative ${isAlreadyOwned
                    ? "border-amber-200/60 bg-white opacity-60 cursor-not-allowed"
                    : isSelected
                      ? "border-amber-200 bg-amber-50 cursor-pointer shadow-md"
                      : "border-amber-200 bg-white cursor-pointer hover:border-[#FFDA95] hover:bg-amber-1-0 hover:shadow-sm"
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
                    className={`text-center leading-7 rounded-b-3xl text-lg py-3 font-medium transition-colors ${isAlreadyOwned
                      ? "bg-amber-100/60 text-amber-900/60"
                      : isSelected
                        ? "bg-amber-200 text-amber-900"
                        : "bg-amber-50 text-amber-900"
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
              className={`w-full px-4 rounded-md py-3 text-sm font-medium leading-5 transition-colors ${isLoading
                ? "bg-amber-200 cursor-not-allowed text-amber-900"
                : selectedHobbies.length > 0 && userId
                  ? "bg-amber-200  text-amber-900 cursor-pointer"
                  : "bg-amber-50 text-slate-200 cursor-not-allowed"
                }`}
              onClick={handleSaveHobbies}
              disabled={isLoading || selectedHobbies.length === 0 || !userId}
            >
              {isLoading
                ? "Нэмж байна..."
                : !userId
                  ? "Хэрэглэгч олдсонгүй"
                  : selectedHobbies.length > 0
                    ? `Нэмэх`
                    : "Нэмэх"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}