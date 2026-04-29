"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Menu, Globe, Play, 
  Settings, 
  MonitorPlay
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Browse", icon: Globe },
    { href: "/events", label: "Events", icon: Play },
    { href: "/creator", label: "Creator", icon: MonitorPlay },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-[100] w-full transition-all duration-500",
      scrolled 
        ? "h-16 border-b border-[#2A3255]/50 bg-[#0E1019]/80 backdrop-blur-2xl" 
        : "h-20 bg-transparent"
    )}>
      <div className="container flex h-full max-w-screen-2xl items-center justify-between px-6">
        
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
                <div className="absolute inset-0 bg-[#6C63FF] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <span className="font-display text-2xl font-black text-white tracking-tighter relative">
                    Cine<span className="text-[#6C63FF]">Sync</span>
                </span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-[#8892B0] hover:text-white transition-all flex items-center gap-2 rounded-xl hover:bg-white/5 group"
              >
                <link.icon className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:text-[#6C63FF] transition-all" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Auth Actions */}
        <div className="flex items-center gap-4">
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
                <Button variant="ghost" className="text-sm font-bold text-[#8892B0] hover:text-white hover:bg-white/5 px-5 h-10">
                    Sign In
                </Button>
            </Link>
            <Link href="/signup">
                <Button className="bg-[#6C63FF] hover:bg-[#7B73FF] text-white font-bold text-sm h-10 px-6 rounded-xl shadow-lg shadow-[#6C63FF]/20 transition-all active:scale-95">
                    Sign Up
                </Button>
            </Link>
          </div>

          {/* Settings Shortcut (Keep it subtle) */}
          <Link href="/settings" className="hidden sm:block">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl text-[#4A5280] hover:text-white hover:bg-white/5 transition-all">
                <Settings className="h-5 w-5" />
            </button>
          </Link>

          {/* Mobile Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-[#8892B0]" />}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] bg-[#0E1019]/95 backdrop-blur-2xl border-l border-[#2A3255] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <span className="font-display text-2xl font-black text-white tracking-tighter">
                    Cine<span className="text-[#6C63FF]">Sync</span>
                </span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-4 text-xl font-black text-[#8892B0] hover:text-[#6C63FF] transition-all flex items-center justify-between group rounded-2xl hover:bg-[#6C63FF]/5 border border-transparent hover:border-[#6C63FF]/20"
                  >
                    {link.label}
                    <link.icon className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-4">
                <Link href="/signup" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 bg-[#6C63FF] font-black text-lg rounded-2xl">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login" className="block text-center p-4 text-sm font-bold text-[#8892B0]" onClick={() => setIsMobileMenuOpen(false)}>
                  Already have an account? <span className="text-[#6C63FF]">Sign In</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
