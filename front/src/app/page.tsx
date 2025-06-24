"use client"
import Image from "next/image";
import { useEffect } from "react";
export default function Home() {
   useEffect(() => {
    const bubblesContainer = document.querySelector('.bubbles');
    if (bubblesContainer) {
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = `${40 + Math.random() * 60}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubblesContainer.appendChild(bubble);
      }
    }
  }, []);
  return (
      <div className="relative min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center ">

        <div className="bubbles absolute inset-0 w-full h-full pointer-events-none z-0"></div>
        
        <div className="w-full max-w-[1069px] flex flex-col gap-[56px] items-center text-center relative z-1 px-4 absolute bottom-50 ">
          <h1 className="font-semibold text-[32px] md:text-[48px] text-gray-800 leading-tight">
            Цайны цагийн хүлээлт нэмэгдлээ
          </h1>
          
          <p className="font-normal text-[16px] text-center max-w-[814px] text-gray-600 leading-relaxed px-4">
           Байгууллагын ажилчид хоорондын харилцааг сайжруулан бие биеэ таньж мэдэн, хамтдаа өсөн дэвших боломжийг бүрдүүлэхэд тань бид танд тусалъя
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <button className="w-[196.5px] h-[40px] border-2 border-blue-400 rounded-md bg-white text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
              Заавар видео
            </button>
            <button className="w-[196.5px] h-[40px] bg-blue-400 text-white rounded-md hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300">
              Эхлэх
            </button>
          </div>
        </div>
        
                    <Image
                    width={419}
                    height={419}
                    src={"/content.png"}
                    alt="home-1"
                    className="absolute bottom-1 left-10"
                  />
                   <Image
                    width={396}
                    height={396}
                    src={"/content4.png"}
                    alt="home-1"
                    className="absolute bottom-40 left-140"
                  />
                   <Image
                    width={364}
                    height={364}
                    src={"/content3.png"}
                    alt="home-1"
                      className="absolute bottom-1 left-250"
                  />
                   <Image
                    width={362}
                    height={362}
                    src={"/content2.png"}
                    alt="home-1"
                    className="absolute bottom-20 right-23"
                  />
                  </div>
  
  );
}
