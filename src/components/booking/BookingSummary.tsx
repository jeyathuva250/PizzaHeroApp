"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingSummaryProps {
  selectedTable: number;
  guests: number;
  selectedDate: Date;
  selectedTime: string;
  onBook: () => void;
}

export default function BookingSummary({
  selectedTable,
  guests,
  selectedDate,
  selectedTime,
  onBook,
}: BookingSummaryProps) {
  const [isShining, setIsShining] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

  const summaryItems = [
    { label: "Table", value: `#${selectedTable}`, icon: "🪑" },
    { label: "Guests", value: `${guests} ${guests === 1 ? "Guest" : "Guests"}`, icon: "👥" },
    { label: "Date", value: formattedDate, icon: "📅" },
    { label: "Time", value: selectedTime, icon: "🕐" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-[24px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(30,22,10,0.95), rgba(14,14,18,0.95))",
        border: "1px solid rgba(212,175,55,0.2)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.05), inset 0 1px 0 rgba(212,175,55,0.12)",
      }}
    >
      {/* Top gradient strip */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
        }}
      />

      <div className="p-6 md:p-7">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Summary details */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span
                className="inline-block w-4 h-px"
                style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }}
              />
              Booking Summary
              <span
                className="inline-block w-4 h-px"
                style={{ background: "linear-gradient(270deg, #D4AF37, transparent)" }}
              />
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {summaryItems.map(({ label, value, icon }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-gray-600 tracking-widest uppercase">{label}</span>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={value}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="text-base">{icon}</span>
                      <span className="text-white text-sm font-semibold">{value}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="w-full md:w-auto">
            <motion.button
              ref={btnRef}
              onClick={() => {
                setIsShining(true);
                setTimeout(() => setIsShining(false), 800);
                onBook();
              }}
              onHoverStart={() => setIsShining(true)}
              onHoverEnd={() => setIsShining(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full md:w-auto px-10 py-4 rounded-[16px] font-bold text-sm tracking-widest uppercase overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #9A7320 50%, #D4AF37 100%)",
                backgroundSize: "200% 100%",
                color: "#0B0B0D",
                boxShadow: "0 0 30px rgba(212,175,55,0.3), 0 8px 25px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,220,100,0.4)",
                minWidth: 200,
              }}
            >
              {/* Shine animation */}
              <AnimatePresence>
                {isShining && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: "-100%", opacity: 0.7 }}
                    animate={{ x: "150%", opacity: 0 }}
                    exit={{}}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                      width: "60%",
                    }}
                  />
                )}
              </AnimatePresence>

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Reserve Table</span>
                <span className="text-base">✨</span>
              </span>
            </motion.button>

            <p className="text-gray-600 text-[10px] text-center md:text-right mt-2 tracking-wide">
              Free cancellation up to 2 hours before
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient strip */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
        }}
      />
    </motion.div>
  );
}
