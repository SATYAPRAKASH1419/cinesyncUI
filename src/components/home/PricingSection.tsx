"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Star, ShieldCheck, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Standard",
      price: "$0",
      desc: "Perfect for a casual movie night with close friends.",
      features: [
        "Up to 5 users per room",
        "HD (1080p) Streaming",
        "Standard Sync Engine",
        "Basic Emoji Reactions",
        "Global Server Access"
      ],
      cta: "Get Started Free",
      color: "from-[#2A3255] to-[#14182B]",
      accent: "#8892B0",
      highlight: false
    },
    {
      name: "Pro Elite",
      price: isAnnual ? "$3.99" : "$4.99",
      desc: "The definitive co-watching suite for pro creators.",
      features: [
        "Unlimited users per room",
        "4K Ultra-HDR Streaming",
        "Military-Grade Sync (Zero Latency)",
        "Spatial Audio Channels",
        "Custom Room Branding",
        "Priority 24/7 Support"
      ],
      cta: "Go Pro Now",
      color: "from-[#6C63FF] to-[#3B3599]",
      accent: "#6C63FF",
      highlight: true
    }
  ];

  return (
    <section className="w-full py-40 bg-[#0E1019] relative overflow-hidden border-t border-[#2A3255]/30">
      {/* Background Creative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-display font-black text-white/[0.02] select-none pointer-events-none uppercase">
        PLAN
      </div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E8A838]/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 text-[#6C63FF] text-[10px] font-black uppercase tracking-[0.3em]">
             <Sparkles className="h-3 w-3" />
             Pricing For Everyone
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Invest in <br />
            <span className="text-[#6C63FF]">Your Community.</span>
          </h2>
          
          {/* Custom Toggle Switch */}
          <div className="flex items-center gap-6 pt-4">
             <span className={cn("text-xs font-black uppercase tracking-widest transition-colors", !isAnnual ? "text-white" : "text-[#4A5280]")}>Monthly</span>
             <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-20 h-10 rounded-full bg-[#14182B] border border-[#2A3255] p-1.5 relative transition-all"
             >
                <motion.div 
                   animate={{ x: isAnnual ? 40 : 0 }}
                   className="w-6 h-6 rounded-full bg-[#6C63FF] shadow-[0_0_15px_#6C63FF]"
                />
             </button>
             <span className={cn("text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2", isAnnual ? "text-white" : "text-[#4A5280]")}>
                Annually
                <span className="bg-[#2ECC71]/10 text-[#2ECC71] text-[9px] px-2 py-0.5 rounded-md border border-[#2ECC71]/20">SAVE 20%</span>
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.01 }}
              className={cn(
                "relative p-10 rounded-[48px] border bg-[#14182B]/40 backdrop-blur-3xl overflow-hidden group transition-all duration-500",
                plan.highlight ? "border-[#6C63FF]/50 shadow-[0_40px_80px_rgba(108,99,255,0.15)]" : "border-[#2A3255] hover:border-white/20"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-10 right-10 bg-[#E8A838] text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg z-20">
                  Most Popular
                </div>
              )}
              
              {/* Background Gradient Mesh */}
              <div className={cn("absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-10 transition-opacity group-hover:opacity-20", plan.highlight ? "bg-[#6C63FF]" : "bg-white")} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="space-y-6 mb-12">
                   <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", plan.highlight ? "bg-[#6C63FF] text-white" : "bg-[#1E2540] text-[#8892B0]")}>
                        {plan.highlight ? <Zap className="h-6 w-6" /> : <Star className="h-6 w-6" />}
                      </div>
                      <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">{plan.name}</h3>
                   </div>
                   <p className="text-[#8892B0] font-medium leading-relaxed">{plan.desc}</p>
                </div>

                <div className="space-y-4 mb-12">
                   <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-display font-black text-white tracking-tighter">{plan.price}</span>
                      <span className="text-xs font-black uppercase tracking-widest text-[#4A5280]">/ month</span>
                   </div>
                   {isAnnual && plan.price !== "$0" && (
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#2ECC71]">Billed $47.88 yearly (20% Off)</p>
                   )}
                </div>

                <div className="flex-1 space-y-5 mb-16">
                   {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 group/item">
                         <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors", plan.highlight ? "bg-[#6C63FF]/20 text-[#6C63FF] group-hover/item:bg-[#6C63FF]" : "bg-[#2A3255] text-[#8892B0] group-hover/item:bg-white/20")}>
                            <Check className="h-3 w-3 stroke-[4]" />
                         </div>
                         <span className="text-sm font-bold text-[#F0F2FF] group-hover/item:translate-x-1 transition-transform">{feature}</span>
                      </div>
                   ))}
                </div>

                <Button className={cn(
                  "w-full h-16 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.98]",
                  plan.highlight 
                    ? "bg-[#6C63FF] hover:bg-[#7B73FF] text-white shadow-[0_20px_40px_rgba(108,99,255,0.3)]" 
                    : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                )}>
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center gap-8">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4A5280]">Payments secured by global standards</p>
           <div className="flex flex-wrap justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 text-white font-display font-black text-sm uppercase"><ShieldCheck className="h-4 w-4" /> SSL Encrypted</div>
              <div className="flex items-center gap-2 text-white font-display font-black text-sm uppercase"><IndianRupee className="h-4 w-4" /> Regional Pricing</div>
           </div>
        </div>
      </div>
    </section>
  );
}
