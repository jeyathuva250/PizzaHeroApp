"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Minus } from "lucide-react";

interface GuestSelectorProps {
  guests: number;
  setGuests: (n: number) => void;
}

const AVATAR_EMOJIS = ["👤", "👤", "👤", "👤", "👤", "👤"];

export default function GuestSelector({ guests, setGuests }: GuestSelectorProps) {
  const decrease = () => setGuests(Math.max(1, guests - 1));
  const increase = () => setGuests(Math.min(6, guests + 1));

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="rounded-[24px] p-5"
      style={{
        background: "linear-gradient(135deg, rgba(26,26,31,0.9), rgba(14,14,18,0.9))",
        border: "1px solid rgba(212,175,55,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <Users size={13} className="text-[#D4AF37]" />
        </div>
        <h3 className="text-white text-sm font-semibold tracking-wide">Party Size</h3>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between gap-4">
        {/* Minus */}
        <motion.button
          onClick={decrease}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          disabled={guests <= 1}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            opacity: guests <= 1 ? 0.3 : 1,
          }}
        >
          <Minus size={16} className="text-[#D4AF37]" />
        </motion.button>

        {/* Count display */}
        <div className="flex flex-col items-center flex-1">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={guests}
              initial={{ scale: 0.6, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-5xl font-bold leading-none"
              style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
            >
              {guests}
            </motion.span>
          </AnimatePresence>
          <span className="text-gray-600 text-[11px] tracking-widest uppercase mt-1">Guests</span>
        </div>

        {/* Plus */}
        <motion.button
          onClick={increase}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          disabled={guests >= 6}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(168,133,42,0.1))",
            border: "1px solid rgba(212,175,55,0.35)",
            opacity: guests >= 6 ? 0.3 : 1,
          }}
        >
          <Plus size={16} className="text-[#D4AF37]" />
        </motion.button>
      </div>

      {/* Avatar indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {AVATAR_EMOJIS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i < guests ? 1 : 0.4,
              opacity: i < guests ? 1 : 0.15,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{
              background: i < guests ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)",
              border: i < guests ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ fontSize: 14 }}>🧑</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
