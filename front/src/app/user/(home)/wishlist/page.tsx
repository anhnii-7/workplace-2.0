"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BackgroundBubbles from "../components/BackgroundBuble";
import { WishlistCard } from "../components/WishlistCard";
import { PageHeader } from "../components/PageHeader";

export default function WishlistPage() {
  const handleMeet = () => {
    // Handle meet functionality
    console.log("Meet clicked");
  };

  return (
    <div className="p-10 h-screen w-full">
      <BackgroundBubbles />
      
      <PageHeader 
        title="Хүлээгдэж буй хүсэлтүүд"
        animated={false}
        className="my-30"
      />

      <div className="grid gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WishlistCard
            user={{
              name: "Hulan",
              lastName: "Jargal",
              department: "Хөгжүүлэлтийн хэлтэс",
              jobTitle: "Дизайнер",
              avatar: "AG"
            }}
            onMeet={handleMeet}
            className="p-3 relative"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Select>
            <SelectTrigger className="w-[180px] bg-indigo-50">
              <SelectValue placeholder="Хүний тоо" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
