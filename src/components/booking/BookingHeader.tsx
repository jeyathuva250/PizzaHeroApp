"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";

export default function BookingHeader() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: "rgba(11,11,13,0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
        {/* Back button */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <ArrowLeft size={16} className="text-[#D4AF37]" />
          </motion.div>
          <span className="text-sm text-gray-500 group-hover:text-[#D4AF37] transition-colors duration-300 hidden sm:block">
            Back
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-700" />

        {/* Title */}
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#D4AF37,#A8852A)" }}
          >
            <Utensils size={14} className="text-[#0B0B0D]" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm tracking-wide leading-none">
              Table Reservation
            </h1>
            <p className="text-gray-600 text-[11px] tracking-widest uppercase mt-0.5">
              Pizza Hero Restaurant
            </p>
          </div>
        </div>

        {/* Right badge */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(212,175,55,0.05)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-gray-400 tracking-widest uppercase">Available Now</span>
        </div>
      </div>
    </motion.header>
  );
}
