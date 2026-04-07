import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollVideo from "@/components/ScrollVideo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] flex flex-col relative overflow-x-hidden">
      {/* Global Cinematic Background */}
      <div className="fixed inset-0 z-0 scale-105 pointer-events-none">
        <ScrollVideo 
          folderName="ezgif-71cf0ec5584085c1-jpg" 
          frameCount={240} 
        />
        {/* Cinematic atmospheric overlays across the whole site */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/40 via-transparent to-[#0B0B0D] z-10" />
        <div className="absolute inset-0 bg-[#0B0B0D]/20 backdrop-brightness-75 z-10" />
      </div>

      <Navbar />
      <Hero />
    </main>
  );
}
