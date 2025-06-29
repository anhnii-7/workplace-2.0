"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

// ✅ Updated schema to match backend requirements
const formSchema = z.object({
  name: z.string().min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой"),
  eventType: z.string().min(1, "Төрөл заавал оруулна"),
  eventDate: z.string().min(1, "Өдөр заавал оруулна"),
  eventTime: z.string().min(1, "Цаг заавал оруулна"),
  eventLocation: z.string().min(1, "Хаяг заавал оруулна"),
  maxParticipants: z.string().min(1, "Хүний хязгаар заавал оруулна"),
  description: z.string().min(1, "Тайлбар заавал оруулна"),
});

interface AddEventDialogProps {
  hobbyId: string;
  onEventCreated?: () => void;
  currentUser?: any;
  requireHobbySelection?: boolean;
  allHobbies?: { _id: string; title: string }[];
  onHobbyChange?: (hobbyId: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddEventDialog({
  hobbyId,
  onEventCreated,
  currentUser,
  requireHobbySelection = false,
  allHobbies = [],
  onHobbyChange,
  open,
  onOpenChange,
}: AddEventDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState(hobbyId || "");
  const controlledOpen = open !== undefined && onOpenChange !== undefined;

  // Update selectedHobby if hobbyId prop changes
  useEffect(() => {
    setSelectedHobby(hobbyId || "");
  }, [hobbyId]);

  // Notify parent if hobby changes
  useEffect(() => {
    if (onHobbyChange) onHobbyChange(selectedHobby);
  }, [selectedHobby]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      eventType: selectedHobby,
      eventDate: "",
      eventTime: "",
      eventLocation: "",
      maxParticipants: "",
      description: "",
    },
  });

  // Update eventType in form if selectedHobby changes
  useEffect(() => {
    form.setValue("eventType", selectedHobby);
  }, [selectedHobby]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (requireHobbySelection && !selectedHobby) {
      toast.error("Хобби сонгоно уу");
      return;
    }
    try {
      setIsLoading(true);
      
      let user = currentUser;
      if (!user) {
        const currentUserString = localStorage.getItem("currentUser");
        if (!currentUserString) {
          toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
          return;
        }
        user = JSON.parse(currentUserString);
      }
      
      const eventData = {
        ...data,
        eventType: selectedHobby,
        maxParticipants: parseInt(data.maxParticipants),
        eventDate: new Date(data.eventDate).toISOString(),
        organizer: user.name,
      };

      const response = await axios.post('/api/event', eventData);
      const resData = response.data as { success: boolean; data: any; message?: string };
      
      if (resData.success) {
        toast.success("Эвент амжилттай үүсгэгдлээ!");
        setIsOpen(false);
        form.reset();
        onEventCreated?.();
      } else {
        toast.error(resData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Эвент үүсгэхэд алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={controlledOpen ? open : isOpen} onOpenChange={controlledOpen ? onOpenChange! : setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-400 text-white flex justify-between px-4 py-2 items-center w-[210px] rounded-md border-1 hover:bg-blue-500 cursor-pointer">
          Эвент үүсгэх
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Шинэ эвент үүсгэх</DialogTitle>
          <DialogDescription>
            Хамт олонтойгоо цагийг илүү зугаатай өнгөрөөх боломжийг бүтээцгээе
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {requireHobbySelection && (
                <div>
                  <label className="block mb-1 font-medium">Хобби сонгох <span className="text-red-500">*</span></label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedHobby}
                    onChange={e => setSelectedHobby(e.target.value)}
                    required
                  >
                    <option value="">-- Хобби сонгох --</option>
                    {allHobbies.map(hobby => (
                      <option value={hobby._id} key={hobby._id}>{hobby.title}</option>
                    ))}
                  </select>
                </div>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Эвентийн нэр</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Энд бичиж оруулна уу ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Өдөр</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цаг</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Хаяг</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Энд бичиж оруулна уу ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Хүний хязгаар</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="20" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тайлбар</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Асуух зүйл байвал > 99123489"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-6">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex px-4 py-2 items-center w-[210px] rounded-md border-1 border-blue-400 hover:bg-blue-50 cursor-pointer justify-center"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Цуцлах
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-400 text-white flex justify-center px-4 py-2 items-center w-[210px] rounded-md border-1 hover:bg-blue-500 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Үүсгэж байна..." : "Эвент үүсгэх"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
