"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "CineSync completely changed how my long-distance partner and I watch movies. The sync is flawless and the reactions make it feel like we're on the same couch.",
    author: "Sarah J.",
    role: "Premium User",
    avatar: "SJ"
  },
  {
    quote: "I've tried Teleparty and Discord, but CineSync is on another level. The audio quality in voice chat while streaming is unmatched. Highly recommended!",
    author: "Rahul M.",
    role: "Free User",
    avatar: "RM"
  },
  {
    quote: "Hosting creator events on CineSync is amazing. The 20-person rooms let me interact directly with my community while we watch indie premieres.",
    author: "Alex C.",
    role: "Creator",
    avatar: "AC"
  }
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="w-full py-12 md:py-24 bg-bg-surface overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-display tracking-tighter sm:text-5xl text-text-primary">Loved by Watchers</h2>
          <p className="max-w-[600px] text-text-secondary md:text-xl">
            Don't just take our word for it. Here's what our community says.
          </p>
        </div>

        <div 
           className="max-w-3xl mx-auto relative h-[250px]"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
        >
           <AnimatePresence mode="wait">
              <motion.div
                 key={index}
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 transition={{ duration: 0.4 }}
                 className="absolute inset-0 flex items-center justify-center"
              >
                 <Card className="bg-bg-elevated border-border-default w-full shadow-lg">
                    <CardContent className="p-8 md:p-10 flex flex-col items-center text-center">
                       <Quote className="h-10 w-10 text-brand-primary/20 mb-6" />
                       <p className="text-lg md:text-xl text-text-primary italic mb-8">
                          "{testimonials[index].quote}"
                       </p>
                       <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-brand-primary/20">
                             <AvatarFallback className="bg-bg-surface text-text-primary font-bold">
                                {testimonials[index].avatar}
                             </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                             <h4 className="font-bold text-text-primary font-display">{testimonials[index].author}</h4>
                             <p className="text-xs text-brand-secondary">{testimonials[index].role}</p>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              </motion.div>
           </AnimatePresence>

           <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                 <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-brand-primary w-6' : 'bg-border-strong hover:bg-text-muted'}`}
                 />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
