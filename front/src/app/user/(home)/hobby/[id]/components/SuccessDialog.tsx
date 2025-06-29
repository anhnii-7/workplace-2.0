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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Амжилттай</DialogTitle>
          <DialogDescription className="text-center">
            <Image src={`/alertpinguin.png`} alt="image" width={400} height={400}></Image>
            Хүсэлт амжилттай илгээгдлээ!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
} 