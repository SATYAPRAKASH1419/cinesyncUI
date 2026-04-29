"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Users, DollarSign, Calendar, TrendingUp, Plus, 
  BarChart3, Video, Clock, ChevronRight, LayoutDashboard,
  Settings, Sliders, Play, HardDrive, Sparkles,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Radio,
  Wallet, Headphones, MessageSquare, Globe, Search,
  Filter, Download, ExternalLink, ShieldCheck, Zap,
  Film, Trash2, Edit3, Eye, CalendarDays, PieChart,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────
type TabId = "overview" | "events" | "library" | "analytics" | "monetization";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: string;
}

// ── Sub-components ─────────────────────────────────────────────────

function StatCard({ label, value, change, isPositive, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-[#14182B]/40 border border-[#2A3255]/30 rounded-[28px] p-6 backdrop-blur-md relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10 transition-opacity group-hover:opacity-20", color)} />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={cn("p-3 rounded-2xl bg-opacity-10", color.replace('bg-', 'bg-opacity-10 text-'))}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-wider", isPositive ? "text-[#2ECC71]" : "text-[#E74C3C]")}>
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-xs font-bold text-[#4A5280] uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-3xl font-display font-black text-white tracking-tight">{value}</h4>
      </div>
    </motion.div>
  );
}

// ── Section Components ──────────────────────────────────────────────

function EventsTab() {
  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-4 bg-[#14182B]/60 p-1 rounded-2xl border border-[#2A3255]/30">
          {["All", "Scheduled", "Past", "Drafts"].map((t) => (
            <button key={t} className={cn("px-5 py-2 text-xs font-bold rounded-xl transition-all", t === "All" ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/20" : "text-[#8892B0] hover:text-white")}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative group w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A5280]" />
           <input placeholder="Filter events..." className="w-full h-11 bg-[#14182B]/60 border border-[#2A3255] rounded-xl pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 transition-all" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-[32px] border border-[#2A3255]/30 bg-[#14182B]/40 overflow-hidden relative z-10"
      >
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#1E2540]/50 text-[#4A5280] font-black uppercase tracking-widest border-b border-[#2A3255]/30">
              <th className="px-8 py-5">Event Detail</th>
              <th className="px-8 py-5">Date & Time</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Registrations</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A3255]/30">
            {[
              { name: "Spider-Verse Party", date: "Oct 12, 09:00 PM", status: "Live", reg: "2.4k", color: "text-[#E74C3C]" },
              { name: "Dune: Part Two", date: "Oct 14, 08:30 PM", status: "Scheduled", reg: "4.8k", color: "text-[#2ECC71]" },
              { name: "Anime Night: JJK", date: "Oct 15, 10:00 PM", status: "Draft", reg: "0", color: "text-[#8892B0]" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#1E2540] border border-[#2A3255] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Film className="h-4 w-4 text-[#6C63FF]" />
                    </div>
                    <span className="font-bold text-[#F0F2FF]">{row.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[#8892B0] font-medium">{row.date}</td>
                <td className="px-8 py-6">
                  <span className={cn("px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider", row.status === "Live" ? "bg-[#E74C3C]/10 text-[#E74C3C] animate-pulse" : "bg-[#2A3255] text-[#8892B0]")}>
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-bold text-[#F0F2FF]">{row.reg}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-[#8892B0] hover:text-[#6C63FF]"><Edit3 className="h-4 w-4" /></button>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-[#E74C3C]"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

function LibraryTab() {
  return (
    <div className="space-y-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Inception_4K_Remaster.mp4", size: "12.4 GB", date: "2 days ago" },
            { name: "Creator_Intro_Loop.webm", size: "450 MB", date: "5 days ago" },
            { name: "Interstellar_Official.mkv", size: "18.2 GB", date: "1 week ago" }
          ].map((file, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-3xl bg-[#14182B]/40 border border-[#2A3255]/30 group hover:border-[#6C63FF]/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                 <div className="p-3 rounded-2xl bg-[#1E2540] text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white transition-all">
                   <Video className="h-5 w-5" />
                 </div>
                 <button className="text-[#4A5280] hover:text-white"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 truncate">{file.name}</h4>
              <div className="flex items-center justify-between text-[10px] text-[#8892B0] font-black uppercase tracking-widest">
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
            </motion.div>
          ))}
          <div className="p-5 rounded-3xl border-2 border-dashed border-[#2A3255]/40 flex flex-col items-center justify-center gap-3 group hover:border-[#6C63FF]/40 transition-all cursor-pointer">
            <div className="p-3 rounded-2xl bg-[#6C63FF]/5 text-[#6C63FF] group-hover:bg-[#6C63FF]/10 transition-all">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8892B0]">Upload New File</span>
          </div>
        </div>
        
        <div className="space-y-6">
           <div className="p-6 rounded-[32px] bg-[#14182B]/40 border border-[#2A3255]/30 space-y-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <HardDrive className="h-24 w-24" />
              </div>
              <div className="flex items-center gap-3 relative z-10">
                 <HardDrive className="h-5 w-5 text-[#6C63FF]" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-white">Cloud Storage</h4>
              </div>
              <div className="space-y-4 relative z-10">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                       <span className="text-[#8892B0]">Used Space</span>
                       <span className="text-white">32.4 GB / 50 GB</span>
                    </div>
                    <div className="h-2.5 bg-[#0E1019] rounded-full overflow-hidden border border-white/5">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "64%" }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-[#6C63FF] to-[#A78BFF] rounded-full shadow-[0_0_10px_#6C63FF]" 
                        />
                    </div>
                 </div>
                 <Button variant="outline" className="w-full h-12 rounded-2xl border-[#2A3255] text-xs font-bold text-white hover:bg-[#6C63FF] hover:border-[#6C63FF] transition-all">Upgrade Storage</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
    return (
        <div className="space-y-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="p-8 rounded-[40px] bg-[#14182B]/40 border border-[#2A3255]/30 space-y-8 group">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Audience Retention</h4>
                        <div className="flex items-center gap-2 text-[#2ECC71] text-xs font-bold">
                            <TrendingUp className="h-3 w-3" /> +12%
                        </div>
                    </div>
                    <div className="h-64 flex items-end gap-2 px-2">
                        {[40, 60, 45, 90, 65, 80, 55, 70, 85, 50, 75, 95].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className="flex-1 bg-gradient-to-t from-[#6C63FF]/40 to-[#6C63FF] rounded-t-lg relative group/bar"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1E2540] px-3 py-1.5 rounded-xl text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-[#2A3255] shadow-2xl z-20">
                                    {h}% Retention
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-[#4A5280] uppercase tracking-widest px-2">
                        <span>Jan</span>
                        <span>Jun</span>
                        <span>Dec</span>
                    </div>
                </div>

                <div className="p-8 rounded-[40px] bg-[#14182B]/40 border border-[#2A3255]/30 space-y-10">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Global Reach</h4>
                        <Globe className="h-5 w-5 text-[#6C63FF]" />
                    </div>
                    <div className="space-y-8">
                        {[
                            { country: "India", share: 45, color: "bg-[#6C63FF]" },
                            { country: "United States", share: 22, color: "bg-[#E8A838]" },
                            { country: "Brazil", share: 15, color: "bg-[#2ECC71]" },
                            { country: "Others", share: 18, color: "bg-[#4A5280]" }
                        ].map((c, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-[#F0F2FF]">{c.country}</span>
                                    <span className="text-[#6C63FF]">{c.share}%</span>
                                </div>
                                <div className="h-2 bg-[#0E1019] rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${c.share}%` }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 1.2 }}
                                        className={cn("h-full rounded-full shadow-lg", c.color)} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MonetizationTab() {
    return (
        <div className="space-y-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="md:col-span-2 space-y-8">
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="p-10 rounded-[48px] bg-gradient-to-br from-[#1E2540] via-[#14182B] to-[#0E1019] border border-[#6C63FF]/30 flex flex-col sm:flex-row items-center justify-between gap-10 relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_#6C63FF10,_transparent)]" />
                        <div className="space-y-3 relative z-10">
                            <span className="text-[10px] font-black text-[#6C63FF] uppercase tracking-[0.3em]">Available Funds</span>
                            <h3 className="text-6xl font-display font-black text-white tracking-tighter">$4,250.80</h3>
                            <div className="flex items-center gap-2 text-xs text-[#2ECC71] font-bold">
                               <CheckCircle2 className="h-4 w-4" />
                               Next payout: Oct 15, 2026
                            </div>
                        </div>
                        <Button className="bg-[#6C63FF] hover:bg-[#7B73FF] h-16 px-12 rounded-2xl font-black text-sm shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all hover:scale-105 active:scale-95 z-10">
                          Withdraw Earnings
                        </Button>
                    </motion.div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#4A5280] px-4">Transaction Ledger</h4>
                        <div className="space-y-4">
                            {[
                                { desc: "Ticket Sales: Spider-Verse Party", amount: "+$1,240.00", date: "Oct 10", status: "Completed" },
                                { desc: "Monthly Pro Subscription", amount: "-$49.99", date: "Oct 01", status: "Completed" },
                                { desc: "Community Donation", amount: "+$25.00", date: "Sep 28", status: "Completed" }
                            ].map((tx, i) => (
                                <motion.div 
                                  key={i} 
                                  whileHover={{ x: 5 }}
                                  className="p-6 rounded-3xl bg-[#14182B]/40 border border-[#2A3255]/30 flex items-center justify-between group transition-all hover:border-[#6C63FF]/30"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={cn("p-3 rounded-2xl border border-white/5", tx.amount.startsWith('+') ? "bg-[#2ECC71]/10 text-[#2ECC71]" : "bg-[#E74C3C]/10 text-[#E74C3C]")}>
                                            <DollarSign className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-white group-hover:text-[#6C63FF] transition-colors">{tx.desc}</p>
                                            <p className="text-[10px] text-[#4A5280] font-black uppercase tracking-widest">{tx.date} • {tx.status}</p>
                                        </div>
                                    </div>
                                    <span className={cn("text-lg font-black", tx.amount.startsWith('+') ? "text-[#2ECC71]" : "text-white/40")}>{tx.amount}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                   <div className="p-8 rounded-[40px] bg-[#14182B]/40 border border-[#2A3255]/30 space-y-10">
                       <h4 className="text-sm font-black uppercase tracking-widest text-white">Revenue Sources</h4>
                       <div className="space-y-8">
                           {[
                               { label: "Ticket Sales", share: 75, icon: Calendar, color: "bg-[#6C63FF]" },
                               { label: "Donations", share: 15, icon: Heart, color: "bg-[#E8A838]" },
                               { label: "Ads Share", share: 10, icon: Zap, color: "bg-[#2ECC71]" }
                           ].map((s, i) => (
                               <div key={i} className="flex items-center gap-5">
                                   <div className="p-3 rounded-2xl bg-[#1E2540] text-white border border-white/5"><s.icon className="h-5 w-5" /></div>
                                   <div className="flex-1 space-y-2">
                                       <div className="flex justify-between text-xs font-bold">
                                           <span className="text-white">{s.label}</span>
                                           <span className="text-[#8892B0]">{s.share}%</span>
                                       </div>
                                       <div className="h-1.5 bg-[#0E1019] rounded-full overflow-hidden">
                                           <motion.div 
                                              initial={{ width: 0 }}
                                              animate={{ width: `${s.share}%` }}
                                              transition={{ duration: 1.5, delay: 1 }}
                                              className={cn("h-full rounded-full shadow-lg", s.color)} 
                                            />
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

// ── Main Creator Studio Page ─────────────────────────────────────────

export default function CreatorStudio() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Event Manager", icon: Calendar },
    { id: "library", label: "Content Library", icon: HardDrive },
    { id: "analytics", label: "Deep Analytics", icon: BarChart3 },
    { id: "monetization", label: "Earnings", icon: Wallet },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0E1019] text-[#F0F2FF] font-body selection:bg-[#6C63FF]/30 relative overflow-x-hidden">
      <Navbar />

      {/* ── Background Creative Elements ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Massive Low Opacity Background Text */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.03 }}
           className="absolute -top-20 -left-20 text-[300px] font-display font-black leading-none select-none"
        >
           STUDIO
        </motion.div>
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.02 }}
           className="absolute bottom-0 right-[-100px] text-[400px] font-display font-black leading-none select-none"
        >
           LIVE
        </motion.div>

        {/* Floating Gradients */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[#6C63FF]/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#E8A838]/3 blur-[150px] rounded-full" />
        
        {/* Animated Grid Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="flex-1 relative z-10 flex">
        
        {/* ── Studio Sidebar ── */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-[#2A3255]/30 bg-[#0E1019]/40 backdrop-blur-3xl p-8 sticky top-20 h-[calc(100vh-80px)]">
           <div className="space-y-2 mb-16">
             {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabId)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group relative",
                    activeTab === item.id 
                      ? "bg-[#6C63FF]/10 text-[#6C63FF] shadow-inner" 
                      : "text-[#8892B0] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {activeTab === item.id && (
                    <motion.div layoutId="studio-nav" className="absolute left-0 w-1.5 h-10 bg-[#6C63FF] rounded-r-full shadow-[0_0_15px_#6C63FF]" />
                  )}
                  <item.icon className={cn("h-5 w-5 transition-transform", activeTab === item.id ? "scale-110 drop-shadow-[0_0_8px_#6C63FF50]" : "group-hover:scale-110")} />
                  <span className="text-sm font-black tracking-tight">{item.label}</span>
                </button>
             ))}
           </div>

           <div className="mt-auto p-8 rounded-[40px] bg-gradient-to-br from-[#1E2540] to-[#0E1019] border border-[#2A3255]/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                 <Sparkles className="h-20 w-20" />
              </div>
              <div className="flex items-center gap-2 text-[#C9993A] mb-4 relative z-10">
                 <Sparkles className="h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Studio Elite</span>
              </div>
              <p className="text-[11px] text-[#8892B0] mb-6 leading-relaxed relative z-10">Your creator level is <strong>Elite</strong>. Enjoy priority bandwidth and custom room skins.</p>
              <Button className="w-full h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all relative z-10">
                 Upgrade Features
              </Button>
           </div>
        </aside>

        {/* ── Main Content Area ── */}
        <div className="flex-1 p-8 md:p-16 min-w-0">
           <div className="max-w-6xl mx-auto space-y-16">
             
             {/* Dynamic Header with Scrolling Text Behind */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative">
               <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-3 text-[#6C63FF]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Stream Active</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none uppercase">
                    {sidebarItems.find(i => i.id === activeTab)?.label}
                 </h2>
                 <p className="text-lg text-[#8892B0] font-medium">Hello, Satya. Your audience is peaking today.</p>
               </div>
               
               <div className="flex items-center gap-5 w-full md:w-auto relative z-10">
                 <Button variant="ghost" className="flex-1 md:flex-none h-14 px-10 rounded-2xl border border-[#2A3255] text-sm font-bold text-[#8892B0] hover:text-white hover:bg-white/5 transition-all">
                    Help Center
                 </Button>
                 <Button className="flex-1 md:flex-none bg-[#6C63FF] hover:bg-[#7B73FF] h-14 px-12 rounded-2xl font-black text-sm shadow-[0_0_40px_rgba(108,99,255,0.4)] transition-all hover:scale-105 active:scale-95 gap-3">
                    <Plus className="h-5 w-5" />
                    New Event
                 </Button>
               </div>

               {/* Watermark in background */}
               <div className="absolute -top-10 -right-20 text-[120px] font-display font-black text-white/[0.03] select-none pointer-events-none uppercase">
                  {activeTab}
               </div>
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className="space-y-16"
               >
                 {activeTab === "overview" && (
                   <>
                     {/* Stats Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                       <StatCard label="Live Viewers" value="4,281" change="+12.5%" isPositive={true} icon={Users} color="bg-[#6C63FF]" />
                       <StatCard label="Total Revenue" value="$12,840" change="+8.2%" isPositive={true} icon={Wallet} color="bg-[#2ECC71]" />
                       <StatCard label="Watch Time" value="1.2k hrs" change="-2.4%" isPositive={false} icon={Clock} color="bg-[#E8A838]" />
                       <StatCard label="Engagement" value="94.2%" change="+5.1%" isPositive={true} icon={MessageSquare} color="bg-[#E74C3C]" />
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                       {/* Recent Activity */}
                       <div className="lg:col-span-2 space-y-8">
                         <div className="flex items-center justify-between px-4">
                           <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">Active Room Streams</h3>
                           <Button onClick={() => setActiveTab('events')} variant="link" className="text-[#6C63FF] text-xs font-black uppercase tracking-[0.2em]">Manage All</Button>
                         </div>
                         <div className="space-y-5">
                           {[
                             { title: "Spider-Verse Community Watch", time: "Started 45m ago", viewers: "2.4k", revenue: "$450" },
                             { title: "Dune: Part Two (IMAX Edition)", time: "Starts at 9:00 PM", viewers: "850 registered", revenue: "$1.2k pre-sales" }
                           ].map((item, i) => (
                             <motion.div 
                               key={i} 
                               whileHover={{ scale: 1.02 }}
                               className="p-8 rounded-[40px] bg-[#14182B]/40 border border-[#2A3255]/30 flex items-center justify-between group hover:border-[#6C63FF]/40 transition-all shadow-xl"
                             >
                               <div className="flex items-center gap-8">
                                 <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-[#1E2540] to-[#0E1019] flex items-center justify-center border border-[#2A3255] group-hover:shadow-[0_0_20px_#6C63FF30] transition-all overflow-hidden relative">
                                   <div className="absolute inset-0 bg-[#6C63FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                   <Video className="h-8 w-8 text-[#6C63FF] relative z-10" />
                                 </div>
                                 <div className="space-y-2">
                                   <h4 className="text-xl font-bold text-white group-hover:text-[#6C63FF] transition-colors">{item.title}</h4>
                                   <div className="flex items-center gap-5 text-[10px] text-[#4A5280] font-black uppercase tracking-widest">
                                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {item.time}</span>
                                      <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {item.viewers}</span>
                                   </div>
                                 </div>
                               </div>
                               <div className="text-right space-y-2">
                                 <p className="text-xl font-black text-[#2ECC71]">{item.revenue}</p>
                                 <div className="flex justify-end gap-2">
                                    <button className="p-2.5 rounded-xl hover:bg-white/5 text-[#8892B0] transition-colors"><Edit3 className="h-4 w-4" /></button>
                                    <button className="p-2.5 rounded-xl hover:bg-white/5 text-[#8892B0] transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
                                 </div>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                       </div>

                       {/* Creator Health & Tips */}
                       <div className="space-y-10">
                          <h3 className="text-2xl font-display font-black text-white px-4 uppercase tracking-tight">Studio Growth</h3>
                          <motion.div 
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[48px] bg-gradient-to-br from-[#6C63FF] via-[#3B3599] to-[#0E1019] text-white space-y-8 shadow-[0_30px_60px_rgba(108,99,255,0.3)] relative overflow-hidden group border border-white/10"
                          >
                             <Sparkles className="absolute -top-10 -right-10 h-48 w-48 opacity-10 group-hover:rotate-45 transition-transform duration-1000" />
                             <div className="space-y-4">
                               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                                  <Zap className="h-6 w-6" />
                               </div>
                               <h4 className="text-3xl font-display font-black leading-tight tracking-tight uppercase">Master The <br />Room Sync</h4>
                               <p className="text-white/70 text-sm font-medium leading-relaxed">Hosts using low-latency mode see 2.5x more emoji reactions per minute.</p>
                             </div>
                             <Button className="bg-white text-[#6C63FF] hover:bg-[#F0F2FF] w-full rounded-2xl font-black h-14 text-sm shadow-xl transition-all hover:scale-105 active:scale-95">
                               Enable Low-Latency
                             </Button>
                          </motion.div>
                          
                          <div className="p-10 rounded-[40px] border border-[#2A3255]/30 bg-[#14182B]/20 space-y-8 relative overflow-hidden group">
                             <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                   <div className="h-12 w-12 rounded-2xl bg-[#E8A838]/10 flex items-center justify-center text-[#E8A838] border border-[#E8A838]/20 group-hover:scale-110 transition-transform">
                                      <Headphones className="h-6 w-6" />
                                   </div>
                                   <h5 className="text-sm font-black text-white uppercase tracking-widest">Studio Status</h5>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-[#2ECC71] animate-pulse shadow-[0_0_10px_#2ECC71]" />
                             </div>
                             <div className="space-y-5 relative z-10">
                                <div className="space-y-2">
                                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                      <span className="text-[#8892B0]">Global Bandwidth</span>
                                      <span className="text-[#2ECC71]">Optimal</span>
                                   </div>
                                   <div className="h-2 bg-[#0E1019] rounded-full overflow-hidden border border-white/5">
                                      <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: "24%" }}
                                         transition={{ duration: 2 }}
                                         className="h-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full shadow-[0_0_10px_#2ECC7140]" 
                                      />
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                     </div>
                   </>
                 )}

                 {activeTab === "events" && <EventsTab />}
                 {activeTab === "library" && <LibraryTab />}
                 {activeTab === "analytics" && <AnalyticsTab />}
                 {activeTab === "monetization" && <MonetizationTab />}

               </motion.div>
             </AnimatePresence>

           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── Icons ──
function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
