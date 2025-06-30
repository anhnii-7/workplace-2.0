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
          <DialogTitle className="text-center text-xl text-slate-700 font-normal mt-15">Та мөс хагалах анхны алхмаа амжилттай хийлээ. <br></br>Уулзалтанд тань амжилт хүсье</DialogTitle>
          <DialogDescription className="text-center">
            {/* <Image src={`/alertpinguin.png`} alt="image" width={320} height={320} className="absolute bottom-0 self-center"></Image> */}
            <Image src={`/alertpinguin.png`} alt="image" width={320} height={320} style={{objectFit: "fill"}} className="absolute inset-x-0 bottom-0 mx-auto"></Image>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
} 