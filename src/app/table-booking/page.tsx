"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TableBookingApp = dynamic(() => import("@/components/booking/TableBookingApp"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        <p className="text-[#D4AF37] font-light tracking-widest text-sm uppercase">Loading Experience</p>
      </div>
    </div>
  ),
});

export default function TableBookingPage() {
  return (
    <Suspense fallback={null}>
      <TableBookingApp />
    </Suspense>
  );
}
