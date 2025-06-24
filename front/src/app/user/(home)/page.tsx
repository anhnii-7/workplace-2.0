"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

// Floating decorative bubble component
const FloatingBubble = ({ delay = 0, duration = 8, size = 60, initialX = "50%", initialY = "50%" }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-blue-100/40 to-blue-200/20 backdrop-blur-sm border border-blue-100/30"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 15, -10, 0],
        scale: [1, 1.05, 0.95, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}


const RisingBubble = ({ delay = 0 }) => {
  const bubble = {
    size: Math.random() * 30 + 15,
    startX: Math.random() * 100,
    color: `hsl(${Math.random() * 60 + 200}, 60%, 85%)`,
    duration: Math.random() * 6 + 4,
    drift: (Math.random() - 0.5) * 100,
  }

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: bubble.size,
        height: bubble.size,
        background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8), ${bubble.color})`,
        boxShadow: `0 0 15px ${bubble.color}30`,
        left: `${bubble.startX}%`,
        bottom: -50,
      }}
      animate={{
        y: [0, -window.innerHeight - 100],
        x: [0, bubble.drift],
        opacity: [0, 0.6, 0.6, 0],
        scale: [0.5, 1, 1.1, 0.8],
      }}
      transition={{
        duration: bubble.duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    />
  )
}

export default function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating decorative bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingBubble delay={0} size={80} initialX="8%" initialY="15%" duration={7} />
        <FloatingBubble delay={1} size={60} initialX="92%" initialY="10%" duration={9} />
        <FloatingBubble delay={2} size={100} initialX="5%" initialY="60%" duration={8} />
        <FloatingBubble delay={3} size={70} initialX="95%" initialY="70%" duration={6} />
        <FloatingBubble delay={4} size={50} initialX="15%" initialY="85%" duration={10} />
        <FloatingBubble delay={5} size={90} initialX="85%" initialY="25%" duration={7} />
        <FloatingBubble delay={6} size={40} initialX="50%" initialY="5%" duration={8} />
        <FloatingBubble delay={7} size={65} initialX="25%" initialY="25%" duration={9} />
      </div>

      {/* Rising bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 8 }, (_, i) => (
          <RisingBubble key={`rising-${i}`} delay={i * 1.5} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header section with animation */}
        <motion.div
          className="flex flex-col items-center pt-[40px] pb-[70px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-semibold text-4xl leading-9 text-slate-800">Цайны цагийн хүлээлт нэмэгдлээ</h1>
          <p className="text-slate-700 font-normal text-xl leading-9">Өдөр болгон шинэ боломж ...</p>
        </motion.div>

        {/* Cards section with staggered animation */}
        <div className="grid grid-cols-2 gap-10 w-full px-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Card className="p-6 bg-blue-100/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src={"/placeholder.svg?height=300&width=487"}
                width={487}
                height={300}
                alt="advice"
                className="rounded-lg"
              />
              <div>
                <h2 className="text-slate-700 font-semibold text-2xl leading-8 mt-4">Зөвлөгөө</h2>
                <p className="text-slate-700 font-normal text-xl leading-7 mt-2">
                  Ажил дээрээ байнга л ямар нэгэн зүйл дээр зөвлөгөө, туслалцаа хэрэгтэй болдог. Ажлын асуудал ч бай,
                  хувийн зүйл ч бай. Манай платформ энэ хэрэгцээг тань хялбар, аюулгүй байдлаар хангах зорилготой.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-blue-400 hover:bg-blue-500 text-white flex justify-self-end mt-6">
                    Дэлгэрэнгүй
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Card className="p-6 bg-blue-100/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <h2 className="text-slate-700 font-semibold text-2xl leading-8">Хобби</h2>
                <p className="text-slate-700 font-normal text-xl leading-7 mt-2">
                  Та зөвхөн ажил биш, сонирхлоороо ч холбогдож. Кино үзэх, ном унших, спорт эсвэл зүгээр л кофе уух гээд
                  хоббигоороо дамжуулан хамт олонтойгоо ойртон дотносох боломжийг бид бүрдүүлсэн.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-blue-400 hover:bg-blue-500 text-white flex justify-self-end mt-6">
                    Дэлгэрэнгүй
                  </Button>
                </motion.div>
              </div>
               <Image src={"/hobby.webp"} width={487} height={300} alt="advice" />

            </Card>
          </motion.div>
        </div>
      </div>
</div>
  )
}
