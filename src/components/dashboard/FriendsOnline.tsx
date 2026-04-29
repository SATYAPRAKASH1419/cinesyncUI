"use client";

import { Search, UserPlus, LogIn, UserCheck, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FriendStatus = "watching" | "lobby" | "gaming" | "offline";

type Friend = {
  id: number;
  name: string;
  status: string;
  isOnline: boolean;
  type: FriendStatus;
  roomCode?: string;
};

// Determine contextual action based on status type
function FriendAction({ friend }: { friend: Friend }) {
  if (!friend.isOnline) return null;

  if (friend.type === "watching" && friend.roomCode) {
    return (
      <button
        className="
          shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg
          bg-brand-primary/10 text-brand-primary border border-brand-primary/20
          hover:bg-brand-primary hover:text-white hover:border-brand-primary
          opacity-0 group-hover:opacity-100 transition-all duration-200
        "
        title={`Join ${friend.name}'s room`}
      >
        <span className="flex items-center gap-1">
          <LogIn className="h-3 w-3" />
          Join
        </span>
      </button>
    );
  }

  if (friend.type === "lobby") {
    return (
      <button
        className="
          shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg
          bg-green-500/10 text-green-400 border border-green-500/20
          hover:bg-green-500 hover:text-white hover:border-green-500
          opacity-0 group-hover:opacity-100 transition-all duration-200
        "
        title={`Invite ${friend.name}`}
      >
        <span className="flex items-center gap-1">
          <UserPlus className="h-3 w-3" />
          Invite
        </span>
      </button>
    );
  }

  if (friend.type === "gaming") {
    return (
      <button
        className="
          shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg
          bg-orange-500/10 text-orange-400 border border-orange-500/20
          hover:bg-orange-500 hover:text-white hover:border-orange-500
          opacity-0 group-hover:opacity-100 transition-all duration-200
        "
        title="Send a nudge"
      >
        <span className="flex items-center gap-1">
          <UserCheck className="h-3 w-3" />
          Nudge
        </span>
      </button>
    );
  }

  return null;
}

// Status dot color per type
function statusDotClass(type: FriendStatus, isOnline: boolean) {
  if (!isOnline) return "bg-gray-600";
  if (type === "watching") return "bg-brand-primary shadow-[0_0_8px_rgba(108,99,255,0.8)]";
  if (type === "lobby") return "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]";
  if (type === "gaming") return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]";
  return "bg-gray-500";
}

// Status text color per type
function statusTextClass(type: FriendStatus, isOnline: boolean) {
  if (!isOnline) return "text-text-muted";
  if (type === "watching") return "text-brand-primary/80";
  if (type === "lobby") return "text-green-400";
  if (type === "gaming") return "text-orange-400";
  return "text-text-muted";
}

export function FriendsOnline() {
  const [query, setQuery] = useState("");

  const friends: Friend[] = [
    { id: 1, name: "Sarah J.",   status: "Watching Interstellar",  isOnline: true,  type: "watching", roomCode: "ABC121" },
    { id: 2, name: "Rahul M.",   status: "In Lobby — Waiting",      isOnline: true,  type: "lobby" },
    { id: 3, name: "Alex C.",    status: "Offline",                  isOnline: false, type: "offline" },
    { id: 4, name: "Mia T.",     status: "Watching The Office",      isOnline: true,  type: "watching", roomCode: "XYZ992" },
    { id: 5, name: "Chris P.",   status: "Offline",                  isOnline: false, type: "offline" },
    { id: 6, name: "Jessica W.", status: "Playing Valorant",         isOnline: true,  type: "gaming" },
    { id: 7, name: "David K.",   status: "Offline",                  isOnline: false, type: "offline" },
    { id: 8, name: "Emily R.",   status: "Watching Dune",            isOnline: true,  type: "watching", roomCode: "LFI003" },
    { id: 9, name: "Michael B.", status: "In Lobby — Open Room",     isOnline: true,  type: "lobby" },
    { id: 10, name: "Sophia L.", status: "Watching Friends",         isOnline: true,  type: "watching", roomCode: "GGW123" },
    { id: 11, name: "Kevin H.",  status: "Playing CS2",              isOnline: true,  type: "gaming" },
    { id: 12, name: "Olivia G.", status: "Offline",                  isOnline: false, type: "offline" },
  ];

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.status.toLowerCase().includes(query.toLowerCase())
  );

  const online = friends.filter(f => f.isOnline).length;

  // Sort: online first, offline last
  const sorted = [
    ...filtered.filter(f => f.isOnline),
    ...filtered.filter(f => !f.isOnline),
  ];

  return (
    <section className="p-5 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-display font-bold text-text-primary">Social</h2>
        <span className="bg-green-500/10 text-green-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-green-500/20">
          {online} online
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
        <Input
          placeholder="Search friends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 h-9 text-sm bg-bg-surface/50 border-border-default/40 rounded-xl"
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <span className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_6px_rgba(108,99,255,0.8)]" />
          Watching
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
          Lobby
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
          Gaming
        </span>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-0.5 -mx-1 px-1">
        {sorted.map((friend) => (
          <div
            key={friend.id}
            className={`flex items-center justify-between group px-2 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              friend.isOnline
                ? "hover:bg-bg-elevated"
                : "opacity-40 hover:opacity-60"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar + Status Dot */}
              <div className="relative shrink-0">
                <Avatar className={`w-9 h-9 border ${friend.isOnline ? "border-white/10" : "border-white/5"}`}>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${friend.id + 50}`} />
                  <AvatarFallback className="bg-bg-elevated text-text-primary text-xs">
                    {friend.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg-base ${statusDotClass(friend.type, friend.isOnline)}`} />
              </div>

              {/* Name + Status */}
              <div className="min-w-0">
                <p className={`text-sm font-semibold leading-tight truncate ${friend.isOnline ? "text-text-primary" : "text-text-muted"}`}>
                  {friend.name}
                </p>
                <p className={`text-[11px] truncate leading-tight mt-0.5 ${statusTextClass(friend.type, friend.isOnline)}`}>
                  {friend.status}
                </p>
              </div>
            </div>

            {/* Contextual Action */}
            <FriendAction friend={friend} />
          </div>
        ))}

        {sorted.length === 0 && (
          <p className="text-center text-text-muted text-sm py-8">No friends found.</p>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 mt-2 border-t border-border-default/30">
        <button className="w-full text-xs text-text-muted hover:text-brand-primary transition-colors flex items-center justify-center gap-2 py-1">
          <UserPlus className="h-3.5 w-3.5" />
          Add Friends
        </button>
      </div>
    </section>
  );
}
