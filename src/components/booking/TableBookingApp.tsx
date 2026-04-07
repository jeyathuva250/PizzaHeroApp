"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingHeader from "./BookingHeader";
import Table3D from "./Table3D";
import FloorMap from "./FloorMap";
import GuestSelector from "./GuestSelector";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import BookingSummary from "./BookingSummary";
import BookingOverlay from "./BookingOverlay";

export type BookingState = "idle" | "loading" | "success";

const BOOKED_TABLES = [3, 7, 11];

export default function TableBookingApp() {
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [bookingState, setBookingState] = useState<BookingState>("idle");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Cursor glow tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleBook = () => {
    setBookingState("loading");
    setTimeout(() => setBookingState("success"), 2200);
  };

  const handleReset = () => {
    setBookingState("idle");
    setSelectedTable(1);
    setGuests(2);
    setSelectedDate(new Date());
    setSelectedTime("19:00");
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] overflow-x-hidden font-sans">
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-[2] w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
        animate={{ left: mousePos.x - 192, top: mousePos.y - 192 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      />

      {/* Ambient background particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Radial glow orbs */}
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_60%)] blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(180,100,50,0.06),transparent_70%)] blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05),transparent_60%)] blur-[120px]" />
      </div>

      {/* Sticky header */}
      <BookingHeader />

      {/* Hero 3D section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center pt-24 pb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center gap-2 mb-6"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-light">Reserve Your Evening</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white text-center leading-tight">
            Choose Your <span className="text-[#D4AF37]">Perfect Table</span>
          </h2>
          <p className="text-gray-500 text-sm text-center max-w-sm mt-1">
            An unforgettable dining experience curated just for you
          </p>
        </motion.div>

        {/* 3D floating table */}
        <Table3D />
      </motion.section>

      {/* Main booking grid */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 pb-12">
        {/* Spotlight radial behind grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.04),transparent_60%)] blur-[60px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Floor map (2/3 width) */}
          <div className="lg:col-span-2">
            <FloorMap
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
              bookedTables={BOOKED_TABLES}
            />
          </div>

          {/* Right: Guest + Date + Time (1/3 width) */}
          <div className="flex flex-col gap-5">
            <GuestSelector guests={guests} setGuests={setGuests} />
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimePicker selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
        </div>

        {/* Booking Summary + CTA */}
        <div className="mt-6">
          <BookingSummary
            selectedTable={selectedTable}
            guests={guests}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onBook={handleBook}
          />
        </div>
      </section>

      {/* Fullscreen booking overlay */}
      <AnimatePresence>
        {bookingState !== "idle" && (
          <BookingOverlay
            state={bookingState}
            selectedTable={selectedTable}
            guests={guests}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
