"use client";

import { Pizza, ShoppingBag, Menu, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
  }, [dark]);

  return (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-5 md:px-16 bg-transparent">
      <div className="flex items-center gap-2 text-brand-red">
        <Pizza size={36} strokeWidth={2.5} fill="#E53935" />
        <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white font-sans transition-colors">
          Slice<span className="text-brand-yellow">City</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600 dark:text-gray-300 transition-colors">
        <a href="#" className="hover:text-brand-red dark:hover:text-brand-yellow font-sans">Menu</a>
        <a href="#" className="hover:text-brand-red dark:hover:text-brand-yellow font-sans">Locations</a>
        <a href="#" className="hover:text-brand-red dark:hover:text-brand-yellow font-sans">Our Story</a>
        <a href="#" className="hover:text-brand-red dark:hover:text-brand-yellow font-sans">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex items-center justify-center p-2.5 rounded-full backdrop-blur-md bg-black/5 dark:bg-white/10 dark:border-white/20 border-black/10 border text-gray-900 dark:text-white transition-all transform hover:scale-105"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/10 backdrop-blur-md hover:bg-brand-red hover:text-white dark:hover:bg-brand-red px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-bold text-gray-900 dark:text-white border border-black/10 dark:border-white/20 hover:border-brand-red font-sans">
          <ShoppingBag size={18} />
          <span>Cart (0)</span>
        </button>
        <button className="md:hidden text-gray-900 dark:text-white">
          <Menu size={32} />
        </button>
      </div>
    </nav>
  );
}
