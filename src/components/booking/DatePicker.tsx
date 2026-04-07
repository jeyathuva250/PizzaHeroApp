"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}

function generateDays() {
  const days = [];
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      month: monthNames[d.getMonth()],
    });
  }
  return days;
}

const days = generateDays();

export default function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
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
          <Calendar size={13} className="text-[#D4AF37]" />
        </div>
        <h3 className="text-white text-sm font-semibold tracking-wide">Select Date</h3>
        <span className="ml-auto text-[11px] text-[#D4AF37] font-light">
          {selectedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
      </div>

      {/* Horizontal scrollable date cards */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        {days.map((day, i) => {
          const isSelected = isSameDay(day.date, selectedDate);
          return (
            <motion.button
              key={i}
              onClick={() => setSelectedDate(day.date)}
              className="flex-shrink-0 flex flex-col items-center gap-0.5 w-12 py-2.5 rounded-[14px] transition-all"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(212,175,55,0.35), rgba(168,133,42,0.15))"
                  : "rgba(255,255,255,0.02)",
                border: isSelected
                  ? "1px solid rgba(212,175,55,0.6)"
                  : "1px solid rgba(255,255,255,0.05)",
                boxShadow: isSelected
                  ? "0 0 15px rgba(212,175,55,0.2), 0 4px 12px rgba(0,0,0,0.3)"
                  : "none",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <span
                className="text-[9px] font-medium tracking-widest uppercase"
                style={{ color: isSelected ? "#D4AF37" : "rgba(255,255,255,0.3)" }}
              >
                {day.dayName}
              </span>
              <span
                className="text-base font-bold leading-none"
                style={{ color: isSelected ? "#D4AF37" : "rgba(255,255,255,0.85)" }}
              >
                {day.dayNum}
              </span>
              <span
                className="text-[9px]"
                style={{ color: isSelected ? "rgba(212,175,55,0.7)" : "rgba(255,255,255,0.2)" }}
              >
                {day.month}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
