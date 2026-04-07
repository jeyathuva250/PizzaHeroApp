"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Pure CSS/Framer Motion 3D table - no Three.js required
export default function Table3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-20, 20]), {
    stiffness: 100,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full"
      style={{ height: 280, perspective: 1000 }}
    >
      {/* Glow ring below table */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.35), transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* 3D Table group */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Table top surface */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Table top */}
          <div
            className="w-52 h-52 rounded-full relative flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #C9A227 0%, #8B6914 40%, #D4AF37 70%, #9A7320 100%)",
              boxShadow:
                "0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.2), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)",
              border: "2px solid rgba(255,220,100,0.4)",
            }}
          >
            {/* Table cloth inner circle */}
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1a1208, #2a1e0a)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              {/* Center candle/decoration */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-3 h-8 rounded-sm"
                  style={{
                    background: "linear-gradient(to bottom, #fff8e0, #e8c86a)",
                    boxShadow: "0 0 10px rgba(255,200,50,0.8), 0 0 20px rgba(255,150,0,0.4)",
                  }}
                />
                {/* Flame */}
                <motion.div
                  animate={{
                    scaleX: [1, 1.3, 0.9, 1.2, 1],
                    scaleY: [1, 0.9, 1.1, 0.95, 1],
                    rotate: [-5, 5, -3, 7, -5],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-3 h-4 rounded-full -mt-2"
                  style={{
                    background: "radial-gradient(circle at 50% 60%, #fff5a0, #ffb700, #ff6b00, transparent)",
                    boxShadow: "0 0 12px rgba(255,180,0,0.9), 0 0 25px rgba(255,100,0,0.5)",
                    transformOrigin: "bottom center",
                  }}
                />
              </div>
            </div>

            {/* Table top ring decoration */}
            <div
              className="absolute inset-2 rounded-full pointer-events-none"
              style={{
                border: "1px solid rgba(255,220,100,0.3)",
                boxShadow: "0 0 15px rgba(212,175,55,0.2)",
              }}
            />
          </div>

          {/* Chairs around the table */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-115px)`,
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                {/* Chair */}
                <div className="flex flex-col items-center gap-0.5">
                  {/* Chair back */}
                  <div
                    className="w-10 h-6 rounded-t-xl"
                    style={{
                      background: "linear-gradient(135deg, #2a1e0a, #1a1208)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  />
                  {/* Chair seat */}
                  <div
                    className="w-12 h-4 rounded-md"
                    style={{
                      background: "linear-gradient(135deg, #C9A227, #8B6914)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.4), 0 0 10px rgba(212,175,55,0.2)",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Table leg */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-5 rounded-sm"
            style={{
              top: "100%",
              height: 50,
              background: "linear-gradient(to bottom, #9A7320, #6b5010)",
              boxShadow: "2px 0 8px rgba(0,0,0,0.4)",
            }}
          />
          {/* Leg base */}
          <div
            className="absolute left-1/2 -translate-x-1/2 h-3 rounded-full"
            style={{
              top: "calc(100% + 50px)",
              width: 70,
              background: "linear-gradient(135deg, #9A7320, #6b5010)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
          style={{
            left: `${25 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.5,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
