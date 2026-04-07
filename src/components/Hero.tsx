"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Flame, Star, Pizza } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, MouseEvent, useEffect } from "react";

export default function Hero() {
  // Parallax Globals
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  // Scroll-based motion switching
  const handleScroll = () => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    scrollY.set(scrollProgress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax Depth Layers
  const pizzaX = useTransform(springX, [-1000, 1000], [100, -100]);
  const pizzaY = useTransform(springY, [-1000, 1000], [100, -100]);
  
  const bgGlowX = useTransform(springX, [-1000, 1000], [-80, 80]);
  const bgGlowY = useTransform(springY, [-1000, 1000], [-80, 80]);

  // Motion type based on scroll (30% vs 70%)
  const motionType = useTransform(scrollY, [0, 0.3, 0.31], ["slow", "fast", "medium"]);
  const animationIntensity = useTransform(scrollY, [0, 0.3, 0.31], [0.5, 1.5, 1]);

  const textX = useTransform(springX, [-1000, 1000], [-40, 40]);
  const textY = useTransform(springY, [-1000, 1000], [-40, 40]);

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

  function renderOrbital(emoji: string, radiusClass: string, duration: number, startAngle: number, bgStyle: string) {
    return (
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
  }

  return (
    <>
      {/* Cinematic Hero Section */}
      <div className="relative w-full min-h-[100vh]">
        <div className="relative z-10">
          <section 
            onMouseMove={handleMouseMove}
            className="relative w-full h-full flex items-center pt-24 pb-12 overflow-hidden bg-transparent transition-colors duration-500 perspective-1000"
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
          <motion.h1 
            variants={fadeIn} 
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold leading-[1.05] text-white tracking-tight drop-shadow-2xl"
          >
            Float Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5D05E] to-[#D4AF37] bg-[length:200%_auto] animate-shine">
              Flavor Space
            </span><br />
            Tonight.
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg font-sans leading-relaxed text-balance transition-colors duration-500">
            Escape the ordinary. From handcrafted burgers and artisanal pasta to celestial desserts and executive bar selections, we forge a culinary universe you simply have to taste to believe.
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
              <span className="text-xs text-gray-400 font-medium tracking-wide transition-colors">4.9/5 from 12k+ dining travelers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Col - Visual Universe */}
        <div className="relative flex justify-center items-center w-full min-h-[50vh] lg:min-h-[700px] order-1 lg:order-2 z-10 pointer-events-none lg:pointer-events-auto perspective-[1200px]">
          
          {/* Depth Glow Behind Pizza */}
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-orange-500/15 via-transparent to-red-500/15 dark:from-orange-500/10 dark:to-red-500/10 blur-[100px] dark:blur-[120px] pointer-events-none transition-colors" />

          {/* Orbital System (Gravity Rings) */}
          <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full border border-black/5 dark:border-white/5 border-dashed transition-colors" />
          <div className="absolute w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] rounded-full border border-brand-orange/20 dark:border-brand-orange/10 opacity-30 dark:opacity-30" />
          <div className="absolute w-[460px] h-[460px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] rounded-full border border-black/5 dark:border-white/5 border-dashed transition-colors" />

          {/* Planets / Particles */}
          {/* Inner orbit */}
          {renderOrbital("🍔", "translate-x-[150px] sm:translate-x-[225px] md:translate-x-[275px]", 18, 0, "bg-white/10 border-[#D4AF37]/30")}
          {renderOrbital("🍝", "translate-x-[150px] sm:translate-x-[225px] md:translate-x-[275px]", 18, 180, "bg-white/10 border-[#D4AF37]/20")}

          {/* Middle orbit */}
          {renderOrbital("☕", "translate-x-[190px] sm:translate-x-[275px] md:translate-x-[350px]", 25, 90, "bg-white/10 border-white/20")}
          {/* Extra magic dust */}
          {renderOrbital("🍰", "translate-x-[190px] sm:translate-x-[275px] md:translate-x-[350px]", 25, 270, "bg-white/10 border-white/20 opacity-90 scale-75")}

          {/* Outer orbit */}
          {renderOrbital("🍸", "translate-x-[230px] sm:translate-x-[325px] md:translate-x-[425px]", 35, 220, "bg-white/10 border-[#D4AF37]/50 scale-110")}
          
        </div>
      </div>
      </section>
        </div>
      </div>
      {/* Additional scrollable content for animation - Section 1: Features */}
      <div className="relative z-20 min-h-[100vh] bg-transparent backdrop-blur-[2px] border-t border-white/5">
        <div className="container mx-auto px-6 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight">The Galactic Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto rounded-full mb-8" />
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto font-light">
              We've transcended traditional boundaries to bring you a hand-curated menu harvested from the farthest reaches of the culinary nebula. From dry-aged wagyu to artisanal milk shakes, each category represents a singular planet in our gastronomic universe. Journey through our seven core pillars—each engineered with astronomical precision to redefine your understanding of flavor, texture, and celestial dining.
            </p>
          </motion.div>

          <div className="flex flex-col gap-64 pb-32">
            {[
              { icon: "🍔", title: "Astronomy Burgers", desc: "Hand-pressed wagyu patties infused with astronomical flavor and zero-gravity lightness.", highlight: "Wagyu Patties" },
              { icon: "🍝", title: "Artisan Pasta", desc: "House-made strands tossed in sauces harvested from the farthest reaches of taste.", highlight: "House-made Strands" },
              { icon: "🍸", title: "Celestial Bar", desc: "Mixology that transcends traditional boundaries with cosmic spirits and stardust rimming.", highlight: "Mixology" },
              { icon: "☕", title: "Nebula Brews", desc: "Artisanal coffee beans roasted under the pressure of deep-space flavor extraction.", highlight: "Artisanal Coffee" },
              { icon: "🍰", title: "Starlight Cakes", desc: "Multi-layered galactic confections with textures light as a nebula cloud.", highlight: "Decadent Confections" },
              { icon: "🍨", title: "Comet Ice Creams", desc: "Sub-zero chilled masterpieces featuring crystalline textures and infinite cosmic sweetness.", highlight: "Sub-Zero Masterpieces" },
              { icon: "🥤", title: "Stardust Shakes", desc: "Velvety, nebula-infused milk shakes blended with stardust-rimmed artisan ingredients.", highlight: "Artisan Milk Shakes" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, type: "spring", stiffness: 50 }}
                className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 border border-white/5 hover:border-[#D4AF37]/30 transition-all group overflow-hidden"
              >
                {/* Background numbers for linear feel */}
                <span className="absolute -top-10 -left-10 text-[15rem] font-black text-white/[0.02] pointer-events-none select-none">0{i + 1}</span>
                
                <div className="relative z-10 text-8xl md:text-9xl mb-8 md:mb-0 group-hover:scale-110 transition-transform duration-700">
                  {feature.icon}
                  <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="relative z-10 flex-1 space-y-6">
                  <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs opacity-70 mb-2 block">{feature.highlight}</span>
                  <h3 className="text-4xl md:text-7xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-500 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light font-sans max-w-xl">
                    {feature.desc}
                  </p>
                  
                  <div className="pt-8">
                    <motion.button 
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 text-[#D4AF37] font-bold text-lg group/btn"
                    >
                      Explore Menu 
                      <div className="w-12 h-px bg-[#D4AF37] group-hover/btn:w-24 transition-all" />
                    </motion.button>
                  </div>
                </div>

                {/* Animated Ambient Line */}
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Culinary Showcase */}
      <div className="relative z-20 min-h-[120vh] bg-transparent border-t border-white/5 flex items-center">
        <div className="container mx-auto px-6 py-48 flex flex-col items-center">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative w-full max-w-6xl rounded-[4rem] overflow-hidden aspect-[21/9] group shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-[30s]" />
            <div className="absolute bottom-16 left-16 z-20 max-w-2xl px-4 md:px-0">
              <span className="text-[#D4AF37] font-bold tracking-[0.4em] text-xs uppercase mb-6 block">Mastering the Elements</span>
              <h2 className="text-4xl md:text-8xl font-serif font-bold text-white mb-8 leading-[0.9]">The Cinematic <br />Experience.</h2>
              <div className="flex items-center gap-6">
                <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />
                <p className="text-lg text-white/50 leading-relaxed max-w-md font-light">
                  Our atmosphere is meticulously crafted to complement the depth of our celestial menu.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 3: Call to Action / Footer Journey */}
      <div className="relative z-20 min-h-[100vh] bg-transparent flex items-center justify-center border-t border-white/5">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter">Ready for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D05E]">Liftoff?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/table-booking">
                <button className="px-12 py-6 bg-[#D4AF37] text-black text-xl font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_50px_rgba(212,175,55,0.3)]">Reserve Your Orbit</button>
              </Link>
              <button className="px-12 py-6 bg-white/5 text-white text-xl font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all">Explore Menu</button>
            </div>
            
            <div className="pt-32 flex flex-col items-center gap-4 opacity-40">
              <div className="flex items-center gap-2 text-white">
                <Pizza size={24} />
                <span className="font-serif italic">SliceCity Galactic Headquarters - Sector 7</span>
              </div>
              <p className="text-sm">© 2026 Crafted with Stardust by Antigravity</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
