"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimePickerProps {
  selectedTime: string;
  setSelectedTime: (t: string) => void;
}

const TIME_SLOTS = [
  { time: "12:00", label: "Noon", available: true },
  { time: "13:00", label: "1 PM", available: true },
  { time: "14:00", label: "2 PM", available: false },
  { time: "17:00", label: "5 PM", available: true },
  { time: "18:00", label: "6 PM", available: true },
  { time: "18:30", label: "6:30", available: false },
  { time: "19:00", label: "7 PM", available: true },
  { time: "19:30", label: "7:30", available: true },
  { time: "20:00", label: "8 PM", available: true },
  { time: "20:30", label: "8:30", available: false },
  { time: "21:00", label: "9 PM", available: true },
  { time: "22:00", label: "10 PM", available: true },
];

export default function TimePicker({ selectedTime, setSelectedTime }: TimePickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-[24px] p-5"
      style={{
        background: "linear-gradient(135deg, rgba(26,26,31,0.9), rgba(14,14,18,0.9))",
        border: "1px solid rgba(212,175,55,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <Clock size={13} className="text-[#D4AF37]" />
        </div>
        <h3 className="text-white text-sm font-semibold tracking-wide">Select Time</h3>
        <span className="ml-auto text-[11px] text-[#D4AF37] font-light">{selectedTime}</span>
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map(({ time, label, available }) => {
          const isSelected = selectedTime === time;
          return (
            <motion.button
              key={time}
              onClick={() => available && setSelectedTime(time)}
              disabled={!available}
              className="relative py-2.5 px-2 rounded-[12px] flex flex-col items-center gap-0.5 overflow-hidden"
              style={{
                background: !available
                  ? "rgba(255,255,255,0.02)"
                  : isSelected
                    ? "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(168,133,42,0.12))"
                    : "rgba(255,255,255,0.03)",
                border: !available
                  ? "1px solid rgba(255,255,255,0.04)"
                  : isSelected
                    ? "1px solid rgba(212,175,55,0.6)"
                    : "1px solid rgba(212,175,55,0.08)",
                opacity: !available ? 0.35 : 1,
                boxShadow: isSelected ? "0 0 12px rgba(212,175,55,0.2)" : "none",
                cursor: !available ? "not-allowed" : "pointer",
                backdropFilter: !available ? "blur(2px)" : "none",
              }}
              whileHover={available ? { scale: 1.05 } : {}}
              whileTap={available ? { scale: 0.93 } : {}}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {/* Glow effect for selected */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-[12px] pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 8px rgba(212,175,55,0.15)",
                      "0 0 20px rgba(212,175,55,0.35)",
                      "0 0 8px rgba(212,175,55,0.15)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <span
                className="text-xs font-bold leading-none"
                style={{
                  color: isSelected ? "#D4AF37" : !available ? "rgba(255,255,255,0.2)" : "rgba(255, 255, 255, 0.36)",
                }}
              >
                {label}
              </span>
              <span
                className="text-[9px] leading-none"
                style={{
                  color: isSelected ? "rgba(212,175,55,0.6)" : "rgba(255, 255, 255, 0.65)",
                }}
              >
                {time}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
