"use client";

import { useState } from "react";
import { Play, ExternalLink, Flame, Info } from "lucide-react";
import Image from "next/image";

type Platform = "netflix" | "hotstar" | "prime";

const platforms: { id: Platform; label: string; color: string; activeClass: string }[] = [
  { id: "netflix", label: "Netflix", color: "#E50914", activeClass: "text-[#E50914] border-b-2 border-[#E50914]" },
  { id: "hotstar", label: "Hotstar", color: "#1A6AFF", activeClass: "text-[#1A6AFF] border-b-2 border-[#1A6AFF]" },
  { id: "prime", label: "Prime Video", color: "#00A8E1", activeClass: "text-[#00A8E1] border-b-2 border-[#00A8E1]" },
];

export function WhatToWatch() {
  const [active, setActive] = useState<Platform>("netflix");

  const recommendations: Record<Platform, Array<{ id: number; title: string; genre: string; match: string; image: string }>> = {
    netflix: [
      { id: 1, title: "Stranger Things 5", genre: "Sci-Fi", match: "98%", image: "/images/poster_scifi.png" },
      { id: 2, title: "The Killer", genre: "Action", match: "92%", image: "/images/poster_action.png" },
      { id: 3, title: "Society of the Snow", genre: "Drama", match: "89%", image: "/images/poster_drama.png" },
      { id: 4, title: "Leave the World Behind", genre: "Thriller", match: "85%", image: "/images/poster_scifi.png" },
      { id: 5, title: "Rebel Moon", genre: "Sci-Fi", match: "82%", image: "/images/poster_action.png" },
    ],
    hotstar: [
      { id: 6, title: "Loki Season 2", genre: "Sci-Fi", match: "95%", image: "/images/poster_scifi.png" },
      { id: 7, title: "The Mandalorian", genre: "Action", match: "94%", image: "/images/poster_action.png" },
      { id: 8, title: "Aarya", genre: "Crime", match: "88%", image: "/images/poster_drama.png" },
      { id: 9, title: "Shogun", genre: "Drama", match: "97%", image: "/images/poster_drama.png" },
      { id: 10, title: "Bramayugam", genre: "Horror", match: "91%", image: "/images/poster_scifi.png" },
    ],
    prime: [
      { id: 11, title: "The Boys", genre: "Action", match: "99%", image: "/images/poster_action.png" },
      { id: 12, title: "Fallout", genre: "Sci-Fi", match: "96%", image: "/images/poster_scifi.png" },
      { id: 13, title: "Reacher", genre: "Action", match: "91%", image: "/images/poster_action.png" },
      { id: 14, title: "Saltburn", genre: "Drama", match: "87%", image: "/images/poster_drama.png" },
      { id: 15, title: "Invincible", genre: "Animation", match: "98%", image: "/images/poster_scifi.png" },
    ],
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-text-primary mb-1 flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-primary/20">
                <Flame className="h-4 w-4 text-brand-primary" />
            </span>
            What to Watch
          </h2>
          <p className="text-sm text-text-secondary">Trending across your favorite platforms</p>
        </div>
        
        {/* Platform tab bar - SRS aligned */}
        <div className="flex gap-6 border-b border-border-default/20">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`pb-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                active === p.id
                  ? p.activeClass
                  : "text-text-muted hover:text-text-primary border-b-2 border-transparent"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Cards Swimlane */}
      <div className="flex space-x-5 overflow-x-auto pb-6 snap-x hide-scrollbar">
        {recommendations[active].map((item) => (
          <div key={item.id} className="min-w-[190px] shrink-0 snap-start group">
            <div className="relative rounded-2xl overflow-hidden border border-border-default bg-bg-surface aspect-[2/3] group-hover:border-brand-primary/40 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(108,99,255,0.15)] group-hover:-translate-y-1">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              
              {/* Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500" />

              {/* Match Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-bg-overlay/80 backdrop-blur-md border border-border-strong flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  <span className="text-[10px] font-bold text-[#2ECC71]">{item.match} Match</span>
              </div>

              {/* Action Icons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button className="w-8 h-8 rounded-full bg-bg-overlay/80 backdrop-blur-md border border-border-strong flex items-center justify-center text-text-primary hover:text-brand-primary transition-colors">
                      <Info className="h-4 w-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-bg-overlay/80 backdrop-blur-md border border-border-strong flex items-center justify-center text-text-primary hover:text-brand-primary transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                  </button>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <div className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                  <Play className="h-6 w-6 fill-white ml-1" />
                </div>
              </div>

              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-transform duration-500">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="h-1 w-1 rounded-full bg-brand-primary" />
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{item.genre}</p>
                </div>
                <h4 className="font-display font-bold text-text-primary text-sm leading-snug group-hover:text-brand-primary transition-colors">{item.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
