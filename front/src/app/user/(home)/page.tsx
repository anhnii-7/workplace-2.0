"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { FeatureCard } from "./components/FeatureCard";

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      <div className="relative z-10">
        <PageHeader 
          title="Цайны цагийн хүлээлт нэмэгдлээ"
          subtitle="Өдөр болгон шинэ боломж ..."
        />

        <div className="grid grid-cols-2 gap-10 w-full px-10">
          <FeatureCard
            title="Зөвлөгөө"
            description="Ажил дээрээ байнга л ямар нэгэн зүйл дээр зөвлөгөө, туслалцаа хэрэгтэй болдог. Ажлын асуудал ч бай, хувийн зүйл ч бай. Манай платформ энэ хэрэгцээг тань хялбар, аюулгүй байдлаар хангах зорилготой."
            imageSrc="/advice.webp"
            imageAlt="advice"
            buttonText="Дэлгэрэнгүй"
            buttonHref="/user/advice"
            delay={0.3}
          />
          
          <FeatureCard
            title="Хобби"
            description="Та зөвхөн ажил биш, сонирхлоороо ч холбогдож. Кино үзэх, ном унших, спорт эсвэл зүгээр л кофе уух гээд хоббигоороо дамжуулан хамт олонтойгоо ойртон дотносох боломжийг бид бүрдүүлсэн."
            imageSrc="/hobby.webp"
            imageAlt="hobby"
            buttonText="Дэлгэрэнгүй"
            buttonHref="/user/hobby"
            imageFirst={true}
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
}
