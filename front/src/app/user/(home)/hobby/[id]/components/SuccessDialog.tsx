import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[556px] h-[459px] bg-[#DAD8F6]">
        <DialogHeader>
          <DialogTitle className="relative">
            <div>
              <div className="text-center text-xl text-slate-700 font-normal mt-15">
                Та мөс хагалах анхны алхмаа амжилттай хийлээ.
              </div>
              <p className="text-center text-lg text-slate-700 font-normal">Уулзалтанд тань амжилт хүсье</p>
            </div>
            <div className="absolute inset-x-0 top-11 flex justify-between w-full">
              <img src="/star.svg" className="w-[23px] h-[28px]" />
              <img src="/star.svg" className="w-[23px] h-[28px]" />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            <Image src={`/ice-cube.gif`} alt="image" width={320} height={320} style={{ objectFit: "fill" }} className="absolute inset-x-0 bottom-0 mx-auto"></Image>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
} 