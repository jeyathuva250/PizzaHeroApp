"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingState } from "./TableBookingApp";
import { RotateCcw } from "lucide-react";

interface BookingOverlayProps {
  state: BookingState;
  selectedTable: number;
  guests: number;
  selectedDate: Date;
  selectedTime: string;
  onReset: () => void;
}

// Inline canvas-confetti using script tag approach
function useConfetti(active: boolean) {
  const calledRef = useRef(false);
  useEffect(() => {
    if (!active || calledRef.current) return;
    calledRef.current = true;

    // Simple built-in confetti using canvas
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const GOLD = ["#D4AF37", "#FFD700", "#C9A227", "#F5D05E", "#9A7320", "#FFF8DC"];
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      angle: number;
      spin: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 4 + 2,
        color: GOLD[Math.floor(Math.random() * GOLD.length)],
        size: Math.random() * 8 + 4,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        alpha: 1,
      });
    }

    let frame: number;
    let elapsed = 0;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elapsed++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.angle += p.spin;
        p.alpha = Math.max(0, 1 - elapsed / 180);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });

      if (elapsed < 220) {
        frame = requestAnimationFrame(tick);
      } else {
        document.body.removeChild(canvas);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, [active]);
}

export default function BookingOverlay({
  state,
  selectedTable,
  guests,
  selectedDate,
  selectedTime,
  onReset,
}: BookingOverlayProps) {
  useConfetti(state === "success");

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(5,5,8,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <AnimatePresence mode="wait">
        {state === "loading" && (
          <motion.div
            key="loading"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Spinning ring */}
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid transparent",
                  borderTopColor: "#D4AF37",
                  borderRightColor: "rgba(212,175,55,0.3)",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full"
                style={{
                  border: "1px solid transparent",
                  borderBottomColor: "rgba(212,175,55,0.5)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">🍽️</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[#D4AF37] text-sm tracking-widest uppercase">Securing your table</p>
              <p className="text-gray-600 text-xs mt-1">Just a moment...</p>
            </div>
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative mx-4 rounded-[28px] overflow-hidden max-w-md w-full"
            style={{
              background: "linear-gradient(135deg, rgba(30,22,10,0.98), rgba(14,14,18,0.98))",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow:
                "0 0 80px rgba(212,175,55,0.15), 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,175,55,0.2)",
            }}
          >
            {/* Top gold strip */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              }}
            />

            <div className="p-8 flex flex-col items-center text-center gap-5">
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                className="relative"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(168,133,42,0.1))",
                    border: "2px solid rgba(212,175,55,0.4)",
                    boxShadow: "0 0 30px rgba(212,175,55,0.3)",
                  }}
                >
                  🍽️
                </div>
                {/* Checkmark badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.3 }}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #9A7320)",
                    boxShadow: "0 2px 10px rgba(212,175,55,0.5)",
                  }}
                >
                  <span className="text-[#0B0B0D] font-black text-sm">✓</span>
                </motion.div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-1"
              >
                <h2 className="text-white text-2xl font-bold tracking-tight">Table Reserved!</h2>
                <p className="text-gray-500 text-sm">Your dining experience awaits</p>
              </motion.div>

              {/* Booking details card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full rounded-[16px] p-4 text-left"
                style={{
                  background: "rgba(212,175,55,0.05)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                {[
                  { label: "Table", value: `#${selectedTable}` },
                  { label: "Guests", value: `${guests}` },
                  { label: "Date", value: formattedDate },
                  { label: "Time", value: selectedTime },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-600 text-xs tracking-widest uppercase">{label}</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </motion.div>

              {/* Confirmation number */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[#D4AF37] text-xs tracking-widest"
              >
                Confirmation #{Math.random().toString(36).slice(2, 10).toUpperCase()}
              </motion.div>

              {/* Reset button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onReset}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-[12px] text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <RotateCcw size={14} />
                Make Another Reservation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
