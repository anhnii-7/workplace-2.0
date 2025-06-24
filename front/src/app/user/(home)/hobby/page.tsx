"use client";

import { BASE_URl } from "@/app/contants";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Hobby = {
  title: string,
  _id: string
  image: string
}
export default function WishPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  // console.log(baseUrl, "baseUrl")
  const getHobbies = async () => {
    const response = await axios.get(`${baseUrl}/hobby`);
    console.log(response, "hobbies")
    setHobbies(response.data)
  }
console.log(hobbies, "hobbies")
  useEffect(() => {
    getHobbies();
  }, [])

  console.log(baseUrl, "base")
  return (
    <div className="px-10 h-full w-full ">
    
        <div className="text-center py-10">
          <h1 className="text-slate-800 text-3xl font-semibold">
            Цайны цагаараа хоббигоороо нэгдье
          </h1>
          <p className="text-slate-600 text-2xl font-medium ">
            Та өөрийн дуртай ямар ч сэдвээ ажлынхантайгаа хуваалцах боломжтой.
          </p>
        </div>

        <div className="flex flex-col h-screen">
          <h2 className="text-slate-800 text-2xl font-normal pb-10">
            Та өөрийн дуртай хэдэн ч сэдвийг сонгосон болно ☺️
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {
              hobbies.map((hobby) => {
                return (
                  <Link href={`/user/hobby/${hobby._id}`} key={hobby._id}>
                     <Card className="p-0 w-[202px] h-[288px] flex flex-col gap-3">
                      <div className=" w-full rounded-3xl h-[224px] bg-white overflow-hidden relative">
                        <Image
                          src={hobby.image}
                          fill={true}
                          alt="sport"
                          className="place-self-center"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <p className="bg-slate-50 text-center rounded-b-2xl text-lg py-3 text-slate-800">
                        {hobby.title}
                      </p>
                    </Card>
                  </Link>
                );
              })
            }

          </div>
        </div>
  
    </div>
  );
}
