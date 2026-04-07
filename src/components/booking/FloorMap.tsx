"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface FloorMapProps {
  selectedTable: number;
  onSelectTable: (id: number) => void;
  bookedTables: number[];
}

const TABLE_POSITIONS = [
  // Row 1
  { id: 1, x: 0, y: 0, size: "medium" },
  { id: 2, x: 1, y: 0, size: "medium" },
  { id: 3, x: 2, y: 0, size: "large" }, // booked
  { id: 4, x: 3, y: 0, size: "medium" },
  // Row 2
  { id: 5, x: 0, y: 1, size: "large" },
  { id: 6, x: 1, y: 1, size: "medium" },
  { id: 7, x: 2, y: 1, size: "medium" }, // booked
  { id: 8, x: 3, y: 1, size: "medium" },
  // Row 3
  { id: 9, x: 0, y: 2, size: "medium" },
  { id: 10, x: 1, y: 2, size: "small" },
  { id: 11, x: 2, y: 2, size: "large" }, // booked
  { id: 12, x: 3, y: 2, size: "medium" },
];

const sizeMap = {
  small: { seats: 2, label: "2 seats" },
  medium: { seats: 4, label: "4 seats" },
  large: { seats: 6, label: "6 seats" },
};

export default function FloorMap({ selectedTable, onSelectTable, bookedTables }: FloorMapProps) {
  const [ripple, setRipple] = useState<{ id: number; x: number; y: number } | null>(null);

  const handleTableClick = (table: typeof TABLE_POSITIONS[0], e: React.MouseEvent) => {
    if (bookedTables.includes(table.id)) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple({ id: table.id, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onSelectTable(table.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-[24px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(26,26,31,0.9), rgba(14,14,18,0.9))",
        border: "1px solid rgba(212,175,55,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <MapPin size={15} className="text-[#D4AF37]" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-sm tracking-wide">Floor Plan</h2>
          <p className="text-gray-600 text-[11px]">Select your preferred table</p>
        </div>
        <div className="ml-auto flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "rgba(212,175,55,0.25)", border: "1px solid rgba(212,175,55,0.4)" }} />
            <span className="text-gray-500">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-red-900/50" style={{ border: "1px solid rgba(239,68,68,0.3)" }} />
            <span className="text-gray-500">Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "rgba(212,175,55,0.6)", border: "1px solid #D4AF37" }} />
            <span className="text-gray-500">Selected</span>
          </div>
        </div>
      </div>

      {/* Floor area */}
      <div className="p-5 relative">
        {/* Radial spotlight behind grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04), transparent)",
          }}
        />

        <div className="grid grid-cols-4 gap-3 relative z-10">
          {TABLE_POSITIONS.map((table) => {
            const isBooked = bookedTables.includes(table.id);
            const isSelected = selectedTable === table.id;
            const info = sizeMap[table.size as keyof typeof sizeMap];

            return (
              <motion.button
                key={table.id}
                onClick={(e) => handleTableClick(table, e)}
                disabled={isBooked}
                className="relative aspect-square rounded-[16px] flex flex-col items-center justify-center gap-1 overflow-hidden cursor-pointer select-none"
                style={{
                  background: isBooked
                    ? "rgba(40,10,10,0.6)"
                    : isSelected
                    ? "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(168,133,42,0.15))"
                    : "rgba(26,26,31,0.8)",
                  border: isBooked
                    ? "1px solid rgba(239,68,68,0.2)"
                    : isSelected
                    ? "1px solid rgba(212,175,55,0.7)"
                    : "1px solid rgba(212,175,55,0.1)",
                  boxShadow: isSelected
                    ? "0 0 20px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.1), inset 0 0 20px rgba(212,175,55,0.05)"
                    : isBooked
                    ? "none"
                    : "0 2px 8px rgba(0,0,0,0.3)",
                  cursor: isBooked ? "not-allowed" : "pointer",
                }}
                whileHover={
                  !isBooked
                    ? {
                        scale: 1.05,
                        boxShadow: isSelected
                          ? "0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)"
                          : "0 0 15px rgba(212,175,55,0.15), 0 6px 20px rgba(0,0,0,0.4)",
                      }
                    : {}
                }
                whileTap={!isBooked ? { scale: 0.95 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Pulsing glow for selected */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-[16px] pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(212,175,55,0.2)",
                        "0 0 30px rgba(212,175,55,0.4)",
                        "0 0 15px rgba(212,175,55,0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Ripple effect */}
                <AnimatePresence>
                  {ripple?.id === table.id && (
                    <motion.div
                      className="absolute rounded-full bg-[#D4AF37]/20 pointer-events-none"
                      style={{ left: ripple.x - 40, top: ripple.y - 40, width: 80, height: 80 }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                {/* Table icon */}
                <div className="flex flex-col items-center gap-0.5">
                  {/* Mini round table */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: isBooked
                        ? "rgba(60,20,20,0.8)"
                        : isSelected
                        ? "linear-gradient(135deg, #D4AF37, #9A7320)"
                        : "rgba(212,175,55,0.15)",
                      border: isBooked
                        ? "1px solid rgba(239,68,68,0.3)"
                        : isSelected
                        ? "1px solid rgba(255,220,100,0.6)"
                        : "1px solid rgba(212,175,55,0.25)",
                      color: isBooked ? "rgba(239,68,68,0.7)" : isSelected ? "#0B0B0D" : "#D4AF37",
                    }}
                  >
                    {table.id}
                  </div>

                  {/* Booked X or seat count */}
                  <span
                    className="text-[9px] font-medium tracking-wide"
                    style={{
                      color: isBooked
                        ? "rgba(239,68,68,0.6)"
                        : isSelected
                        ? "#D4AF37"
                        : "rgba(212,175,55,0.4)",
                    }}
                  >
                    {isBooked ? "Booked" : info.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected table info bar */}
        <AnimatePresence>
          {selectedTable && (
            <motion.div
              key={selectedTable}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <span className="text-[#D4AF37] text-xs">✓</span>
              <span className="text-gray-400 text-[11px]">
                Table <span className="text-[#D4AF37] font-semibold">{selectedTable}</span> selected —{" "}
                {sizeMap[TABLE_POSITIONS.find((t) => t.id === selectedTable)?.size as keyof typeof sizeMap]?.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
