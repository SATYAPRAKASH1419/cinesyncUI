"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus, Play, Flame, Film, MonitorPlay,
  Link as LinkIcon, Upload, Globe, Lock, Check, ChevronRight, X
} from "lucide-react";
import Image from "next/image";

type Source = "local" | "screenshare" | "youtube" | null;
type Privacy = "public" | "private";

function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function CreateRoomPanel({ onClose, onCreate }: { onClose: () => void; onCreate: (code: string) => void }) {
  const [roomName, setRoomName] = useState("");
  const [source, setSource] = useState<Source>(null);
  const [privacy, setPrivacy] = useState<Privacy>("public");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const sourceOptions = [
    {
      id: "youtube" as Source,
      icon: Play,
      label: "YouTube",
      description: "Paste any YouTube link",
      color: "text-[#FF4444]",
      borderColor: "border-[#FF4444]/50",
      bgColor: "bg-[#FF4444]/10",
    },
    {
      id: "local" as Source,
      icon: Film,
      label: "Local File",
      description: "Upload from your device",
      color: "text-brand-secondary",
      borderColor: "border-brand-secondary/50",
      bgColor: "bg-brand-secondary/10",
    },
    {
      id: "screenshare" as Source,
      icon: MonitorPlay,
      label: "Screen Share",
      description: "Share your screen live",
      color: "text-brand-primary",
      borderColor: "border-brand-primary/50",
      bgColor: "bg-brand-primary/10",
    },
  ];

  const isValid = roomName.trim().length > 0 && source !== null &&
    (source !== "youtube" || youtubeUrl.trim().length > 0);

  function handleCreate() {
    if (!isValid) return;
    const code = generateRoomCode();
    onCreate(code);
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0E1019]/80 backdrop-blur-md" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-[440px] bg-bg-surface border-l border-border-default flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.6)]">

        {/* Header */}
        <div className="relative p-6 border-b border-border-default">
          <div className="pr-10">
            <h2 className="text-2xl font-display font-bold text-text-primary">Create a Room</h2>
            <p className="text-sm text-text-secondary mt-0.5">Set up a co-watching session</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:bg-bg-elevated hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7">

          {/* Step 1: Room Name */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">1</span>
              Room Name
            </Label>
            <Input
              placeholder="e.g. Friday Movie Night"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-bg-elevated border-border-default text-text-primary placeholder:text-text-muted h-12 rounded-xl"
            />
          </div>

          {/* Step 2: Source Picker */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">2</span>
              What will you watch?
            </Label>
            <div className="space-y-2">
              {sourceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSource(source === opt.id ? null : opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                    source === opt.id
                      ? `${opt.bgColor} ${opt.borderColor} shadow-sm`
                      : "border-border-default hover:border-border-strong hover:bg-bg-elevated"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${source === opt.id ? opt.bgColor : "bg-bg-elevated"}`}>
                    <opt.icon className={`h-5 w-5 ${source === opt.id ? opt.color : "text-text-muted"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${source === opt.id ? "text-text-primary" : "text-text-secondary"}`}>{opt.label}</p>
                    <p className="text-xs text-text-muted">{opt.description}</p>
                  </div>
                  {source === opt.id && (
                    <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${opt.bgColor}`}>
                      <Check className={`h-3 w-3 ${opt.color}`} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic sub-input based on source */}
            {source === "youtube" && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="pl-10 bg-bg-elevated border-[#FF4444]/30 focus:border-[#FF4444]/70 text-text-primary placeholder:text-text-muted h-11 rounded-xl"
                  />
                </div>
                {youtubeUrl && (
                  <p className="text-[11px] text-[#2ECC71] mt-1.5 flex items-center gap-1">
                    <Check className="h-3 w-3" /> URL looks valid
                  </p>
                )}
              </div>
            )}

            {source === "local" && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <input
                  ref={fileRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full border border-dashed border-brand-secondary/40 hover:border-brand-secondary/80 bg-brand-secondary/5 hover:bg-brand-secondary/10 rounded-xl p-5 flex flex-col items-center gap-2 transition-all duration-200"
                >
                  <Upload className="h-6 w-6 text-brand-secondary" />
                  {fileName ? (
                    <p className="text-sm text-text-primary font-medium truncate max-w-[250px]">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-text-secondary">Click to upload video</p>
                      <p className="text-xs text-text-muted">MP4, MKV, WebM supported</p>
                    </>
                  )}
                </button>
              </div>
            )}

            {source === "screenshare" && (
              <div className="animate-in slide-in-from-top-2 duration-200 bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-4 flex items-start gap-3">
                <MonitorPlay className="h-5 w-5 text-brand-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-text-primary">Screen Share Ready</p>
                  <p className="text-xs text-text-muted mt-0.5">Your browser will ask for permission to share your screen once the room starts.</p>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Privacy */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">3</span>
              Room Privacy
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPrivacy("public")}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  privacy === "public"
                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                    : "border-border-default text-text-secondary hover:border-border-strong hover:bg-bg-elevated"
                }`}
              >
                <Globe className="h-4 w-4" />
                Public
              </button>
              <button
                onClick={() => setPrivacy("private")}
                className={`flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  privacy === "private"
                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                    : "border-border-default text-text-secondary hover:border-border-strong hover:bg-bg-elevated"
                }`}
              >
                <Lock className="h-4 w-4" />
                Private
              </button>
            </div>
            <p className="text-xs text-text-muted pl-1">
              {privacy === "public"
                ? "Anyone with the code can join your room."
                : "Only people you invite can join."}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-border-default bg-bg-surface">
          <button
            disabled={!isValid}
            onClick={handleCreate}
            className={`relative w-full h-13 py-3.5 rounded-xl overflow-hidden font-bold text-sm text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isValid
                ? "bg-brand-primary hover:bg-[#7B73FF] shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:shadow-[0_0_35px_rgba(108,99,255,0.6)]"
                : "bg-bg-elevated text-text-muted cursor-not-allowed"
            }`}
          >
            <Plus className="h-4 w-4" />
            Create Room
            {isValid && <ChevronRight className="h-4 w-4 ml-1" />}
          </button>
          {!isValid && (
            <p className="text-center text-xs text-text-muted mt-2">
              {!roomName ? "Enter a room name to continue" : !source ? "Choose what to watch" : "Add a YouTube URL"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function BentoHero() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleJoin() {
    if (roomCode.trim().length === 6) {
      router.push(`/room/${roomCode.trim()}`);
    }
  }

  function handleRoomCreate(code: string) {
    setSheetOpen(false);
    router.push(`/room/${code}`);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* Featured Tile */}
        <div className="md:col-span-2 relative h-[300px] rounded-2xl overflow-hidden group">
          <Image
            src="/images/event_indie_1.png"
            alt="Featured Event"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1019] via-[#1A1F3C]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#E74C3C]/20 text-[#E74C3C] text-xs font-bold px-3 py-1 rounded-full border border-[#E74C3C]/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74C3C] animate-pulse" />
                Live Now
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary leading-tight">
                Dune: Part Two
                <span className="block text-text-secondary text-xl md:text-2xl mt-1">Watch Party</span>
              </h1>
              <p className="text-text-secondary text-sm mt-2 hidden sm:block">
                Join 4,200 others · Hosted by IMAX
              </p>
            </div>
            <button className="shrink-0 items-center gap-2 bg-brand-primary text-white hover:bg-[#7B73FF] font-bold px-6 h-11 rounded-full transition-colors hidden sm:flex shadow-[0_0_20px_rgba(108,99,255,0.4)]">
              <Play className="h-4 w-4 fill-white" />
              Join Event
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 h-[300px]">

          {/* Start Watching tile */}
          <div className="bg-bg-surface border border-border-default rounded-2xl p-5 relative group flex flex-col justify-center gap-3 flex-1">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
            <h3 className="text-base font-display font-bold text-text-primary">Start Watching</h3>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Code"
                className="bg-bg-elevated border-border-default text-text-primary font-mono uppercase h-11 flex-1 min-w-0 placeholder:text-text-muted"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 6))}
                maxLength={6}
              />
              <Button
                className="h-11 bg-brand-primary text-white hover:bg-[#7B73FF] px-5 shrink-0 shadow-[0_0_20px_rgba(108,99,255,0.3)]"
                onClick={handleJoin}
                disabled={roomCode.length !== 6}
              >
                Join
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-border-subtle" />
              <span className="text-text-muted text-[11px] uppercase tracking-widest">or</span>
              <div className="flex-1 border-t border-border-subtle" />
            </div>

            <button
              onClick={() => setSheetOpen(true)}
              className="w-full h-11 rounded-xl border border-brand-primary/40 text-brand-primary text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-primary/10 hover:border-brand-primary transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Create New Room
            </button>
          </div>

          {/* Premium Stats tile */}
          <div className="bg-[#1C1A10] border border-premium-gold/30 rounded-2xl px-5 py-4 flex items-center justify-between group cursor-pointer relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-premium-glow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <p className="text-premium-gold text-xs font-semibold mb-1 uppercase tracking-widest">CineSync Premium</p>
              <h4 className="text-text-primary font-bold text-xl font-display">124 hrs watched</h4>
            </div>
            <div className="relative h-11 w-11 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#F39C12] rounded-full blur-lg opacity-25 group-hover:opacity-50 animate-pulse" />
              <Flame className="h-9 w-9 text-[#F39C12] fill-[#F39C12] drop-shadow-[0_0_12px_rgba(243,156,18,0.9)] group-hover:scale-110 transition-transform relative z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Create Room Panel */}
      {sheetOpen && <CreateRoomPanel onClose={() => setSheetOpen(false)} onCreate={handleRoomCreate} />}
    </>
  );
}
