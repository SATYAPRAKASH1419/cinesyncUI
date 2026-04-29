import { Navbar } from "@/components/layout/Navbar";
import { BentoHero } from "@/components/dashboard/BentoHero";
import { ActiveRooms } from "@/components/dashboard/ActiveRooms";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { FriendsOnline } from "@/components/dashboard/FriendsOnline";
import { WhatToWatch } from "@/components/dashboard/WhatToWatch";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="container py-8 max-w-[1400px]">
            <BentoHero />

            <div className="space-y-8">
              <ActiveRooms />
              <WhatToWatch />
              <UpcomingEvents />
            </div>
          </div>
        </main>

        {/* Persistent Social Sidebar (Sticky) */}
        <aside className="hidden lg:flex lg:flex-col w-80 border-l border-border-default/50 bg-bg-surface/30 backdrop-blur-sm h-[calc(100vh-64px)] sticky top-16 overflow-hidden">
          <FriendsOnline />
        </aside>
      </div>
    </div>
  );
}
