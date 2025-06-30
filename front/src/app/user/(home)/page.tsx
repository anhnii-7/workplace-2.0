"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import  {motion} from "framer-motion"
export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/user/hobby");
  };

  return (
    <div className="relative h-full flex items-center justify-center bg-[#f5f8fd]">
    
      <div className="relative w-full h-full bg-[#eaf2fc] rounded-3xl shadow-lg flex items-center justify-around px-24 py-10 overflow-hidden border border-blue-100">

        <motion.div initial={{opacity:0 , x:-100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }}  className="relative z-20 flex-1 flex flex-col items-start justify-center pl-2 ml-[100px]">
          <h1 className="font-semibold  w-[481px] text-[36px]  text-gray-800 leading-tight mb-6 ">
             Өдөр болгон шинэ боломж
          </h1>
          <p className="font-normal w-[481px] text-[20px] text-gray-700 max-w-[600px] mb-8">
          Та зөвхөн ажил биш, сонирхлоороо холбогдож кино үзэх, ном унших, спорт эсвэл зүгээр л кофе уух гээд хоббигоороо дамжуулан хамт олонтойгоо ойртон дотносох боломжийг бид танд бүрдүүлж өгье.
          </p>
          <button
            className="w-[481px] h-12 bg-blue-100 rounded-md text-blue-600 text-lg font-medium hover:bg-blue-200 transition"
            onClick={handleStartClick}
          >
            Мөс хагалъя 
          </button>
        </motion.div>
        <motion.div initial={{opacity:0 , x:100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }} ><Image src={`/container.png`} width={500} height={700} className="w-[800px] h-[900px] mr-[100px]" alt="containerIMG"></Image></motion.div>
      </div>
    </div>
  );
}

