"use client";

import { Calendar, Clock, Users, Ticket, CheckCircle, MapPin, ChevronRight, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

type Event = {
  id: number;
  title: string;
  image: string;
  price: string;
  host: string;
  time: string;
  viewers: number;
};

function TicketModal({ event }: { event: Event }) {
  const isFree = event.price === "Free";

  return (
    <Dialog>
      <DialogTrigger render={
        <button className="relative group/btn py-1.5 px-4 rounded-xl border border-brand-primary/30 text-brand-primary text-xs font-bold transition-all hover:bg-brand-primary/10 hover:border-brand-primary hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]">
          <span className="flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5" />
            Get Ticket
          </span>
        </button>
      } />

      <DialogContent className="p-0 overflow-hidden border-border-default bg-bg-surface max-w-md shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        <div className="relative flex flex-col">

          {/* Hero Banner with Glass Header */}
          <div className="relative h-48">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg-surface" />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-premium-gold" /> Exclusive Event
                </span>
                <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-brand-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl font-display font-bold text-text-primary leading-tight">{event.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                 <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <MapPin className="h-3.5 w-3.5 text-brand-primary" />
                    Global Premiere
                 </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-elevated/40 border border-border-subtle rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Clock className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Time</p>
                    <p className="text-sm font-bold text-text-primary">{event.time}</p>
                </div>
              </div>
              <div className="bg-bg-elevated/40 border border-border-subtle rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                    <Users className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Viewers</p>
                    <p className="text-sm font-bold text-text-primary">{event.viewers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Host Section */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-bg-elevated/40 border border-border-subtle">
              <div className="w-10 h-10 rounded-full border-2 border-brand-primary/30 overflow-hidden bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                {event.host[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-primary truncate">{event.host}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Verified Creator</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8 rounded-lg border-border-strong text-xs">View Profile</Button>
            </div>

            {/* Ticket Divider (Premium Style) */}
            <div className="relative py-2">
                <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg-base border border-border-default z-10" />
                <div className="h-px border-t border-dashed border-border-default relative z-0" />
                <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg-base border border-border-default z-10" />
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-secondary">Total Amount</span>
                    <div className="text-right">
                        <span className={`text-2xl font-display font-bold ${isFree ? 'text-[#2ECC71]' : 'text-premium-gold'}`}>
                            {event.price}
                        </span>
                        <p className="text-[10px] text-text-muted">incl. all taxes</p>
                    </div>
                </div>

                <button className="relative w-full h-14 rounded-2xl overflow-hidden font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-primary/20 group">
                    <div className="absolute inset-0 bg-brand-primary transition-colors group-hover:bg-[#7B73FF]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2">
                        <Ticket className="h-5 w-5" />
                        {isFree ? "Claim Free Ticket" : `Pay ${event.price} & Reserve`}
                    </span>
                </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function UpcomingEvents() {
  const events: Event[] = [
    { id: 1, title: "Indie Film Premiere 1", image: "/images/event_indie_1.png", price: "Free", host: "Creator One", time: "8:00 PM", viewers: 4200 },
    { id: 2, title: "Abstract Sci-Fi Showcase", image: "/images/event_indie_2.png", price: "$5.99", host: "Creator Two", time: "9:00 PM", viewers: 1800 },
    { id: 3, title: "Classic Rewatch: Pulp Fiction", image: "/images/event_indie_1.png", price: "Free", host: "Creator Three", time: "7:30 PM", viewers: 3100 },
    { id: 4, title: "Cyberpunk Night", image: "/images/event_indie_2.png", price: "$2.99", host: "Creator Four", time: "10:00 PM", viewers: 950 },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-secondary/20">
            <Calendar className="h-3.5 w-3.5 text-brand-secondary" />
          </span>
          Upcoming Events
        </h2>
        <button className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1">
            Browse All <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative flex overflow-hidden rounded-2xl border border-border-default bg-bg-surface hover:border-brand-primary/40 hover:shadow-[0_0_40px_rgba(108,99,255,0.1)] transition-all duration-500"
          >
            {/* Cover image - Cinematic style */}
            <div className="w-44 shrink-0 relative overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-surface" />
              
              {/* Floating Price Tag */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white">
                  {event.price}
              </div>
            </div>

            {/* Content Info */}
            <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-display font-bold text-text-primary text-base leading-tight mb-1 group-hover:text-brand-primary transition-colors truncate">
                    {event.title}
                </h3>
                <div className="flex items-center gap-2 text-text-muted text-[11px] font-medium uppercase tracking-wide">
                    <span>by {event.host}</span>
                    <span className="w-1 h-1 rounded-full bg-text-muted/30" />
                    <span className="text-[#2ECC71] flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-subtle/50">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Starts</span>
                        <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-brand-primary" /> {event.time}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-border-subtle/50" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Watching</span>
                        <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                            <Users className="h-3 w-3 text-brand-secondary" /> {event.viewers.toLocaleString()}
                        </span>
                    </div>
                </div>
                <TicketModal event={event} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
