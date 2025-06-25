"use client"

import { useEffect, useState } from "react";
import { Hobby } from "../hobby/page";
import axios from "axios";
import { BASE_URl } from "@/app/contants";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DialogDemo } from "../components/addHobby";

const myHobby = () => {
    const [myHobbies, setMyHobbies] = useState<Hobby[]>([]);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);


    const getMyHobbies = async () => {
        const res = localStorage.getItem("currentUser") as string;
        setMyHobbies(JSON.parse(res).hobbyInfo)
    };
    
    const getHobbies = async () => {
        const response = await axios.get(`${BASE_URl}/hobby`);
        setHobbies(response.data)
        console.log(response.data, "hobby response")
    }
    // console.log(hobbies, "hobbies");
    useEffect(() => {
        getMyHobbies();
        getHobbies();
    }, []);
    return (
        <div>
            <h1 className="text-4xl font-semibold text-slate-700 text-center p-4">Миний хобби</h1>
            <div className="grid grid-cols-4 gap-5 w-[868px] place-self-center items-center py-24">
                {myHobbies.map((hobby) => {
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
                })}
                <DialogDemo hobbies={hobbies} />
            </div>
        </div>
    )
}

export default myHobby