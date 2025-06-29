"use client"

import { useEffect, useState } from "react";
import { Hobby } from "../hobby/page";
import axios from "axios";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { DialogDemo } from "../components/addHobby";
import { AddEventCard } from "../components/AddEventCard";

const myHobby = () => {
    const [myHobbies, setMyHobbies] = useState<Hobby[]>([]);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);

    const getMyHobbies = async () => {
        try {
            const res = localStorage.getItem("currentUser") as string;
            if (res) {
                const user = JSON.parse(res);
                setMyHobbies(user.hobbyInfo || []);
            }
        } catch (error) {
            console.error("Error getting user hobbies:", error);
            setMyHobbies([]);
        }
    };
    
    const getHobbies = async () => {
        try {
            const response = await axios.get('/api/hobby');
            const data = response.data as { success: boolean; data: Hobby[]; message?: string };
            console.log(data, "hobby response");
            
            if (data.success) {
                setHobbies(data.data);
            } else {
                console.error("Failed to fetch hobbies:", data.message);
                setHobbies([]);
            }
        } catch (error) {
            console.error("Error fetching hobbies:", error);
            setHobbies([]);
        }
    }

    useEffect(() => {
        getMyHobbies();
        getHobbies();
    }, []);

    return (
        <div>
            <div className="text-center py-10 flex justify-between items-center w-full max-w-5xl mx-auto">
                <h1 className="text-slate-800 text-3xl font-semibold">
                    Олуулаа илүү хөгжилтэй
                </h1>
                <div className="ml-auto">
                    <AddEventCard onClick={() => {}} />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5 w-[868px] place-self-center items-center py-24">
                {myHobbies.length > 0 ? (
                    myHobbies.map((hobby) => {
                        return (
                            <Card className="p-0 w-[202px] h-[288px] flex flex-col gap-3" key={hobby._id}>
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
                        );
                    })
                ) : (
                    <div className="col-span-4 text-center py-8">
                        <p className="text-gray-500">Та одоогоор хобби сонгоогүй байна.</p>
                    </div>
                )}
                <DialogDemo hobbies={hobbies} />
            </div>
        </div>
    )
}

export default myHobby