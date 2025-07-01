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
      <motion.div initial={{opacity:0 , y:-100}}  animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.5 }}   className="w-[1090px] h-[742px] bg-amber-50 rounded-[24px] flex justify-around items-center relative z-20">
               <motion.div 
    initial={{ opacity: 0, scale: -0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4 ,delay:0.4,
    }}
  >
    <Image 
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363331/greee-1_jcxmpi.png`} 
      width={171} 
      height={149} 
      className="w-[171px] h-[149px] absolute -bottom-20 left-10 z-10 " 
      alt="containerIMG"
      priority 
    />
        <Image 
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363216/green-2_ktnkvs.png`} 
      width={240} 
      height={240} 
      className="w-[70px] h-[94px] absolute bottom-20 -right-10 z-10 " 
      alt="containerIMG"
      priority 
    />
        <Image 
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363167/red-ball_v73ekg.png`} 
      width={124} 
      height={124} 
      className="w-[124px] h-[124px] absolute -top-15 -right-10 z-10 " 
      alt="containerIMG"
      priority 
    />
        <Image 
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363263/green_z5wo1z.png`} 
      width={94} 
      height={100} 
      className="w-[94px] h-[100px] absolute -top-14 -left-10 z-10 " 
      alt="containerIMG"
      priority 
    />
  </motion.div>
        <div>      
            <motion.div   className="relative z-20 flex flex-col gap-[40px]  justify-center items-start">
            <motion.h1 initial={{opacity:0 , x:-100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5  ,delay:0.3}} className="font-medium  w-[481px] h-[40px] text-[36px]  text-gray-800 leading-tight 
            ">
              Өдөр болгон шинэ боломж
            </motion.h1>
            <motion.p initial={{opacity:0 , x:-100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5  ,delay:0.4}} className="font-normal text-[20px] leading-[140%] w-[491px]">
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
  className="w-[481px] h-[40px] bg-amber-100 rounded-[6px] text-amber-900  text-sm font-medium hover:bg-amber-200 transition"
  onClick={handleStartClick}
>
  Мөс хагалъя 
</motion.button>
          </motion.div>
          </div>
        <div className=" relative z-10 flex items-center justify-center"> 
          <motion.div initial={{opacity:0 , x:100}}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 ,delay:0.4}} >
            <Image src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751359678/container_hsdb2q.png`} width={423} height={499} className="w-[423px] h-[499px] " alt="containerIMG"></Image>
        </motion.div>
        <motion.div 
    initial={{ opacity: 0, scale: -0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4 ,delay:0.4,
    }}
  >
    <Image 
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751359461/naraoyunbat_mzoucc.png`} 
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
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751359638/aricin_mozkbc.png`} 
      width={223} 
      height={223} 
      className="w-[223px] h-[223px] absolute top-24 -right-20" 
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
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751359609/oyujam_arn6gy.png`} 
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
      src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751359575/arijam_sg1cqd.png`} 
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

    );
  }

