"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Users } from "lucide-react";
import { AddEventDialog } from "../hobby/[id]/components/AddEventDailog";
import { EventCard } from "../components/EventCard";
import { SummaryCard } from "../components/SummaryCard";
import { AddEventCard } from "../components/AddEventCard";
import { HobbyFilter } from "../components/HobbyFilter";
import { useEvents } from "@/hooks/useEvents";

export default function EventPage() {
  const [selectedHobby, setSelectedHobby] = useState<string>("all");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeEmployeeCount, setActiveEmployeeCount] = useState<number>(12); // hardcoded for now
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogHobby, setAddDialogHobby] = useState<string>("");

  const {
    events,
    hobbies,
    loading,
    joinedEvents,
    getEvents,
    handleJoinEvent,
    getFilteredEvents,
    getPendingEventsCount,
  } = useEvents();

  useEffect(() => {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      setCurrentUser(JSON.parse(currentUserString));
    }
  }, []);

  const filteredEvents = getFilteredEvents(selectedHobby);
  const pendingEventsCount = getPendingEventsCount();

  // Add event dialog logic
  const openAddDialog = () => {
    setAddDialogOpen(true);
    setAddDialogHobby(selectedHobby === "all" ? "" : selectedHobby);
  };

  const handleJoinLeave = (eventId: string) => {
    handleJoinEvent(eventId, currentUser);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Ачааллаж байна...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f8fafc]">
      <div className="text-center py-10 flex justify-between items-center w-full max-w-5xl mx-auto">
        <h1 className="text-slate-800 text-3xl font-semibold">
          Олуулаа илүү хөгжилтэй
        </h1>
        <div className="ml-auto">
          <AddEventCard onClick={openAddDialog} />
        </div>
      </div>
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Filter and summary cards */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
          <HobbyFilter
            selectedHobby={selectedHobby}
            onHobbyChange={setSelectedHobby}
            hobbies={hobbies}
          />
          <div className="flex flex-1 gap-4 justify-end">
            <SummaryCard
              icon={CalendarDays}
              value={pendingEventsCount}
              label="Хүлээгдэж буй эвентүүд"
              bgColor="bg-orange-50"
              iconColor="text-orange-400"
              textColor="text-orange-500"
              labelColor="text-orange-900"
            />
            <SummaryCard
              icon={Users}
              value={activeEmployeeCount}
              label="Идэвхтэй байгаа ажилчид"
              bgColor="bg-green-50"
              iconColor="text-green-400"
              textColor="text-green-500"
              labelColor="text-green-900"
            />
          </div>
        </div>
        {/* Event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {/* Event cards */}
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isJoined={joinedEvents.includes(event._id)}
              onJoinLeave={handleJoinLeave}
            />
          ))}
        </div>
        {/* AddEventDialog with hobby selection if needed */}
        {addDialogOpen && (
          <AddEventDialog
            hobbyId={addDialogHobby}
            currentUser={currentUser}
            onEventCreated={() => { getEvents(); setAddDialogOpen(false); }}
            requireHobbySelection={selectedHobby === "all"}
            allHobbies={hobbies}
            onHobbyChange={setAddDialogHobby}
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
          />
        )}
      </div>
    </div>
  );
}
