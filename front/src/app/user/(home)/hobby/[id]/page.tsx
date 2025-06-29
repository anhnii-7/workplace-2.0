"use client"

import { useState } from "react"
import HobbyFilter from "./components/HobbyFilter"
import UserCard from "./components/UserCard"
import SuccessDialog from "./components/SuccessDialog"
import { useHobbyData } from "./hooks/useHobbyData"

export default function HobbyInsertPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const {
    users,
    hobbies,
    loadingUsers,
    showSuccessDialog,
    setShowSuccessDialog,
    handleSendRequest
  } = useHobbyData()

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Сонирхлоороо нэгдэн цагийг хамтдаа өнгөрүүлцгээе
        </h1>

        <HobbyFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hobbies={hobbies}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-3">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onSendRequest={handleSendRequest}
              isLoading={loadingUsers[user._id]}
            />
          ))}
        </div>
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  )
}