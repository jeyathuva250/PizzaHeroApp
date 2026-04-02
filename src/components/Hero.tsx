"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Flame, Star } from "lucide-react";
import Image from "next/image";
import { useRef, MouseEvent } from "react";

export default function Hero() {
  // Parallax Globals
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  // Parallax Depth Layers
  const pizzaX = useTransform(springX, [-1000, 1000], [35, -35]);
  const pizzaY = useTransform(springY, [-1000, 1000], [35, -35]);
  
  const bgGlowX = useTransform(springX, [-1000, 1000], [-80, 80]);
  const bgGlowY = useTransform(springY, [-1000, 1000], [-80, 80]);

  const textX = useTransform(springX, [-1000, 1000], [-10, 10]);
  const textY = useTransform(springY, [-1000, 1000], [-10, 10]);

  // Magnetic CTA setup
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSpringX = useSpring(btnX, { stiffness: 150, damping: 15 });
  const btnSpringY = useSpring(btnY, { stiffness: 150, damping: 15 });

  const handleBtnMouseMove = (e: MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnX.set(x * 0.4);
    btnY.set(y * 0.4);
  };

  const handleBtnMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  // 3D Tilt for Pizza Image
  const pizzaRef = useRef<HTMLDivElement>(null);

  const handlePizzaMove = (e: MouseEvent) => {
    if (!pizzaRef.current) return;
    const rect = pizzaRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    pizzaRef.current.style.transform = `
      rotateY(${x * 25}deg)
      rotateX(${-y * 25}deg)
      scale(1.05)
    `;
  };

  const handlePizzaLeave = () => {
    if (!pizzaRef.current) return;
    pizzaRef.current.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const renderOrbital = (emoji: string, radiusClass: string, duration: number, startAngle: number, bgStyle: string) => (
    <motion.div 
      initial={{ rotate: startAngle }}
      animate={{ rotate: startAngle + 360 }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -mt-7 -ml-7 md:-mt-8 md:-ml-8 z-30 pointer-events-none"
    >
      <div className={`transform ${radiusClass}`}>
        <motion.div 
          initial={{ rotate: -startAngle }}
          animate={{ rotate: -(startAngle + 360) }}
          transition={{ repeat: Infinity, duration, ease: "linear" }}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md border-[1.5px] ${bgStyle} shadow-lg`}
        >
          <span className="text-2xl md:text-3xl filter drop-shadow-md">{emoji}</span>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#FAF7F2] dark:bg-[#050505] transition-colors duration-500 perspective-1000"
    >
      {/* Cinematic Ambient Glows & Nebulas */}
      <motion.div 
        style={{ x: bgGlowX, y: bgGlowY }}
        animate={{ 
          scale: [1, 1.1, 1.0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] lg:w-[900px] lg:h-[900px] bg-[radial-gradient(circle,rgba(255,100,0,0.15),transparent_60%)] blur-[80px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(229,57,53,0.1),transparent_70%)] blur-[100px] rounded-full pointer-events-none" 
      />

      <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full h-full max-w-7xl">
        
        {/* Left Col - Text Content */}
        <motion.div 
          style={{ x: textX, y: textY }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start justify-center space-y-8 z-20 order-2 lg:order-1 relative"
        >


          {/* Heading */}
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-[5rem] font-sans font-black leading-[1.05] text-gray-900 dark:text-white tracking-tight transition-colors duration-500">
            Float Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-rose-500 drop-shadow-[0_0_30px_rgba(229,57,53,0.2)] dark:drop-shadow-[0_0_40px_rgba(229,57,53,0.3)]">
              Flavor Space
            </span><br />
            Tonight.
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg font-sans leading-relaxed text-balance transition-colors duration-500">
            Escape gravity. Our master-crafted celestial crust and levitating ingredients forge a cinematic culinary universe you simply have to taste to believe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto pt-4 relative">
            
            {/* Magnetic Button */}
            <motion.button 
              ref={btnRef}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
              }}
              style={{ x: btnSpringX, y: btnSpringY }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg font-sans shadow-[0_0_30px_rgba(229,57,53,0.3)] dark:shadow-[0_0_40px_rgba(229,57,53,0.5)] overflow-hidden group border border-red-400/30 touch-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">Explore Orbit <ArrowRight size={20} className="group-hover:translate-x-1 group-hover:-rotate-45 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            {/* Ghost CTA */}
            <motion.button 
              onClick={() => {
                window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 px-8 py-4 rounded-full font-bold text-lg font-sans transition-all border border-black/10 dark:border-transparent hover:border-black/20 dark:hover:border-white/20"
            >
              View Menu
            </motion.button>
          </motion.div>
          
          {/* Reviews/Trust */}
          <motion.div variants={fadeIn} className="pt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-brand-gray border-2 border-[#FAF7F2] dark:border-[#050505] flex items-center justify-center overflow-hidden transform hover:-translate-y-1 hover:scale-110 transition-transform cursor-pointer relative z-10 hover:z-20">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User avatar" width={40} height={40} className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-brand-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#FFB300" className="opacity-100 drop-shadow-[0_0_4px_rgba(255,179,0,0.4)] dark:drop-shadow-[0_0_8px_rgba(255,179,0,0.8)]" />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide transition-colors">4.9/5 from orbital citizens</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Col - Visual Universe */}
        <div className="relative flex justify-center items-center w-full min-h-[50vh] lg:min-h-[700px] order-1 lg:order-2 z-10 pointer-events-none lg:pointer-events-auto perspective-[1200px]">
          
          {/* Depth Glow Behind Pizza */}
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-orange-500/15 via-transparent to-red-500/15 dark:from-orange-500/10 dark:to-red-500/10 blur-[100px] dark:blur-[120px] pointer-events-none transition-colors" />

          {/* Parallax Central Pizza (The Core) */}
          <motion.div 
            style={{ x: pizzaX, y: pizzaY }}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
            className="absolute z-20 flex items-center justify-center cursor-pointer pointer-events-auto"
          >
            {/* Subtle Floating Motion */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative flex justify-center items-center"
            >
              {/* Glass Ring */}
              <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[550px] lg:h-[550px] rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md bg-white/30 dark:bg-white/5 opacity-80 dark:opacity-50 pointer-events-none transition-colors" />

              {/* Pizza Container with 3D Tilt */}
              <div
                ref={pizzaRef}
                onMouseMove={handlePizzaMove}
                onMouseLeave={handlePizzaLeave}
                className="relative transition-transform duration-200 ease-out will-change-transform w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[530px] lg:h-[530px]"
              >
                <div className="absolute inset-2 md:inset-4 rounded-full bg-gradient-to-br from-[#ffd8be] to-[#fff] dark:from-[#2a1608] dark:to-[#120a04] shadow-[0_0_80px_rgba(255,100,0,0.15)] dark:shadow-[0_0_80px_rgba(255,100,0,0.25)] border-[4px] border-white/50 dark:border-[#3a1d0d]/40 -z-10 transition-colors" />
                
                <Image
                  src="/pizza.png"
                  alt="Delicious Hot Pepperoni Pizza"
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 500px, 530px"
                  className="rounded-full object-cover shadow-[0_40px_80px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)] drop-shadow-[0_0_20px_rgba(255,100,0,0.15)] dark:drop-shadow-[0_0_30px_rgba(255,100,0,0.3)] hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Orbital System (Gravity Rings) */}
          <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full border border-black/5 dark:border-white/5 border-dashed transition-colors" />
          <div className="absolute w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] rounded-full border border-brand-orange/20 dark:border-brand-orange/10 opacity-30 dark:opacity-30" />
          <div className="absolute w-[460px] h-[460px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] rounded-full border border-black/5 dark:border-white/5 border-dashed transition-colors" />

          {/* Planets / Particles */}
          {/* Inner orbit */}
          {renderOrbital("🌿", "translate-x-[150px] sm:translate-x-[225px] md:translate-x-[275px]", 18, 0, "bg-[#e8f5e9]/90 dark:bg-[#0A1A0A]/80 border-green-500/30 dark:border-green-500/20")}
          {renderOrbital("🍅", "translate-x-[150px] sm:translate-x-[225px] md:translate-x-[275px]", 18, 180, "bg-[#ffebee]/90 dark:bg-[#2a0e0e]/80 border-red-500/30 dark:border-red-500/20")}

          {/* Middle orbit */}
          {renderOrbital("🍄", "translate-x-[190px] sm:translate-x-[275px] md:translate-x-[350px]", 25, 90, "bg-[#fff3e0]/90 dark:bg-[#1f1a15]/80 border-orange-400/50 dark:border-orange-900/40")}
          {/* Extra magic dust */}
          {renderOrbital("✨", "translate-x-[190px] sm:translate-x-[275px] md:translate-x-[350px]", 25, 270, "bg-[#fffde7]/90 dark:bg-[#1a1a0f]/80 border-yellow-500/30 dark:border-yellow-500/20 opacity-90 dark:opacity-80 scale-75")}

          {/* Outer orbit */}
          {renderOrbital("🌶️", "translate-x-[230px] sm:translate-x-[325px] md:translate-x-[425px]", 35, 220, "bg-[#ffebee]/90 dark:bg-[#2a0e0e]/80 border-red-400/50 dark:border-red-900/50 scale-110")}
          
        </div>
      </div>
    </section>
  );
}
