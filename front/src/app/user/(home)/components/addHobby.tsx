import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Hobby } from "../hobby/page"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export function DialogDemo({ hobbies }: { hobbies: Hobby[] }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div className="w-[202px] h-[288px] rounded-xl bg-slate-50 flex justify-center items-center">
                        <Plus className="text-slate-400" size={64} />
                    </div>
                </DialogTrigger>
                <DialogTitle></DialogTitle>
                <DialogContent>

                    <div className="grid grid-cols-4 gap-5 w-full">
                        {hobbies.map((hobby) => {
                            return (
                                <div key={hobby._id}>
                                    <Card className="p-0 w-[202px] h-[290px] flex flex-col gap-3 box-border">
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
                                </div>
                            );
                        })}
                    </div>

                </DialogContent>
            </form>
        </Dialog>
    )
}
