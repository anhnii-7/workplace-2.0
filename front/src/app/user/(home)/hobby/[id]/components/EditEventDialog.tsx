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
} from "@/components/ui/dialog";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой"),
  eventType: z.string().min(1, "Төрөл заавал оруулна"),
  eventDate: z.string().min(1, "Өдөр заавал оруулна"),
  eventTime: z.string().min(1, "Цаг заавал оруулна"),
  eventLocation: z.string().min(1, "Хаяг заавал оруулна"),
  maxParticipants: z.string().min(1, "Хүний хязгаар заавал оруулна"),
  description: z.string().min(1, "Тайлбар заавал оруулна"),
});

interface Hobby {
  _id: string;
  title: string;
}

interface EventType {
  _id: string;
  title: string;
  image: string;
}

interface Event {
  _id: string;
  name: string;
  description: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  maxParticipants: number;
  participants: string[];
  organizer: string;
  eventType: EventType;
}

interface EditEventDialogProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
  onEventUpdated?: () => void;
}

export function EditEventDialog({ event, open, onClose, onEventUpdated }: EditEventDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name || "",
      eventType: event?.eventType?._id || "",
      eventDate: event ? event.eventDate.slice(0, 10) : "",
      eventTime: event?.eventTime || "",
      eventLocation: event?.eventLocation || "",
      maxParticipants: event?.maxParticipants?.toString() || "",
      description: event?.description || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: event?.name || "",
      eventType: event?.eventType?._id || "",
      eventDate: event ? event.eventDate.slice(0, 10) : "",
      eventTime: event?.eventTime || "",
      eventLocation: event?.eventLocation || "",
      maxParticipants: event?.maxParticipants?.toString() || "",
      description: event?.description || "",
    });
  }, [event, form]);

  useEffect(() => {
    axios.get<{ success: boolean; data: Hobby[] }>("/api/hobby").then((res) => {
      if (res.data.success) setHobbies(res.data.data);
    });
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!event) return;
    try {
      setIsLoading(true);
      const eventData = {
        ...data,
        maxParticipants: parseInt(data.maxParticipants),
        eventDate: new Date(data.eventDate).toISOString(),
      };
      const response = await axios.put(`/api/event/${event._id}`, eventData);
      const resData = response.data as { success: boolean; data: any; message?: string };
      if (resData.success) {
        toast.success("Эвент амжилттай засагдлаа!");
        onClose();
        onEventUpdated?.();
      } else {
        toast.error(resData.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Эвент засахад алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Эвент засах</DialogTitle>
          <DialogDescription>Эвентийн мэдээллийг засварлана уу.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Эвентийн нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Энд бичиж оруулна уу ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Төрөл</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Төрөл сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {hobbies.map((hobby) => (
                            <SelectItem key={hobby._id} value={hobby._id}>
                              {hobby.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Input placeholder="Энд бичиж оруулна уу ..." {...field} />
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
                      <Input placeholder="Асуух зүйл байвал > 99123489" {...field} />
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
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Цуцлах
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-400 text-white flex justify-center px-4 py-2 items-center w-[210px] rounded-md border-1 hover:bg-blue-500 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Засаж байна..." : "Хадгалах"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
} 