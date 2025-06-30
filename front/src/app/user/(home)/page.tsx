"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/user/hobby");
  };
  // bg-[#eaf2fc]
  return (
    <div className="relative h-full flex items-center justify-center bg-[#f5f8fd]">
      {/* Main Card-like Container */}
      <div className="relative w-full h-full bg-[#eaf2fc] rounded-3xl shadow-lg flex items-center justify-between px-24 py-10 overflow-hidden border border-blue-100">
        {/* Circles for background */}
        {/* <div className="absolute rounded-full bg-gradient-to-br from-[#e3efff] to-[#c7e0fa] w-[320px] h-[320px] right-[60px] top-[-60px] z-0" />
        <div className="absolute rounded-full bg-gradient-to-br from-[#e3efff] to-[#c7e0fa] w-[220px] h-[220px] right-[260px] top-[60px] z-0" />
        <div className="absolute rounded-full bg-gradient-to-br from-[#e3efff] to-[#c7e0fa] w-[180px] h-[180px] right-[120px] top-[260px] z-0" />
        <div className="absolute rounded-full bg-gradient-to-br from-[#e3efff] to-[#c7e0fa] w-[160px] h-[160px] right-[340px] top-[300px] z-0" /> */}

        {/* Images inside circles */}
        {/* <div className="absolute w-[160px] h-[160px] rounded-full overflow-hidden flex items-center justify-center right-[80px] top-[10px] z-10 border-4 border-white shadow-md">
          <Image src="/content.png" alt="img1" width={160} height={160} className="object-cover" />
        </div>
        <div className="absolute w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center right-[270px] top-[100px] z-10 border-4 border-white shadow-md">
          <Image src="/content4.png" alt="img2" width={120} height={120} className="object-cover" />
        </div>
        <div className="absolute w-[110px] h-[110px] rounded-full overflow-hidden flex items-center justify-center right-[120px] top-[300px] z-10 border-4 border-white shadow-md">
          <Image src="/content3.png" alt="img3" width={110} height={110} className="object-cover" />
        </div>
        <div className="absolute w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center right-[340px] top-[340px] z-10 border-4 border-white shadow-md">
          <Image src="/content2.png" alt="img4" width={120} height={120} className="object-cover" />
        </div> */}

        {/* Text and button */}
        <div className="relative z-20 flex-1 flex flex-col items-start justify-center pl-2">
          <h1 className="font-semibold  w-[481px] text-4xl md:text-5xl text-gray-800 leading-tight mb-6">
             Өдөр болгон шинэ боломж
          </h1>
          <p className="font-normal w-[481px] text-lg text-gray-700 max-w-[600px] mb-8">
          Та зөвхөн ажил биш, сонирхлоороо холбогдож кино үзэх, ном унших, спорт эсвэл зүгээр л кофе уух гээд хоббигоороо дамжуулан хамт олонтойгоо ойртон дотносох боломжийг бид танд бүрдүүлж өгье.
          </p>
          <button
            className="w-[481px] h-12 bg-blue-100 rounded-md text-blue-600 text-lg font-medium hover:bg-blue-200 transition"
            onClick={handleStartClick}
          >
            Мөс хагалъя 
          </button>
        </div>
      </div>
    </div>
  );
}

