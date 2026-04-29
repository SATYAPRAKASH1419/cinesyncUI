"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Palette, Bell, Shield, CreditCard, Download, 
  Crown, Zap, Monitor, Globe, Mail, Lock, LogOut,
  ChevronRight, Sparkles, CheckCircle2, Sliders, PlayCircle, Users,
  MessageSquare, Trash2, History, Languages,
  Eye, EyeOff, Smartphone, Laptop, Tablet, AlertCircle, Info,
  Search, ExternalLink, HardDrive, Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────
type SectionId = "profile" | "appearance" | "notifications" | "privacy" | "subscription";

interface Section {
  id: SectionId;
  label: string;
  icon: any;
  description: string;
}

const SECTIONS: Section[] = [
  { id: "profile", label: "My Profile", icon: User, description: "Personal info, avatar, and social bio" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Themes, typography, and player styling" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alerts for rooms, invites, and updates" },
  { id: "privacy", label: "Privacy & Security", icon: Shield, description: "Visibility, password, and active sessions" },
  { id: "subscription", label: "Subscription", icon: CreditCard, description: "Plan management and billing history" },
];

// ── Shared UI Primitives ───────────────────────────────────────────

function SettingsCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("p-6 rounded-3xl bg-[#14182B]/40 border border-[#2A3255]/30 backdrop-blur-md", className)}>
            {children}
        </div>
    );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-display font-extrabold text-[#F0F2FF] tracking-tight">{title}</h2>
      <p className="text-[#8892B0] text-sm mt-1">{description}</p>
    </div>
  );
}

function ToggleItem({ label, description, icon: Icon, checked, onChange }: { label: string; description: string; icon?: any; checked?: boolean; onChange?: (v: boolean) => void }) {
    return (
        <div className="flex items-center justify-between py-4 group">
            <div className="flex items-center gap-4">
                {Icon && <div className="p-2.5 rounded-xl bg-[#1E2540]/50 text-[#8892B0] group-hover:text-[#6C63FF] transition-colors"><Icon className="h-4.5 w-4.5" /></div>}
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#F0F2FF]">{label}</h4>
                    <p className="text-[11px] text-[#4A5280]">{description}</p>
                </div>
            </div>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}

// ── Section Components ──────────────────────────────────────────────

function ProfileSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <SettingsCard className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative group cursor-pointer">
          <Avatar className="w-24 h-24 border-4 border-[#1E2540] ring-2 ring-[#6C63FF]/20 shadow-2xl">
            <AvatarImage src="https://i.pravatar.cc/150?u=satya" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#F0F2FF]">Profile Picture</h3>
            <p className="text-xs text-[#8892B0]">Upload a custom avatar. Max 5MB (JPG, PNG, GIF).</p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <Button size="sm" className="bg-[#6C63FF] hover:bg-[#7B73FF] h-9 font-bold">Upload Image</Button>
            <Button size="sm" variant="ghost" className="text-[#E74C3C] hover:bg-[#E74C3C]/10 h-9 font-bold">Remove</Button>
          </div>
        </div>
      </SettingsCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-[#8892B0] text-[10px] font-black uppercase tracking-[0.2em] ml-1">Display Name</Label>
          <Input defaultValue="Satya" className="bg-[#14182B]/60 border-[#2A3255] h-12 focus:ring-[#6C63FF] text-[#F0F2FF] rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-[#8892B0] text-[10px] font-black uppercase tracking-[0.2em] ml-1">Account Language</Label>
          <div className="relative">
            <Input defaultValue="English (US)" readOnly className="bg-[#14182B]/60 border-[#2A3255] h-12 text-[#F0F2FF] rounded-xl pr-10" />
            <Languages className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A5280]" />
          </div>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label className="text-[#8892B0] text-[10px] font-black uppercase tracking-[0.2em] ml-1">Bio & Cinema Tastes</Label>
          <textarea 
            className="w-full min-h-[120px] bg-[#14182B]/60 border border-[#2A3255] rounded-2xl p-4 text-sm text-[#F0F2FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all resize-none"
            placeholder="Sci-fi lover, 4K enthusiast, and frequent Dune re-watcher..."
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-[#4A5280] uppercase tracking-[0.2em] ml-1">Connected Accounts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#1E2540]/30 border border-[#2A3255]/50 flex items-center justify-between group hover:border-[#6C63FF]/30 transition-all">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-[#1DA1F2]" />
              <span className="text-xs font-bold">Twitter</span>
            </div>
            <Button variant="ghost" className="text-[10px] uppercase font-bold text-[#6C63FF]">Connect</Button>
          </div>
          <div className="p-4 rounded-2xl bg-[#1E2540]/30 border border-[#2A3255]/50 flex items-center justify-between group hover:border-[#6C63FF]/30 transition-all">
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-[#F0F2FF]" />
              <span className="text-xs font-bold">GitHub</span>
            </div>
            <span className="text-[10px] font-bold text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-1 rounded">Linked</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AppearanceSection() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#4A5280] uppercase tracking-[0.2em] ml-1">Platform Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: 'dark', label: 'Dark Void', bg: 'bg-[#0E1019]', active: true },
                        { id: 'light', label: 'Snowpeak', bg: 'bg-[#F4F6FB]' },
                        { id: 'cinema', label: 'OLED Black', bg: 'bg-black' }
                    ].map((t) => (
                        <button key={t.id} className={cn(
                            "group flex flex-col items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
                            t.active ? "bg-[#6C63FF]/10 border-[#6C63FF] shadow-lg shadow-[#6C63FF]/10" : "bg-[#14182B]/40 border-[#2A3255] hover:border-[#6C63FF]/30"
                        )}>
                            <div className={cn("w-full aspect-video rounded-xl shadow-inner", t.bg)} />
                            <span className={cn("text-[10px] font-black uppercase tracking-widest", t.active ? "text-[#6C63FF]" : "text-[#8892B0]")}>{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <SettingsCard className="divide-y divide-[#2A3255]/30">
                <ToggleItem 
                    label="Cinematic Mode" 
                    description="Auto-hide interface elements during movie playback for distraction-free watching."
                    icon={PlayCircle}
                    checked={true}
                />
                <ToggleItem 
                    label="Glassmorphism" 
                    description="Enable translucent background blur effects for sidebar and overlays."
                    icon={Sparkles}
                    checked={true}
                />
                <ToggleItem 
                    label="Hardware Acceleration" 
                    description="Use your GPU to improve video rendering performance and smoothness."
                    icon={Monitor}
                    checked={true}
                />
            </SettingsCard>

            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#4A5280] uppercase tracking-[0.2em] ml-1">Video Playback Quality</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: 'Auto (Recommended)', desc: 'Best balance of quality and stability' },
                        { label: 'High Quality (4K)', desc: 'Prioritize resolution (Requires Pro)', premium: true }
                    ].map((q, i) => (
                        <div key={i} className={cn(
                            "p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group",
                            i === 0 ? "bg-[#6C63FF]/10 border-[#6C63FF]/40" : "bg-[#14182B]/40 border-[#2A3255] hover:border-[#6C63FF]/30"
                        )}>
                            <div className="space-y-1">
                                <h5 className="text-xs font-bold text-[#F0F2FF]">{q.label}</h5>
                                <p className="text-[10px] text-[#8892B0]">{q.desc}</p>
                            </div>
                            {q.premium && <Crown className="h-4 w-4 text-[#C9993A]" />}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function NotificationsSection() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <SettingsCard className="divide-y divide-[#2A3255]/30">
                <ToggleItem 
                    label="Room Invites" 
                    description="Get notified when a friend invites you to watch a movie together."
                    icon={Users}
                    checked={true}
                />
                <ToggleItem 
                    label="Message Mentions" 
                    description="Receive an alert when someone @mentions you in a public room chat."
                    icon={MessageSquare}
                    checked={true}
                />
                <ToggleItem 
                    label="Global Activity" 
                    description="Notifications about trending rooms and live events you might like."
                    icon={Zap}
                    checked={false}
                />
            </SettingsCard>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E2540]/30 to-transparent border border-[#2A3255]/30 space-y-6">
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#6C63FF]" />
                    <h4 className="text-sm font-bold">Email Preferences</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8892B0]">Product Updates & Features</span>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8892B0]">Security & Account Alerts</span>
                        <Switch defaultChecked disabled />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PrivacySection() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <SettingsCard className="divide-y divide-[#2A3255]/30">
                <ToggleItem 
                    label="Public Profile" 
                    description="Allow other users to search for you and see your favorite movie list."
                    icon={Eye}
                    checked={true}
                />
                <ToggleItem 
                    label="Show Activity" 
                    description="Let your followers see what room you are currently watching in."
                    icon={History}
                    checked={false}
                />
                <ToggleItem 
                    label="Room Encryption" 
                    description="Enforce end-to-end encryption for all private room messages."
                    icon={Lock}
                    checked={true}
                />
            </SettingsCard>

            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#4A5280] uppercase tracking-[0.2em] ml-1">Active Sessions</h4>
                <div className="space-y-3">
                    {[
                        { device: 'Windows PC • Chrome', location: 'New York, USA', current: true, icon: Laptop },
                        { device: 'iPhone 15 Pro • App', location: 'London, UK', current: false, icon: Smartphone }
                    ].map((session, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#14182B]/40 border border-[#2A3255]/30 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#1E2540] text-[#8892B0]"><session.icon className="h-5 w-5" /></div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-[#F0F2FF]">{session.device}</span>
                                        {session.current && <span className="text-[9px] font-black uppercase text-[#2ECC71] bg-[#2ECC71]/10 px-1.5 py-0.5 rounded">Current</span>}
                                    </div>
                                    <span className="text-[10px] text-[#4A5280]">{session.location}</span>
                                </div>
                            </div>
                            {!session.current && <Button variant="ghost" className="text-[#E74C3C] text-[10px] font-bold">Logout</Button>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4">
                <Button variant="ghost" className="text-[#E74C3C] hover:bg-[#E74C3C]/10 w-full justify-start gap-3 h-12 rounded-xl group">
                    <Trash2 className="h-4.5 w-4.5 group-hover:animate-bounce" />
                    <span className="text-xs font-bold uppercase tracking-widest">Delete Account Data</span>
                </Button>
            </div>
        </motion.div>
    );
}

function SubscriptionSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="relative overflow-hidden p-8 rounded-[32px] bg-gradient-to-br from-[#1C1A10] to-[#14182B] border border-[#C9993A]/30 shadow-[0_20px_50px_rgba(201,153,58,0.15)] group">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#C9993A]/10 blur-[80px] rounded-full group-hover:bg-[#C9993A]/20 transition-all duration-1000" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C9993A]/10 text-[#C9993A]"><Crown className="h-6 w-6" /></div>
                <h3 className="text-2xl font-display font-black text-white">CineSync Pro</h3>
              </div>
              <p className="text-[#C9993A]/80 text-sm font-medium">Currently on Free Plan • Limited Experience</p>
            </div>
            <Button className="bg-[#C9993A] hover:bg-[#D4A74B] text-[#1A1F3C] font-black px-8 h-12 rounded-xl shadow-lg shadow-[#C9993A]/20 transition-all hover:scale-105 active:scale-95">
              Upgrade Now
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {[
              { icon: Zap, text: "4K High-Bitrate Streaming" },
              { icon: Users, text: "Unlimited Room Size (100+)" },
              { icon: Sparkles, text: "Exclusive Premium Avatars" },
              { icon: PlayCircle, text: "Early Access to Features" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <CheckCircle2 className="h-4 w-4 text-[#C9993A]" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-[#4A5280] uppercase tracking-[0.2em] ml-1">Billing History</h4>
        <div className="rounded-2xl border border-[#2A3255]/30 bg-[#14182B]/40 overflow-hidden">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="bg-[#1E2540]/50 text-[#4A5280] font-black uppercase tracking-widest border-b border-[#2A3255]/30">
                        <th className="px-6 py-4">Invoice</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#2A3255]/30">
                    {[
                        { id: '#INV-9901', plan: 'Free Tier', amount: '$0.00', status: 'Paid' },
                        { id: '#INV-8822', plan: 'Pro Trial', amount: '$0.00', status: 'Expired' }
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-mono text-[#8892B0]">{row.id}</td>
                            <td className="px-6 py-4 font-bold text-[#F0F2FF]">{row.plan}</td>
                            <td className="px-6 py-4 text-[#8892B0]">{row.amount}</td>
                            <td className="px-6 py-4">
                                <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase", row.status === 'Paid' ? "bg-[#2ECC71]/10 text-[#2ECC71]" : "bg-[#4A5280]/20 text-[#4A5280]")}>
                                    {row.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Settings Page ───────────────────────────────────────────────

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  return (
    <div className="flex min-h-screen flex-col bg-[#0E1019] text-[#F0F2FF] selection:bg-[#6C63FF]/30 font-body">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#6C63FF]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E8A838]/5 blur-[120px] rounded-full" />
      </div>

      <main className="flex-1 relative z-10 px-6 sm:px-12">
        <div className="container max-w-6xl py-12">
            <div className="flex flex-col md:flex-row gap-16">
            
            <aside className="w-full md:w-80 shrink-0">
                <div className="sticky top-28 space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-display font-black text-white tracking-tight">Settings</h1>
                        <p className="text-sm text-[#8892B0]">Personalize your cinematic experience</p>
                    </div>

                    <div className="space-y-1.5">
                    {SECTIONS.map((section) => (
                        <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                            "w-full group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
                            activeSection === section.id 
                            ? "bg-[#6C63FF]/10 text-[#6C63FF]" 
                            : "text-[#8892B0] hover:bg-[#1E2540]/40 hover:text-[#F0F2FF]"
                        )}
                        >
                        {activeSection === section.id && (
                            <motion.div layoutId="nav-pill" className="absolute left-0 w-1 h-8 bg-[#6C63FF] rounded-r-full" />
                        )}
                        <section.icon className={cn("h-5 w-5 transition-all", activeSection === section.id ? "scale-110 drop-shadow-[0_0_8px_rgba(108,99,255,0.4)]" : "group-hover:scale-110")} />
                        <div className="flex flex-col items-start min-w-0">
                            <span className="text-sm font-bold tracking-tight">{section.label}</span>
                            <span className="text-[10px] opacity-60 truncate w-full">{section.description}</span>
                        </div>
                        </button>
                    ))}
                    </div>

                    <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#1E2540]/40 to-transparent border border-[#2A3255]/30">
                        <div className="flex items-center gap-3 mb-3">
                            <HardDrive className="h-4 w-4 text-[#6C63FF]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Storage</span>
                        </div>
                        <div className="h-1.5 bg-[#0E1019] rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-[#6C63FF] w-[12%] rounded-full shadow-[0_0_10px_rgba(108,99,255,0.5)]" />
                        </div>
                        <p className="text-[10px] text-[#8892B0] font-medium">1.2 GB of 10 GB used</p>
                    </div>

                    <button className="flex items-center gap-3 px-6 py-4 text-[#8892B0] hover:text-[#E74C3C] transition-colors group">
                        <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 min-w-0 max-w-3xl pb-24">
                <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {activeSection === "profile" && (
                    <>
                        <SectionHeader title="Account Identity" description="Update your public persona and social connections." />
                        <ProfileSection />
                    </>
                    )}
                    {activeSection === "appearance" && (
                    <>
                        <SectionHeader title="Visual & Player" description="Customize themes, hardware acceleration, and quality." />
                        <AppearanceSection />
                    </>
                    )}
                    {activeSection === "notifications" && (
                    <>
                        <SectionHeader title="Alert Preferences" description="Manage how and when CineSync reaches out to you." />
                        <NotificationsSection />
                    </>
                    )}
                    {activeSection === "privacy" && (
                    <>
                        <SectionHeader title="Security Hub" description="Audit active sessions and control your profile visibility." />
                        <PrivacySection />
                    </>
                    )}
                    {activeSection === "subscription" && (
                    <>
                        <SectionHeader title="CineSync Premium" description="Manage your pro features and billing history." />
                        <SubscriptionSection />
                    </>
                    )}
                </motion.div>
                </AnimatePresence>

                <div className="mt-16 pt-8 border-t border-[#2A3255]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-[#4A5280]">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Changes sync instantly across all devices</span>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <Button variant="ghost" className="flex-1 sm:flex-none text-[#8892B0] hover:text-[#F0F2FF] h-12 px-8 font-bold text-sm">Discard</Button>
                        <Button className="flex-1 sm:flex-none bg-[#6C63FF] hover:bg-[#7B73FF] text-white h-12 px-10 rounded-2xl font-bold text-sm shadow-lg shadow-[#6C63FF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
            </div>
        </div>
      </main>
    </div>
  );
}
