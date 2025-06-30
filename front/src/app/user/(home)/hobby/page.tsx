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
    <div className="flex flex-col items-center pb-10">
      <p className="text-slate-800 text-2xl font-medium text-center py-4 px-6">
       Та дурын сэдвээ сонгоно уу
      </p>

      <div className="grid grid-cols-4 gap-5 mt-15">
        {loading ? (
          <div className="col-span-4 text-center py-8">
            <p>Хоббинууд ачаалж байна...</p>
          </div>
        ) : hobbies.length > 0 ? (
          hobbies.map((hobby) => {
            return (
              <Link href={`/user/hobby/${hobby._id}`} key={hobby._id}>
                <Card className="p-0 w-[267.5px] h-[288px] flex flex-col gap-3 box-border border border-[#B8D5ED]">
                  <div className=" w-full rounded-3xl h-[224px] bg-white overflow-hidden relative">
                    <Image
                      src={hobby?.image}
                      fill={true}
                      alt="sport"
                      className="place-self-center p-10"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="bg-slate-50 text-center rounded-b-2xl text-lg py-3 text-slate-800">
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