'use client';

import { useEffect, useRef, useState } from 'react';

// DATA
const reviews = [
  {
    id: "LOG_042",
    client: "Nebula Dynamics",
    role: "AI Research",
    text: "The interface Nova built didn't just display our data; it evolved with it. The neural feedback loop increased user retention by 400%.",
    signal: 98
  },
  {
    id: "LOG_089",
    client: "CyberCore Ltd",
    role: "Fintech Security",
    text: "We needed a fortress that looked like a gallery. Nova Synthesis delivered a military-grade frontend with zero compromise on aesthetics.",
    signal: 100
  },
  {
    id: "LOG_112",
    client: "HyperLoop One",
    role: "Transportation",
    text: "Efficiency is our currency. Nova optimized our rendering engine to run at 120fps on mobile. Absolute wizardry.",
    signal: 94
  },
  {
    id: "LOG_204",
    client: "Vortex Energy",
    role: "Clean Tech",
    text: "They translated our complex backend logic into a fluid, intuitive dashboard. The latency dropped to near zero.",
    signal: 99
  },
  {
    id: "LOG_331",
    client: "Shadow Moses",
    role: "Defense Contractor",
    text: "Secure, robust, and visually intimidating. Exactly what we requested for our internal command center.",
    signal: 97
  }
];

// Triple the array to create a seamless infinite scroll illusion
const scrollContent = [...reviews, ...reviews, ...reviews];

export default function ReviewSection() {
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  
  // Interaction State
  const [isPaused, setIsPaused] = useState(false);

  // -------------------------------------------
  // AUTO-SCROLL ENGINE
  // -------------------------------------------
  useEffect(() => {
    let animationFrameId: number;

    const animateScroll = () => {
      // 1. DESKTOP (Vertical Scroll)
      if (desktopScrollRef.current && !isPaused) {
        const el = desktopScrollRef.current;
        // Increased speed from 0.5 to 1.0 for better visibility
        el.scrollTop += 1.0; 
        
        // Seamless Loop: If we scroll past the first set (1/3rd), snap back to 0
        if (el.scrollTop >= el.scrollHeight / 3) {
          el.scrollTop = 0;
        }
      }

      // 2. MOBILE (Horizontal Scroll)
      if (mobileScrollRef.current && !isPaused) {
        const el = mobileScrollRef.current;
        // Increased speed from 0.8 to 1.2
        el.scrollLeft += 1.2; 
        
        // Seamless Loop Logic for Horizontal
        if (el.scrollLeft >= el.scrollWidth / 3) {
          el.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Start the loop
    animationFrameId = requestAnimationFrame(animateScroll);

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]); // Dependencies ensure logic updates if pause state changes

  return (
    <section className="relative w-full py-16 md:py-32 px-4 flex flex-col items-center overflow-hidden bg-white">
      
      {/* Hide Scrollbars but keep functionality */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* LEFT COLUMN: HEADLINES & STATS */}
        <div className="lg:col-span-5 flex flex-col justify-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter mb-4 md:mb-6">
            COMM <br /> <span className="text-[#D4AF37]">LOGS</span>
          </h2>
          <p className="text-gray-600 font-mono text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
            Incoming encrypted transmissions from our partner network. 
            Verification protocols active.
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 md:pt-8">
            <div>
              <h4 className="text-3xl font-bold text-black">4.9/5</h4>
              <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">Avg Signal Quality</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-black">50+</h4>
              <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">Secure Uplinks</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE INTERACTIVE FEED */}
        <div className="lg:col-span-7 relative h-[350px] md:h-[600px] w-full">
          
          {/* FADE MASKS (White Gradients) */}
          <div className="absolute top-0 left-0 w-full h-12 md:h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-12 md:h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />


          {/* =======================================
              DESKTOP FEED (Vertical + Auto Scroll)
             ======================================= */}
          <div 
            ref={desktopScrollRef}
            data-lenis-prevent="true"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="hidden lg:block absolute inset-0 overflow-y-auto no-scrollbar space-y-6 pb-20"
          >
            {scrollContent.map((log, i) => (
              <ReviewCard key={`v-${i}`} log={log} />
            ))}
          </div>


          {/* =======================================
              MOBILE FEED (Horizontal + Auto Scroll)
             ======================================= */}
          <div className="lg:hidden absolute top-0 left-0 w-full h-full flex items-center">
            <div 
              ref={mobileScrollRef}
              data-lenis-prevent="true"
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex gap-4 overflow-x-auto no-scrollbar px-2 w-full h-full items-center"
            >
              {scrollContent.map((log, i) => (
                <div key={`h-${i}`} className="min-w-[300px] max-w-[300px] shrink-0">
                  <ReviewCard log={log} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// =======================================
// SUB-COMPONENT: CARD (White/Gold)
// =======================================
function ReviewCard({ log }: { log: any }) {
  return (
    <div className="group relative bg-white border border-gray-200 p-6 rounded-xl hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-black font-bold text-lg uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
            {log.client}
          </h4>
          <span className="text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-widest">
            {log.role}
          </span>
        </div>
        
        {/* Signal Bars */}
        <div className="flex items-center gap-2">
          <div className="flex gap-[2px] items-end h-3 md:h-4">
            {[1, 2, 3, 4].map((bar) => (
              <div 
                key={bar}
                className="w-1 bg-[#D4AF37]/50 h-full animate-pulse"
                style={{ height: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
          <span className="text-[10px] md:text-xs font-mono text-[#D4AF37]">{log.signal}%</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-700 font-mono text-xs md:text-sm leading-relaxed opacity-80 mb-6 select-none">
        "{log.text}"
      </p>

      {/* ID Badge */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-300 uppercase tracking-widest">
        ID: {log.id}
      </div>
    </div>
  );
}