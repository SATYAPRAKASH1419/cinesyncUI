import { Play, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

export function ActiveRooms() {
  const rooms = [
    { id: 1, name: "Movie Night", code: "ABC121", users: 5, image: "/images/room_movie.png", genre: "Drama" },
    { id: 2, name: "Anime Marathon", code: "XYZ992", users: 3, image: "/images/room_anime.png", genre: "Animation" },
    { id: 3, name: "Study Music", code: "LFI003", users: 8, image: "/images/room_lofi.png", genre: "Music" },
    { id: 4, name: "Horror Fest", code: "BOO666", users: 12, image: "/images/room_movie.png", genre: "Horror" },
    { id: 5, name: "Gaming Stream", code: "GGW123", users: 15, image: "/images/room_anime.png", genre: "Gaming" },
    { id: 6, name: "Classic Cinema", code: "OLD789", users: 4, image: "/images/room_lofi.png", genre: "Classic" },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-primary/20">
            <Play className="h-3.5 w-3.5 text-brand-primary fill-brand-primary" />
          </span>
          Active Rooms
        </h2>
        <Link href="/rooms" className="text-xs font-semibold text-text-muted hover:text-brand-primary transition-colors uppercase tracking-widest">View all →</Link>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="min-w-[260px] shrink-0 snap-start group relative"
          >
            {/* Card Container */}
            <div className="relative rounded-2xl overflow-hidden border border-border-default bg-bg-surface transition-all duration-500 group-hover:border-brand-primary/40 group-hover:shadow-[0_0_40px_rgba(108,99,255,0.15)]">

              {/* Thumbnail */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/20 to-transparent" />

                {/* Play Button Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-bg-overlay/60 backdrop-blur-md border border-border-strong flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                    <Play className="h-5 w-5 text-text-primary fill-text-primary ml-0.5" />
                  </div>
                </div>

                {/* Live Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-bg-overlay/70 backdrop-blur-md border border-border-strong text-text-primary text-[11px] font-bold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] shadow-[0_0_6px_rgba(46,204,113,1)] animate-pulse" />
                  Live
                </div>

                {/* Genre Badge */}
                <div className="absolute top-3 right-3 bg-brand-primary/20 backdrop-blur-md border border-brand-primary/30 text-brand-primary/90 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {room.genre}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 pt-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-display font-bold text-text-primary text-base leading-tight group-hover:text-brand-primary transition-colors duration-300">{room.name}</h3>
                    <p className="text-[11px] text-text-muted mt-0.5 font-mono tracking-wider">#{room.code}</p>
                  </div>
                  <div className="flex items-center gap-1 text-text-muted text-xs bg-bg-elevated border border-border-subtle px-2 py-1 rounded-full">
                    <Users className="h-3 w-3" />
                    <span>{room.users}</span>
                  </div>
                </div>

                {/* Avatars */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2.5">
                    {Array.from({ length: Math.min(room.users, 4) }).map((_, i) => (
                      <Avatar key={i} className="border-2 border-bg-surface w-7 h-7 ring-0">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${room.id * 10 + i}`} />
                        <AvatarFallback className="bg-brand-dark text-[10px]">U{i + 1}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {room.users > 4 && (
                    <span className="text-[11px] text-text-muted">+{room.users - 4} watching</span>
                  )}
                </div>

                {/* Premium Join Button */}
                <Link href={`/room/${room.code}`}>
                  <button className="
                    relative w-full h-10 rounded-xl overflow-hidden
                    font-bold text-sm text-white tracking-wide
                    transition-all duration-300
                    group-hover:shadow-[0_0_25px_rgba(108,99,255,0.5)]
                    active:scale-[0.98]
                  ">
                    {/* Gradient Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-primary to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                    {/* Shimmer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    {/* Label */}
                    <span className="relative flex items-center justify-center gap-2">
                      <Play className="h-3.5 w-3.5 fill-white" />
                      Join Room
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
