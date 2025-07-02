"use client";

import { Card } from "@/components/ui/card";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Hobby = {
  title: string;
  _id: string;
  image: string;
  users: string[];
};
export default function WishPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);


  const getHobbies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/hobby');
      const data = response.data as { success: boolean; data: Hobby[]; message?: string };
      console.log(response, "hobbies");
      if (data.success) {
        setHobbies(data.data);
      } else {
        console.error("Failed to fetch hobbies:", data.message);
        setHobbies([]);
      }
    } catch (error) {
      console.error("Error fetching hobbies:", error);
      setHobbies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHobbies();
  }, []);

  return (
    <div className="flex flex-col items-center pb-10 relative">
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
            className="w-[124px] h-[124px] absolute top-2 -right-22 z-10 " 
            alt="containerIMG"
            priority 
          />
              <Image 
            src={`https://res.cloudinary.com/dbtl9obi3/image/upload/v1751363263/green_z5wo1z.png`} 
            width={94} 
            height={100} 
            className="w-[94px] h-[100px] absolute top-20 -left-22 z-10 " 
            alt="containerIMG"
            priority 
          />
      <p className="text-slate-800 text-2xl font-medium text-center py-4 px-6">
       Та дурын сэдвээ сонгоно уу
      </p>

      <div className="grid grid-cols-4 gap-5 mt-15 z-20">
        {loading ? (
          <div className="col-span-4 text-center py-8">
            <p>Хоббинууд ачаалж байна...</p>
          </div>
        ) : hobbies.length > 0 ? (
          hobbies.map((hobby) => {
            return (
              <Link href={`/user/hobby/${hobby._id}`} key={hobby._id}>
                <Card className="p-0 w-[268px] h-[288px] flex flex-col gap-3 box-border border border-amber-200 z-30">
                  <div className=" w-full rounded-3xl h-[224px] bg-white overflow-hidden relative">
                    <Image
                      src={hobby?.image}
                      fill={true}
                      alt="sport"
                      className="place-self-center p-9"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="bg-amber-50 text-center rounded-b-2xl text-lg py-3 text-amber-900">
                    {hobby?.title}
                  </p>
                </Card>
              </Link>
            );
          })
        ) : (
          <div className="col-span-4 text-center py-8">
            <p className="text-gray-500">Одоогоор хобби байхгүй байна.</p>
          </div>
        )}
      </div>
    </div>

  );
}