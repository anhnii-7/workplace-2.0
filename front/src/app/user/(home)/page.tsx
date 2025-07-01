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
    <div className="flex items-center justify-center h-screen">
      <motion.div initial={{opacity:0 , y:-100}}  animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.5 }}   className="w-[1090px] h-[742px] bg-[#eaf2fc] rounded-[24px] flex justify-around items-center ">
        <div>      
            <motion.div   className="relative z-20 flex flex-col gap-[40px]  justify-center items-start">
            <motion.h1 initial={{opacity:0 , x:-100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5  ,delay:0.3}} className="font-medium  w-[481px] h-[40px] text-[36px]  text-gray-800 leading-tight 
            ">
              Өдөр болгон шинэ боломж
            </motion.h1>
            <motion.p initial={{opacity:0 , x:-100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5  ,delay:0.4}} className="font-normal text-[20px] leading-10 w-[481px]">
            Та зөвхөн ажил биш, сонирхлоороо холбогдож кино үзэх, ном унших, спорт эсвэл зүгээр л кофе уух гээд хоббигоороо дамжуулан хамт олонтойгоо ойртон дотносох боломжийг бид танд бүрдүүлж өгье.
            </motion.p>
           <motion.button
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ 
    delay: 0.5,
    type: "spring",
    stiffness: 500,
    damping: 10 ,
    mass: 1
  }}
  className="w-[481px] h-12 bg-blue-100 rounded-md text-blue-600 text-lg font-medium hover:bg-blue-200 transition"
  onClick={handleStartClick}
>
  Мөс хагалъя 
</motion.button>
          </motion.div>
          </div>
        <div className=" relative z-10 flex items-center justify-center"> 
          <motion.div initial={{opacity:0 , x:100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 ,delay:0.4}} >
            <Image src={`/content-bg.png`} width={423} height={499} className="w-[423px] h-[499px] " alt="containerIMG"></Image>
        </motion.div>
        <motion.div 
    initial={{ opacity: 0, scale: -0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4 ,delay:0.4,
    }}
  >
    <Image 
      src={`/oyunbatnara.png`} 
      width={240} 
      height={240} 
      className="w-[240px] h-[240px] absolute -top-20 -left-10" 
      alt="containerIMG"
      priority 
    />
  </motion.div>
        <motion.div 
    initial={{ opacity: 0, scale: -0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4 ,delay:0.5,
    }}
  >
    <Image 
      src={`/chingunari.png`} 
      width={223} 
      height={223} 
      className="w-[223px] h-[223px] absolute top-30 -right-30" 
      alt="containerIMG"
      priority 
    />
  </motion.div>
        <motion.div 
    initial={{ opacity: 0, scale: -0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4 ,delay:0.6,
    }}
  >
    <Image 
      src={`/jamyaoyunbat.png`} 
      width={180} 
      height={180} 
      className="w-[180px] h-[180px] absolute bottom-30 left-4" 
      alt="containerIMG"
      priority 
    />
  </motion.div>
        <motion.div 
    initial={{ opacity: 0, scale: -0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4 ,delay:0.7,
    }}
  >
    <Image 
      src={`/jamyaari.png`} 
      width={220} 
      height={220} 
      className="w-[220px] h-[220px] absolute -bottom-16 right-8" 
      alt="containerIMG"
      priority 
    />
  </motion.div>
        </div>
      </motion.div>
    </div>
      // <div className="relative h-full flex items-center justify-center bg-[#f5f8fd ">
      
      //   <div className="relative w-full h-full bg-[#eaf2fc] rounded-3xl shadow-lg flex items-center lg:flex-col xl:flex-row justify-around px-24 py-10 overflow-hidden border border-blue-100">

          // <motion.div initial={{opacity:0 , x:-100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }}  className="relative z-20 flex-1 flex flex-col items-start justify-center pl-2 xl:ml-[10px]">
          //   <h1 className="font-semibold  w-[481px] text-[36px]  text-gray-800 leading-tight mb-6 ">
          //      Өдөр болгон шинэ боломж
          //   </h1>
          //   <p className="font-normal w-[481px] text-[22px] text-gray-700 max-w-[600px] mb-8">
          //   Та зөвхөн ажил биш, сонирхлоороо холбогдож кино үзэх, ном унших, спорт эсвэл зүгээр л кофе уух гээд хоббигоороо дамжуулан хамт олонтойгоо ойртон дотносох боломжийг бид танд бүрдүүлж өгье.
          //   </p>
          //   <button
          //     className="w-[481px] h-12 bg-blue-100 rounded-md text-blue-600 text-lg font-medium hover:bg-blue-200 transition"
          //     onClick={handleStartClick}
          //   >
          //     Мөс хагалъя 
          //   </button>
          // </motion.div>
          // <motion.div initial={{opacity:0 , x:100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }} ><Image src={`/container.png`} width={500} height={700} className="w-[800px] h-[600px] xl:mr-[40px] lg:w-[600px] lg:h-[500px]" alt="containerIMG"></Image></motion.div>
      //   </div>
      // </div>
    );
  }

