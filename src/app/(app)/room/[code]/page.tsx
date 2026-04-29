"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
   Play, Pause, 
  Settings, UserPlus, 
  Crown, ArrowLeft, Copy, Check,
  Maximize, Minimize,
  ChevronRight, ChevronLeft,
  ShieldCheck, Zap, AlertCircle,
  Mic, MicOff, Video as VideoIcon, VideoOff, Pin, PinOff,
  ScreenShare, Send, LayoutPanelLeft,
  MessageCircleOff
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

// ── Types ─────────────────────────────────────────────────────────
type Participant = {
  id: number;
  name: string;
  role: "host" | "cohost" | "viewer";
  status: "synced" | "buffering" | "offline";
  tier: "free" | "premium" | "creator";
  hasCamera?: boolean;
  hasMic?: boolean;
};

type Message = {
  id: number;
  user: string;
  role: string;
  text: string;
  time: string;
  self: boolean;
  type?: "system" | "chat";
};

type Reaction = {
  id: number;
  emoji: string;
  left: number; // percentage
};

// ── Mock Data ─────────────────────────────────────────────────────
const MOCK_PARTICIPANTS: Participant[] = [
  { id: 1, name: "You (Host)", role: "host", status: "synced", tier: "creator", hasCamera: true, hasMic: true },
  { id: 2, name: "Sarah J.", role: "viewer", status: "synced", tier: "premium", hasCamera: true, hasMic: true },
  { id: 3, name: "Rahul M.", role: "viewer", status: "buffering", tier: "free", hasCamera: false, hasMic: true },
  { id: 4, name: "Mia T.", role: "cohost", status: "synced", tier: "premium", hasCamera: true, hasMic: false },
  { id: 5, name: "Alex C.", role: "viewer", status: "synced", tier: "free", hasCamera: true, hasMic: true },
];

const MOCK_MESSAGES: Message[] = [
  { id: 1, user: "System", role: "system", text: "Welcome to CineSync Live! ✨", time: "8:00 PM", self: false, type: "system" },
  { id: 2, user: "You", role: "host", text: "Starting the movie now!", time: "8:01 PM", self: true, type: "chat" },
  { id: 3, user: "Sarah J.", role: "viewer", text: "Ready! 🍿", time: "8:02 PM", self: false, type: "chat" },
];

// ── Sub-components ─────────────────────────────────────────────────

function ReactionOverlay({ reactions }: { reactions: Reaction[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
      {reactions.map((r) => (
        <div
          key={r.id}
          className="absolute bottom-0 text-4xl animate-float-up select-none pointer-events-none"
          style={{ 
            left: `${r.left}%`, 
            animationDuration: `${2.5 + Math.random() * 1.5}s`,
            animationTimingFunction: 'ease-out'
          }}
        >
          {r.emoji}
        </div>
      ))}
    </div>
  );
}

function RoleBadge({ role, tier }: { role: string, tier?: string }) {
  if (role === "host") return (
    <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-sm bg-[#E8A838] text-white uppercase tracking-tighter">
      <Crown className="h-2.5 w-2.5" /> Host
    </span>
  );
  if (role === "cohost") return (
    <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-sm bg-[#6C63FF] text-white uppercase tracking-tighter">
      <ShieldCheck className="h-2.5 w-2.5" /> Mod
    </span>
  );
  if (tier === "premium") return (
      <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-sm bg-[#C9993A] text-white uppercase tracking-tighter shadow-[0_0_10px_rgba(201,153,58,0.3)]">
          <Zap className="h-2.5 w-2.5" /> Pro
      </span>
  );
  return null;
}

// ── Main Room Page ─────────────────────────────────────────────────

export default function RoomPage({ params }: { params: { code: string } }) {
  const code = params.code ?? "ABC121";
  
  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "participants">("chat");
  const [copied, setCopied] = useState(false);
  
  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(42);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Video Chat State
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [pinnedId, setPinnedId] = useState<number | null>(null);

  // Admin Settings State
  const [isMuteAll, setIsMuteAll] = useState(false);
  const [allowUnmute, setAllowUnmute] = useState(true);
  const [allowChat, setAllowChat] = useState(true);
  
  // Interaction State
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const reactionIdRef = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    document.documentElement.setAttribute('data-tier', 'premium');
    return () => {
        document.documentElement.removeAttribute('data-tier');
    };
  }, []);

  const addReaction = (emoji: string) => {
    const id = reactionIdRef.current++;
    const newReaction = { id, emoji, left: 5 + Math.random() * 90 };
    setReactions(prev => [...prev, newReaction]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, 4000);
  };

  const handleSend = () => {
    if (!message.trim() || !allowChat) return;
    const newMessage: Message = {
      id: Date.now(), user: "You", role: "host", text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true, type: "chat"
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }
  };

  const pinnedUser = MOCK_PARTICIPANTS.find(p => p.id === pinnedId);

  return (
    <div className="flex h-screen flex-col bg-[#0E1019] text-[#F0F2FF] overflow-hidden relative font-body">
      
      {/* ── Immersive Background ── */}
      <div className="fixed inset-0 z-[-1] opacity-40 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6C63FF]/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* ── Top Navbar ── */}
      <header className="h-16 shrink-0 border-b border-[#2A3255]/30 bg-[#14182B]/40 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="group flex items-center gap-2 text-[#8892B0] hover:text-[#F0F2FF] transition-all">
            <div className="p-2 rounded-xl bg-[#1E2540]/50 group-hover:bg-[#6C63FF]/20 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm hidden sm:inline">CineSync</span>
          </Link>
          <div className="h-6 w-px bg-[#1E2540]" />
          <div className="flex flex-col">
            <h1 className="text-sm font-display font-bold leading-none mb-1 flex items-center gap-2">
                Dune: Part Two <span className="text-[10px] bg-[#E74C3C]/10 text-[#E74C3C] px-1.5 py-0.5 rounded border border-[#E74C3C]/20 font-bold">LIVE</span>
            </h1>
            <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-[11px] font-mono text-[#4A5280] flex items-center gap-1 hover:text-[#6C63FF] transition-colors">
                {copied ? <Check className="h-3 w-3 text-[#2ECC71]" /> : <Copy className="h-3 w-3" />}
                {code}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 rounded-xl border-[#6C63FF]/30 text-[#6C63FF] hover:bg-[#6C63FF]/10">
                <UserPlus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Invite</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button className="h-10 w-10 rounded-xl bg-[#1E2540]/50 flex items-center justify-center border border-[#1E2540] text-[#4A5280] hover:text-[#F0F2FF] transition-all">
                  <Settings className="h-5 w-5" />
                </button>
              } />
              <DropdownMenuContent align="end" className="w-64 bg-[#14182B]/95 backdrop-blur-2xl border border-[#2A3255] p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-2 text-sm font-bold flex items-center gap-2 text-[#F0F2FF]">
                      <ShieldCheck className="h-4 w-4 text-[#6C63FF]" />
                      Host Settings
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-[#2A3255]/50" />
                
                <div className="p-2 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#F0F2FF]">Mute Everyone</span>
                        <span className="text-[10px] text-[#8892B0]">Force mute all viewers</span>
                    </div>
                    <Switch checked={isMuteAll} onCheckedChange={setIsMuteAll} />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#F0F2FF]">Allow Unmute</span>
                        <span className="text-[10px] text-[#8892B0]">Viewers can unmute</span>
                    </div>
                    <Switch checked={allowUnmute} onCheckedChange={setAllowUnmute} />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#F0F2FF]">Public Chat</span>
                        <span className="text-[10px] text-[#8892B0]">Enable messaging</span>
                    </div>
                    <Switch checked={allowChat} onCheckedChange={setAllowChat} />
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-[#2A3255]/50" />
                <div className="p-1">
                    <Button className="w-full bg-[#6C63FF] hover:bg-[#7B73FF] text-white rounded-lg h-9 text-xs font-bold transition-all">
                        Apply Settings
                    </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      {/* ── Main Workspace ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ── Left Side: Movie Player ── */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <div className="flex-1 bg-[#0D0D0D] relative flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center select-none">
                <div className="w-full h-full bg-[#0D0D0D] flex items-center justify-center">
                    <Play className="w-32 h-32 text-white/5" />
                </div>
            </div>

            <ReactionOverlay reactions={reactions} />

            {/* PIP / PINNED BOX */}
            {pinnedUser && (
                <div className="absolute right-6 top-6 w-64 aspect-video z-30 group/pip">
                    <div className="relative w-full h-full bg-[#14182B]/40 backdrop-blur-3xl rounded-2xl border-2 border-[#6C63FF]/50 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                        <div className="w-full h-full relative bg-black/60 flex items-center justify-center">
                            {pinnedUser.id === 1 && cameraOn ? (
                                <div className="w-full h-full bg-[#6C63FF]/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#6C63FF] animate-pulse tracking-widest">LIVE</span>
                                </div>
                            ) : (
                                <Avatar className="w-16 h-16 ring-2 ring-[#6C63FF]/30">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${pinnedUser.id + 100}`} />
                                    <AvatarFallback>{pinnedUser.name[0]}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/pip:opacity-100 transition-opacity flex flex-col justify-between p-3">
                            <div className="flex justify-between">
                                <div className="p-1.5 rounded-lg bg-[#6C63FF] text-white shadow-[0_0_15px_rgba(108,99,255,0.6)]">
                                    <Pin className="h-4 w-4" />
                                </div>
                                <button onClick={() => setPinnedId(null)} className="p-1.5 rounded-lg bg-black/40 hover:bg-[#E74C3C] text-white transition-colors">
                                    <PinOff className="h-4 w-4" />
                                </button>
                            </div>
                            <span className="text-xs font-bold text-white tracking-tight">{pinnedUser.name}</span>
                        </div>
                    </div>
                </div>
            )}

            {!sidebarOpen && (
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-24 bg-[#14182B]/60 border border-[#2A3255]/20 rounded-l-2xl flex items-center justify-center text-[#4A5280] hover:text-[#6C63FF] transition-all backdrop-blur-md z-40 group/toggle"
                >
                    <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
            )}
          </div>

          {/* Controls Bar */}
          <div className="h-20 bg-[#14182B]/60 backdrop-blur-2xl border-t border-[#2A3255]/20 flex flex-col justify-center px-6 shrink-0 relative z-50">
            <div className="absolute top-0 left-0 right-0 h-1 cursor-pointer group/progress" onClick={(e) => setProgress(Math.round(((e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width) * 100))}>
                <div className="absolute inset-y-0 left-0 bg-[#6C63FF] shadow-[0_0_10px_rgba(108,99,255,0.6)]" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-6">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-white ml-1" />}
                    </button>
                    <span className="text-xs font-mono font-bold text-[#F0F2FF]">00:42:15 / 02:44:00</span>
                </div>

                <div className="flex items-center gap-3 bg-[#1E2540]/30 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    <button onClick={() => setMicOn(!micOn)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${micOn ? 'bg-white/5 text-[#F0F2FF] hover:bg-white/10' : 'bg-[#E74C3C]/20 text-[#E74C3C]'}`} title="Mic">
                        {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </button>
                    <button onClick={() => setCameraOn(!cameraOn)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${cameraOn ? 'bg-white/5 text-[#F0F2FF] hover:bg-white/10' : 'bg-[#E74C3C]/20 text-[#E74C3C]'}`} title="Camera">
                        {cameraOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </button>
                    <button onClick={() => setScreenSharing(!screenSharing)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${screenSharing ? 'bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/20' : 'bg-white/5 text-[#F0F2FF] hover:bg-white/10'}`} title="Share Screen">
                        <ScreenShare className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                        {['❤️', '🔥', '😂', '💯', '✨'].map(e => (
                            <button key={e} onClick={() => addReaction(e)} className="w-8 h-8 flex items-center justify-center hover:scale-125 transition-all text-base filter grayscale-[0.2] hover:grayscale-0">
                                {e}
                            </button>
                        ))}
                    </div>

                    <div className="h-8 w-px bg-white/10" />

                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-xl transition-all ${sidebarOpen ? 'bg-[#6C63FF]/20 text-[#6C63FF]' : 'text-[#4A5280] hover:text-[#F0F2FF]'}`}>
                        <LayoutPanelLeft className="h-5 w-5" />
                    </button>
                    <button onClick={toggleFullscreen} className="text-[#4A5280] hover:text-[#F0F2FF]">
                        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`relative border-l border-[#2A3255]/20 bg-[#14182B]/60 backdrop-blur-3xl flex flex-col shrink-0 transition-all duration-500 ease-in-out ${sidebarOpen ? 'w-[380px]' : 'w-0'}`}>
          {sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(false)}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-16 bg-[#14182B]/80 border-l border-y border-[#2A3255]/20 rounded-l-lg flex items-center justify-center text-[#4A5280] hover:text-[#6C63FF] transition-all backdrop-blur-md z-40 group/close"
              >
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
          )}

          <div className={`flex flex-col h-full overflow-hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between px-5 h-14 border-b border-[#2A3255]/20">
                <div className="flex gap-4">
                    <button onClick={() => setActiveTab("chat")} className={`text-sm font-bold transition-all relative ${activeTab === 'chat' ? 'text-[#F0F2FF]' : 'text-[#8892B0]'}`}>
                        Chat
                        {activeTab === 'chat' && <div className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-[#6C63FF]" />}
                    </button>
                    <button onClick={() => setActiveTab("participants")} className={`text-sm font-bold transition-all relative ${activeTab === 'participants' ? 'text-[#F0F2FF]' : 'text-[#8892B0]'}`}>
                        Participants ({MOCK_PARTICIPANTS.length})
                        {activeTab === 'participants' && <div className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-[#6C63FF]" />}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              {activeTab === "chat" ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1.5 hide-scrollbar">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`group flex gap-3 px-2 py-1.5 rounded-lg transition-colors ${msg.type === 'system' ? 'bg-[#6C63FF]/5 border border-[#6C63FF]/10' : 'hover:bg-white/[0.03]'}`}>
                        {msg.type !== 'system' && (
                            <Avatar className="w-8 h-8 shrink-0 mt-0.5 ring-1 ring-white/10">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${msg.id + 100}`} />
                                <AvatarFallback>{msg.user[0]}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="flex-1 min-w-0">
                            {msg.type === 'system' ? (
                                <div className="flex items-center gap-2 text-[11px] text-[#6C63FF] font-medium">
                                    <AlertCircle className="h-3 w-3" /> {msg.text}
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className={`text-[12px] font-bold ${msg.role === 'host' ? 'text-[#E8A838]' : 'text-[#F0F2FF]'}`}>{msg.user}</span>
                                        <RoleBadge role={msg.role} tier={MOCK_PARTICIPANTS.find(p => p.name === msg.user)?.tier} />
                                        <span className="text-[10px] text-[#4A5280] opacity-0 group-hover:opacity-100 transition-opacity ml-auto">{msg.time}</span>
                                    </div>
                                    <p className="text-[13px] text-[#8892B0] leading-relaxed">{msg.text}</p>
                                </>
                            )}
                        </div>
                      </div>
                    ))}
                    {!allowChat && (
                        <div className="flex flex-col items-center justify-center p-8 text-center opacity-40">
                            <MessageCircleOff className="h-8 w-8 mb-2" />
                            <p className="text-xs font-bold">Chat has been disabled by host</p>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 bg-[#14182B]/40 border-t border-[#2A3255]/20">
                    <div className="flex flex-col gap-3">
                        <div className="relative group/input">
                            <Input 
                                disabled={!allowChat}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={allowChat ? "Type a message..." : "Chat disabled"} 
                                className="h-11 bg-[#1E2540]/40 border border-[#2A3255]/30 rounded-xl pl-4 pr-12 text-[13px] focus-visible:ring-[#6C63FF] text-[#F0F2FF]" 
                            />
                            <button onClick={handleSend} disabled={!message.trim() || !allowChat} className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-all ${message.trim() && allowChat ? 'text-[#6C63FF]' : 'text-[#4A5280] opacity-30'}`}>
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                   {MOCK_PARTICIPANTS.map((p) => (
                       <div key={p.id} onClick={() => setPinnedId(p.id)} className={`flex items-center justify-between p-2.5 rounded-xl transition-all group cursor-pointer border ${pinnedId === p.id ? 'bg-[#6C63FF]/10 border-[#6C63FF]/30' : 'hover:bg-white/[0.05] border-transparent'}`}>
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative shrink-0">
                                    <Avatar className={`w-10 h-10 border-2 ${p.tier === 'premium' ? 'border-[#C9993A]/50' : 'border-[#2A3255]'}`}>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${p.id + 100}`} />
                                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#14182B] ${p.status === 'synced' ? 'bg-[#2ECC71]' : 'bg-[#F39C12]'}`} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[13px] font-bold truncate text-[#F0F2FF]">{p.name}</span>
                                        <RoleBadge role={p.role} tier={p.tier} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A5280]">{p.status}</span>
                                </div>
                            </div>
                            <div className={`p-2 rounded-lg transition-all ${pinnedId === p.id ? 'bg-[#6C63FF] text-white' : 'opacity-0 group-hover:opacity-100 bg-white/5 text-[#4A5280]'}`}>
                                <Pin className="h-4 w-4" />
                            </div>
                       </div>
                   ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; filter: blur(0); }
          50% { opacity: 1; filter: blur(0); }
          100% { transform: translateY(-80vh) scale(2); opacity: 0; filter: blur(4px); }
        }
        .animate-float-up { animation: float-up linear forwards; }
      `}</style>
    </div>
  );
}
