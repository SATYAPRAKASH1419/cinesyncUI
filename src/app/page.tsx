"use client";

import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Play, Users, Mic, Video, 
  Globe, Zap,
  Star, Heart, Monitor, Airplay,
  Repeat, Tv, SmartphoneIcon,
  Activity, MapPin
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PricingSection } from "@/components/home/PricingSection";


interface SegmentCardProps {
  title: string;
  desc: string;
  icon: React.ElementType;
  image: string;
  index: number;
}

function SegmentCard({ title, desc, icon: Icon, image, index }: SegmentCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="p-1 rounded-[48px] bg-gradient-to-br from-[#2A3255] to-transparent group"
    >
       <div className="h-[500px] rounded-[44px] bg-[#14182B] overflow-hidden relative">
          <img src={image} className="w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1019] via-[#0E1019]/40 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 space-y-4">
             <div className="w-14 h-14 rounded-2xl bg-[#6C63FF] flex items-center justify-center shadow-lg shadow-[#6C63FF]/20">
                <Icon className="h-7 w-7 text-white" />
             </div>
             <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">{title}</h3>
             <p className="text-[#8892B0] font-medium leading-relaxed">{desc}</p>
          </div>
       </div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Background Aurora Energy
  const auroraRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const auroraScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);

  return (
    <div ref={containerRef} className="bg-[#0E1019] text-white selection:bg-[#6C63FF]/30 relative overflow-x-hidden">
      <Navbar />
      
      {/* ── Section 1: The Digital Aurora Hero ── */}
      <section className="relative h-[120vh] z-10">
         <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            
            {/* Background Energy Flow (The "Aurora") */}
            <motion.div 
               style={{ rotate: auroraRotate, scale: auroraScale }}
               className="absolute inset-0 pointer-events-none"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#6C63FF20,_transparent_70%)] animate-pulse" />
                  <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 opacity-30"
                  >
                     <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6C63FF] blur-[150px] rounded-full" />
                     <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#E8A838]/20 blur-[200px] rounded-full" />
                  </motion.div>
               </div>
            </motion.div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

            {/* Floating Metadata Hud (London & Mumbai) */}
            <motion.div 
               style={{ opacity: heroOpacity, y: useTransform(scrollYProgress, [0, 0.4], [0, -50]) }}
               className="absolute inset-x-0 top-1/4 flex justify-between px-20 pointer-events-none hidden md:flex"
            >
               <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-3">
                  <div className="flex items-center gap-3 text-[#6C63FF]">
                     <MapPin className="h-4 w-4" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Node_A: London</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-2xl font-display font-black">24</span>
                     <span className="text-[10px] font-black text-[#4A5280]">MS</span>
                  </div>
               </div>
               <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-3 text-right">
                  <div className="flex items-center gap-3 justify-end text-[#E8A838]">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Node_B: Mumbai</span>
                     <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex items-baseline gap-2 justify-end">
                     <span className="text-2xl font-display font-black">18</span>
                     <span className="text-[10px] font-black text-[#4A5280]">MS</span>
                  </div>
               </div>
            </motion.div>

            {/* Main Vision Content */}
            <motion.div 
               style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
               className="relative z-20 text-center space-y-12 px-6 max-w-5xl pt-32"
            >
               <div className="space-y-6">
                  <h1 className="text-8xl md:text-[160px] font-display font-black tracking-tighter leading-[0.75] uppercase text-white">
                     Bridge The <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#A88BFF] to-[#E8A838]">Distance.</span>
                  </h1>
                  <p className="text-2xl md:text-3xl text-[#8892B0] font-medium max-w-2xl mx-auto leading-relaxed">
                     CineSync collapses miles into milliseconds, making every screen a <span className="text-white">shared experience.</span>
                  </p>
               </div>

               <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-[#6C63FF] to-[#A88BFF] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                     <Button className="relative h-16 px-10 rounded-2xl bg-[#6C63FF] font-black text-xl shadow-[0_15px_40px_rgba(108,99,255,0.4)] hover:scale-105 active:scale-95 transition-all group overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3">
                           START SYNCING 
                           <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <motion.div 
                           initial={{ x: "-100%" }}
                           animate={{ x: "200%" }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                     </Button>
                  </div>
                  
                  <Button variant="outline" className="h-16 px-10 rounded-2xl border-white/10 text-white font-black text-lg backdrop-blur-xl hover:bg-white/5 transition-all flex items-center gap-4 group">
                     <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#EF4444]" />
                     LIVE DEMO
                  </Button>
               </div>
               <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center gap-4"
               >
                  <div className="w-[1px] h-20 bg-gradient-to-b from-[#6C63FF] to-transparent" />
                  <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[#4A5280]">Initialize Protocol</span>
               </motion.div>
            </motion.div>

            {/* Background "SYNC" Watermark that scales with scroll */}
            <motion.div 
               style={{ 
                  opacity: useTransform(scrollYProgress, [0, 0.5], [0.02, 0.05]),
                  scale: useTransform(scrollYProgress, [0, 1], [1, 2])
               }}
               className="absolute z-0 text-[500px] font-display font-black text-white select-none pointer-events-none uppercase tracking-widest"
            >
               SYNC
            </motion.div>
         </div>
      </section>

      {/* ── Section 2: The Sync Mastery (Problem & Solution) ── */}
      <section className="py-40 relative z-10 bg-[#0E1019] overflow-hidden border-t border-white/5">
         <div className="container px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative">
            <div className="absolute -top-40 -left-20 text-[240px] font-display font-black text-white/[0.01] select-none pointer-events-none">SYNC</div>
            
            <div className="space-y-12 relative z-10">
               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#6C63FF]">
                     <Activity className="h-5 w-5" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em]">Engineered For Precision</span>
                  </div>
                  <h2 className="text-6xl md:text-[90px] font-display font-black text-white tracking-tighter uppercase leading-[0.8] mb-4">
                     Distance <br />
                     <span className="text-[#6C63FF]">Doesn&apos;t Dsync.</span>
                  </h2>
                  <p className="text-[#8892B0] text-xl font-medium max-w-lg leading-relaxed">
                     We solved the desync frustration that has plagued co-watching for years. No more manual countdowns.
                  </p>
               </div>

               <div className="space-y-12">
                  {[
                     { 
                        title: "Sub-300ms Latency", 
                        desc: "Our proprietary heartbeat engine keeps all users perfectly aligned, even on unstable connections.",
                        icon: Zap
                     },
                     { 
                        title: "Universal OTT Sync", 
                        desc: "No browser extensions required. Native support for Hotstar, JioCinema, SonyLIV, and more.",
                        icon: Tv
                     },
                     { 
                        title: "Spatial Immersion", 
                        desc: "High-fidelity spatial voice and video that reacts to the content's audio levels.",
                        icon: Mic
                     }
                  ].map((feat, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-8 group"
                     >
                        <div className="w-16 h-16 rounded-[24px] bg-[#14182B] border border-[#2A3255] flex items-center justify-center shrink-0 group-hover:border-[#6C63FF] group-hover:bg-[#6C63FF]/10 transition-all duration-500">
                           <feat.icon className="h-7 w-7 text-[#6C63FF]" />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#6C63FF] transition-colors">{feat.title}</h4>
                           <p className="text-lg text-[#8892B0] font-medium leading-relaxed">{feat.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-[#6C63FF]/5 blur-[180px] rounded-full" />
               <div className="relative space-y-10">
                  {/* Traditional Experience Card */}
                  <div className="p-8 rounded-[48px] border border-[#2A3255] bg-[#0E1019]/80 backdrop-blur-3xl group opacity-40 hover:opacity-100 transition-opacity">
                     <div className="flex justify-between items-center mb-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#4A5280]">Traditional Screen-Share</span>
                        <div className="flex items-center gap-2 text-red-500">
                           <Activity className="h-4 w-4" />
                           <span className="text-[10px] font-black tracking-widest">LAG: 2.4s</span>
                        </div>
                     </div>
                     <div className="h-40 rounded-3xl bg-[#14182B] flex items-center justify-center overflow-hidden grayscale">
                        <div className="text-center space-y-2">
                           <Repeat className="h-10 w-10 text-[#4A5280] animate-spin mx-auto" />
                           <p className="text-[10px] font-black text-[#4A5280] uppercase tracking-widest">Buffering Desync...</p>
                        </div>
                     </div>
                  </div>

                  {/* CineSync Experience Card */}
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="p-10 rounded-[56px] border border-[#6C63FF]/40 bg-[#14182B]/60 backdrop-blur-3xl shadow-[0_40px_80px_rgba(108,99,255,0.1)] relative"
                  >
                     <div className="absolute -top-4 -right-4 bg-[#E8A838] text-black text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg">CINESYNC ENGINE</div>
                     <div className="flex justify-between items-center mb-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6C63FF]">Live Synchronized Stream</span>
                        <div className="flex items-center gap-2 text-[#2ECC71]">
                           <Zap className="h-4 w-4 fill-current" />
                           <span className="text-[10px] font-black tracking-widest">LAG: 24ms</span>
                        </div>
                     </div>
                     <div className="aspect-video rounded-3xl bg-[#0E1019] flex items-center justify-center relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" alt="Perfect Sync" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-20 h-20 rounded-full bg-[#6C63FF] flex items-center justify-center shadow-2xl">
                              <Play className="h-8 w-8 text-white fill-current ml-1" />
                           </div>
                        </div>
                     </div>
                     <div className="mt-8 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className="flex -space-x-2">
                              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + 50}`} className="w-8 h-8 rounded-full border-2 border-[#14182B]" alt="User" />)}
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Synced with Alex & Priya</span>
                        </div>
                        <div className="flex gap-2">
                           <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Mic className="h-4 w-4 text-[#6C63FF]" /></div>
                           <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><Video className="h-4 w-4 text-[#6C63FF]" /></div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* ── Section 3: Target Segments (Bento Grid) ── */}
      <section className="py-40 relative overflow-hidden">
         <div className="container px-6 mb-24 text-center">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 text-[300px] font-display font-black text-white/[0.02] select-none pointer-events-none uppercase">COMMUNITY</div>
            <h2 className="text-6xl md:text-[120px] font-display font-black text-white tracking-tighter uppercase leading-none mb-10">
               Built For <br />
               <span className="text-[#6C63FF]">The Collective.</span>
            </h2>
         </div>

         <div className="container px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            <SegmentCard 
               index={0}
               title="LDR Couples"
               desc="Bridge the miles with nightly movie dates that feel like you're on the same couch."
               icon={Heart}
               image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
            />
            <SegmentCard 
               index={1}
               title="Friend Groups"
               desc="From IPL match parties to weekend horror binges—group watch has never been this smooth."
               icon={Users}
               image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
            />
            <SegmentCard 
               index={2}
               title="Fandoms"
               desc="Host simulcast anime nights or reaction streams for your entire community."
               icon={Star}
               image="https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&q=80&w=800"
            />
            <SegmentCard 
               index={3}
               title="College Kids"
               desc="Watch lectures together or take a break with a communal sitcom marathon."
               icon={Tv}
               image="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
            />
            <SegmentCard 
               index={4}
               title="Creators"
               desc="Monetize your influence by hosting exclusive public watch parties for your fans."
               icon={Video}
               image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
            />
            <SegmentCard 
               index={5}
               title="Global NRI"
               desc="Stay connected with family in India by sharing the latest Bollywood hits in real-time."
               icon={Globe}
               image="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800"
            />
         </div>
      </section>

      {/* ── Section 4: Global & Tech Stack ── */}
      <section className="py-60 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6C63FF]/50 to-transparent" />
         <div className="container px-6 text-center space-y-32">
            <div className="space-y-10">
               <h3 className="text-xs font-black uppercase tracking-[0.5em] text-[#6C63FF]">Native Ecosystem Support</h3>
               <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-center opacity-40 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center gap-4"><Monitor className="h-12 w-12" /> <span className="text-[10px] font-black uppercase tracking-widest">Desktop</span></div>
                  <div className="flex flex-col items-center gap-4"><SmartphoneIcon className="h-12 w-12" /> <span className="text-[10px] font-black uppercase tracking-widest">Mobile</span></div>
                  <div className="flex flex-col items-center gap-4"><Airplay className="h-12 w-12" /> <span className="text-[10px] font-black uppercase tracking-widest">Cast Ready</span></div>
                  <div className="flex flex-col items-center gap-4"><Tv className="h-12 w-12" /> <span className="text-[10px] font-black uppercase tracking-widest">Smart TV</span></div>
               </div>
            </div>

            <div className="p-16 rounded-[64px] border border-[#2A3255] bg-[#14182B]/60 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-12 text-left relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                  <Repeat className="h-64 w-64 text-[#6C63FF]" />
               </div>
               <div className="space-y-6 relative z-10">
                  <h4 className="text-5xl font-display font-black text-white uppercase tracking-tighter">Ready For <br />The World.</h4>
                  <p className="text-[#8892B0] max-w-sm font-medium">Supporting Indian markets with <strong>Razorpay & Rs. pricing</strong>, and global markets with <strong>Stripe & $ pricing</strong>.</p>
               </div>
               <div className="flex gap-10 items-center relative z-10">
                  <div className="text-center">
                     <p className="text-4xl font-display font-black text-white">10k+</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#6C63FF]">Concurrent Rooms</p>
                  </div>
                  <div className="w-[1px] h-20 bg-[#2A3255]" />
                  <div className="text-center">
                     <p className="text-4xl font-display font-black text-white">4K</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#6C63FF]">HDR Support</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <PricingSection />

      {/* ── Final Call to Action ── */}
      <section className="py-60 relative overflow-hidden bg-[#0E1019]">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#6C63FF15,_transparent)]" />
         <div className="container px-6 relative z-10 text-center space-y-20">
            <h2 className="text-8xl md:text-[180px] font-display font-black tracking-tighter leading-[0.75] uppercase text-white">
               Make Every <br />
               <span className="text-[#6C63FF]">Screen Shared.</span>
            </h2>
            <div className="flex flex-col items-center gap-12">
               <Link href="/dashboard">
                  <Button className="bg-[#6C63FF] hover:bg-[#7B73FF] h-28 px-24 rounded-[56px] font-black text-4xl shadow-[0_0_80px_rgba(108,99,255,0.4)] transition-all hover:scale-105 active:scale-95 group flex items-center gap-4">
                     START WATCHING
                     <ArrowRight className="h-12 w-12 transition-transform group-hover:translate-x-4" />
                  </Button>
               </Link>
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4A5280]">Join 500,000+ Synchronized Viewers</p>
            </div>
         </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// ── Icons ──
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}
