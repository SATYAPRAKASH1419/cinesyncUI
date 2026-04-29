"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-16 w-full shrink-0 border-t border-[#2A3255]/50 bg-[#0E1019] relative z-10">
      <div className="container px-6 sm:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="font-display text-2xl font-black text-white tracking-tighter group-hover:text-[#6C63FF] transition-colors">
                Cine<span className="text-[#6C63FF]">Sync</span>
              </span>
            </Link>
            <p className="text-sm text-[#8892B0] max-w-[320px] leading-relaxed">
              The ultimate co-watching experience. Built for friends, long-distance couples, and digital creators who love high-fidelity cinematic events.
            </p>
          </div>
          
          <div className="space-y-5">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Product</h4>
            <ul className="space-y-3 text-sm text-[#8892B0]">
              <li><Link href="/dashboard" className="hover:text-[#6C63FF] transition-colors">Browse Movies</Link></li>
              <li><Link href="/events" className="hover:text-[#6C63FF] transition-colors">Live Events</Link></li>
              <li><Link href="/creator" className="hover:text-[#6C63FF] transition-colors">Creator Studio</Link></li>
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-3 text-sm text-[#8892B0]">
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">API Docs</Link></li>
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Brand Assets</Link></li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-3 text-sm text-[#8892B0]">
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#6C63FF] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A3255]/50 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
             <p className="text-[10px] font-black text-[#4A5280] uppercase tracking-widest">
                © 2026 CineSync Corp. All rights reserved.
             </p>
             <p className="text-[10px] text-[#4A5280]">Made with ❤️ for the global cinema community.</p>
          </div>
          
          <div className="flex gap-8 items-center">
            <Link href="#" className="text-xs font-black text-[#4A5280] hover:text-[#6C63FF] uppercase tracking-widest transition-colors">Twitter</Link>
            <Link href="#" className="text-xs font-black text-[#4A5280] hover:text-[#6C63FF] uppercase tracking-widest transition-colors">Discord</Link>
            <Link href="#" className="text-xs font-black text-[#4A5280] hover:text-[#6C63FF] uppercase tracking-widest transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
