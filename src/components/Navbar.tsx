"use client";

import { Utensils, Menu, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
  }, [dark]);

  return (
    <nav 
      className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-16 transition-all duration-300"
      style={{
        background: "rgba(11,11,13,0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-2 text-[#D4AF37]">
        <Utensils size={32} strokeWidth={2.5} />
        <span className="text-2xl font-serif font-bold tracking-tight text-white transition-colors">
          Nebula <span className="text-brand-yellow font-sans text-lg font-black uppercase tracking-widest bg-white/10 px-2 py-1 rounded">Dining & Bar</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest uppercase text-white/60 transition-colors">
        <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">Menu</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">Locations</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">Our Story</a>
        <Link href="/table-booking" className="hover:text-[#D4AF37] transition-colors duration-300">Table Booking</Link>
        <a href="#" className="hover:text-[#D4AF37] transition-colors duration-300">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex items-center justify-center p-2.5 rounded-full backdrop-blur-md bg-black/5 dark:bg-white/10 dark:border-white/20 border-black/10 border text-gray-900 dark:text-white transition-all transform hover:scale-105"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="md:hidden text-gray-900 dark:text-white">
          <Menu size={32} />
        </button>
      </div>
    </nav>
  );
}
