import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { User, HobbyInfo } from "../components/types"

export function useHobbyData() {
  const router = useRouter()
  const params = useParams()
  const [users, setUsers] = useState<User[]>([])
  const [hobbies, setHobbies] = useState<HobbyInfo[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState<Record<string, boolean>>({})
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`/api/user/by-hobby?id=${params.id}`)
        const currentUserString = localStorage.getItem("currentUser")
        
        if (!currentUserString) {
          router.push("/login")
          return
        }
        
        const currentUser = JSON.parse(currentUserString)
        setCurrentUser(currentUser)
        
        // Type assertion for response data
        const responseData = response.data as { data: User[] }
        const filteredUsers = responseData.data.filter((user: User) => user._id !== currentUser._id)
        setUsers(filteredUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("Хэрэглэгчдийн мэдээлэл ачаалахад алдаа гарлаа")
      }
    }
    
    getUsers()
  }, [params.id, router])

  useEffect(() => {
    const getHobbies = async () => {
      try {
        const response = await axios.get('/api/hobby')
        // Type assertion for response data
        const responseData = response.data as { data: HobbyInfo[] }
        setHobbies(responseData.data)
      } catch (error) {
        console.error("Error fetching hobbies:", error)
        toast.error("Сонирхлын мэдээлэл ачаалахад алдаа гарлаа")
      }
    }
    
    getHobbies()
  }, [])

  const handleSendRequest = async (toUserId: string) => {
    setLoadingUsers(prev => ({ ...prev, [toUserId]: true }))
    
    try {
      await axios.post("/api/request", {
        from: currentUser._id,
        to: toUserId,
        message: "Сонирхлоороо холбогдох хүсэлт илгээж байна",
        status: "pending", 
        isActive: true    
      })
      
      setShowSuccessDialog(true)
      
      setTimeout(() => {
        setShowSuccessDialog(false)
      }, 3000)

    } catch (error: any) {
      console.error("Error creating request:", error)
      let errorMessage = "Хүсэлт илгээхэд алдаа гарлаа"
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
      })
    } finally {
      setLoadingUsers(prev => ({ ...prev, [toUserId]: false }))
    }
  }

  return {
    users,
    hobbies,
    currentUser,
    isLoading,
    loadingUsers,
    showSuccessDialog,
    setShowSuccessDialog,
    handleSendRequest
  }
} 