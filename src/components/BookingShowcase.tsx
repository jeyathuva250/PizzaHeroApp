"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookingShowcase() {
  return (
    <div className="relative w-full bg-[#FAF7F2]">

      {/* Layer 1: Sticky Light Title Section */}
      <div className="sticky top-0 w-full h-[70vh] flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-[12vw] font-black uppercase leading-none text-black tracking-tighter text-center"
        >
          The Art of Dining
        </motion.h2>
      </div>

      {/* Layer 2: Dark Section Content - Smoothly slides over Layer 1 with curvy borders */}
      <section className="relative w-full bg-[#0B0B0D] py-32 rounded-t-[5rem] rounded-b-[3rem] z-10 shadow-[0_-20px_80px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center justify-center gap-12">

            {/* Centered Content */}
            <div className="w-full flex flex-col items-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-8 w-full"
              >
                <div className="w-20 h-2 bg-brand-gold" />
                <h3 className="text-[14vw] md:text-[16vw] lg:text-[13vw] font-black uppercase leading-[0.8] tracking-tighter w-full">
                  <span
                    className="text-transparent bg-clip-text bg-fixed bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000')",
                      backgroundSize: 'cover'
                    }}
                  >
                    RESERVE <br />
                    YOUR ORBIT
                  </span>
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-2xl md:text-3xl text-white/50 leading-relaxed max-w-2xl text-balance"
              >
                Experience the pinnacle of culinary art. Our intimate seating and cosmic atmosphere provide the perfect backdrop for your most memorable evenings.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="pt-4"
              >
                <Link href="/table-booking">
                  <button className="flex items-center gap-4 bg-brand-gold text-black px-12 py-6 rounded-full font-black text-2xl uppercase group transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]">
                    Book a Table
                    <ArrowRight size={28} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
