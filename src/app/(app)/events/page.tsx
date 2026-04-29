"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Bell, Share2, Star, ChevronRight,
  TrendingUp, Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────
type Event = {
  id: number;
  title: string;
  description: string;
  host: string;
  hostAvatar: string;
  startTime: string;
  type: "live" | "upcoming" | "community";
  image: string;
  attendees: number;
  tags: string[];
  isPremium?: boolean;
};

// ── Mock Data ─────────────────────────────────────────────────────
const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Spider-Man: Across the Spider-Verse",
    description: "Community watch party with live concept art discussion.",
    host: "MarvelHub",
    hostAvatar: "https://i.pravatar.cc/150?u=1",
    startTime: "Started 15m ago",
    type: "live",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=800",
    attendees: 1240,
    tags: ["Movie", "Discussion", "4K"],
    isPremium: true
  },
  {
    id: 2,
    title: "Anime Night: Jujutsu Kaisen 0",
    description: "Friday night special. Join the largest anime community party.",
    host: "CrunchyRollers",
    hostAvatar: "https://i.pravatar.cc/150?u=2",
    startTime: "Starts at 9:00 PM",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=800",
    attendees: 850,
    tags: ["Anime", "Social"],
  },
  {
    id: 3,
    title: "Indie Film Showcase: The Last Signal",
    description: "Exclusive premiere of the award-winning sci-fi short.",
    host: "IndieWire",
    hostAvatar: "https://i.pravatar.cc/150?u=3",
    startTime: "Sat, Oct 12",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
    attendees: 3200,
    tags: ["Premiere", "Exclusive"],
    isPremium: true
  }
];

// ── Sub-components ─────────────────────────────────────────────────

function EventCard({ event }: { event: Event }) {
  const [isReminderSet, setIsReminderSet] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-[#14182B]/40 border border-[#2A3255]/30 rounded-[32px] overflow-hidden backdrop-blur-xl transition-all hover:border-[#6C63FF]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Image Header */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14182B] via-transparent to-transparent" />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {event.type === "live" ? (
            <div className="flex items-center gap-1.5 bg-[#E74C3C] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-[#E74C3C]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/10">
              UPCOMING
            </div>
          )}
          {event.isPremium && (
            <div className="bg-[#C9993A] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-[#C9993A]/20">
              PRO
            </div>
          )}
        </div>

        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95">
           <Share2 className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        <div className="flex items-center gap-3 mb-4">
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i + event.id}`} className="w-6 h-6 rounded-full border-2 border-[#14182B] shrink-0" alt="Attendee" />
              ))}
              <div className="w-6 h-6 rounded-full bg-[#1E2540] border-2 border-[#14182B] flex items-center justify-center text-[8px] font-bold text-[#8892B0]">
                +{Math.floor(event.attendees/100)}k
              </div>
           </div>
           <span className="text-[10px] font-black text-[#4A5280] uppercase tracking-widest">{event.startTime}</span>
        </div>

        <h3 className="text-xl font-display font-bold text-[#F0F2FF] leading-tight mb-2 group-hover:text-[#6C63FF] transition-colors">{event.title}</h3>
        <p className="text-sm text-[#8892B0] line-clamp-2 mb-6">{event.description}</p>

        <div className="flex items-center justify-between border-t border-[#2A3255]/30 pt-5 mt-auto">
          <div className="flex items-center gap-2.5">
            <img src={event.hostAvatar} className="w-8 h-8 rounded-xl border border-[#2A3255]" alt="Host" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#4A5280] uppercase tracking-widest">Hosted by</span>
                <span className="text-xs font-bold text-[#F0F2FF]">{event.host}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {event.type === "live" ? (
                <Button className="bg-[#6C63FF] hover:bg-[#7B73FF] h-10 px-6 rounded-xl font-bold text-xs shadow-lg shadow-[#6C63FF]/20">
                    Join Now
                </Button>
            ) : (
                <Button 
                    onClick={() => setIsReminderSet(!isReminderSet)}
                    variant="outline" 
                    className={cn(
                        "h-10 px-6 rounded-xl font-bold text-xs transition-all",
                        isReminderSet ? "bg-[#6C63FF]/10 border-[#6C63FF] text-[#6C63FF]" : "border-[#2A3255] text-[#8892B0] hover:text-[#F0F2FF]"
                    )}
                >
                    {isReminderSet ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Bell className="h-4 w-4 mr-2" />}
                    {isReminderSet ? "Reminded" : "Remind Me"}
                </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Events Page ─────────────────────────────────────────────────

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Movie Premieres", "Anime Night", "Community", "Live Music", "Tech Talks"];

  return (
    <div className="flex min-h-screen flex-col bg-[#0E1019] text-[#F0F2FF] font-body selection:bg-[#6C63FF]/30">
      <Navbar />

      {/* Background Mesh Pulse */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6C63FF]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E8A838]/3 blur-[120px] rounded-full" />
      </div>

      <main className="flex-1 relative z-10">
        {/* ── Hero Section ── */}
        <section className="relative h-[85vh] min-h-[600px] flex flex-col justify-end overflow-hidden border-b border-[#2A3255]/30">
           {/* Background Video/Image */}
           <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=2000" 
               className="w-full h-full object-cover scale-105" 
               alt="Hero Backdrop"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0E1019] via-[#0E1019]/60 to-transparent" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0E1019] via-transparent to-transparent" />
           </div>

           <div className="container px-6 sm:px-12 pb-20 relative z-20">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-3xl"
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="px-3 py-1 rounded-full bg-[#E8A838]/20 border border-[#E8A838]/30 text-[#E8A838] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Star className="h-3 w-3 fill-current" />
                    Spotlight Premiere
                 </div>
                 <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                    Starts in 2h 45m
                 </div>
               </div>
               
               <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.9] mb-6">
                 Dune: <span className="text-[#6C63FF]">Awakening</span>
               </h1>
               <p className="text-lg md:text-xl text-[#8892B0] font-medium leading-relaxed mb-10 max-w-2xl">
                 Join the official community watch party and developer Q&A session. 
                 Experience the first 20 minutes of the epic saga with 5,000+ other fans.
               </p>

               <div className="flex flex-wrap items-center gap-4">
                 <Button className="bg-[#6C63FF] hover:bg-[#7B73FF] h-14 px-10 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all active:scale-95 group">
                   Register Interest
                   <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                 </Button>
                 <Button variant="ghost" className="h-14 px-8 text-white font-bold hover:bg-white/5 gap-3">
                    <Share2 className="h-5 w-5" />
                    Share Event
                 </Button>
               </div>
             </motion.div>
           </div>
        </section>

        {/* ── Browse Events ── */}
        <section className="container px-6 sm:px-12 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#6C63FF]">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Live & Trending</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">Discover the Future</h2>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                    <Button className="w-full sm:w-auto bg-[#6C63FF] hover:bg-[#7B73FF] h-12 px-8 rounded-xl font-bold gap-2 shadow-lg shadow-[#6C63FF]/20">
                        <Plus className="h-4 w-4" />
                        Create Event
                    </Button>
                    <div className="flex items-center gap-3 bg-[#14182B]/60 p-1.5 rounded-2xl border border-[#2A3255]/30">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-5 py-2 text-xs font-bold rounded-xl transition-all",
                                activeCategory === cat ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/20" : "text-[#8892B0] hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_EVENTS.map((event, idx) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <EventCard event={event} />
                    </motion.div>
                ))}
            </div>

            {/* Empty State / Load More */}
            <div className="mt-20 flex flex-col items-center">
                <Button variant="outline" className="h-12 px-10 border-[#2A3255] text-[#8892B0] font-bold hover:bg-white/5 rounded-2xl group">
                    View Calendar Archive
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </section>

        {/* ── Host Your Own Callout ── */}
        <section className="container px-6 sm:px-12 mb-32">
            <div className="relative p-12 md:p-20 rounded-[48px] overflow-hidden bg-[#14182B] border border-[#6C63FF]/20">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6C63FF]/10 blur-[100px] rounded-full" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl text-center md:text-left space-y-6">
                        <h2 className="text-4xl md:text-5xl font-display font-black text-white">Ready to host your <span className="text-[#6C63FF]">own party?</span></h2>
                        <p className="text-[#8892B0] font-medium leading-relaxed">
                            Creators with Pro tier can schedule private or public events with advanced moderator tools, custom emotes, and priority 4K streaming.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Button className="bg-[#6C63FF] hover:bg-[#7B73FF] h-12 px-8 rounded-xl font-bold">Launch Creator Studio</Button>
                            <Button variant="outline" className="border-[#2A3255] text-[#8892B0] h-12 px-8 rounded-xl font-bold">Learn More</Button>
                        </div>
                    </div>
                    <div className="relative shrink-0 hidden lg:block">
                        <div className="w-64 h-64 bg-gradient-to-tr from-[#6C63FF] to-[#E8A838] rounded-3xl rotate-12 absolute inset-0 blur-2xl opacity-20" />
                        <div className="w-64 h-64 bg-[#1E2540] border-2 border-[#6C63FF]/30 rounded-3xl flex items-center justify-center relative">
                            <MonitorPlay className="h-24 w-24 text-[#6C63FF]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ── Icons ──
function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function MonitorPlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10 7 5 3-5 3Z" />
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
    </svg>
  )
}
