'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const textContent = (
    <span className="block tracking-tighter">VYBAND</span>
  );

  return (
    <div 
      ref={containerRef} 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden pointer-events-none"
    >
      
      {/* 1. BASE LAYER: THE WATERMARK (Always Visible)
          Light gray text that looks 'pressed' into the white background.
      */}
      <h1 className="relative z-0 text-9xl sm:text-[10rem] md:text-[13rem] font-bold leading-[0.8] text-[#e5e5e5] select-none opacity-50">
        {textContent}
      </h1>

      {/* 2. REVEAL LAYER: LIQUID GOLD (Revealed by Mouse) 
          This layer sits on top and is masked by the cursor position.
      */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        style={{
          maskImage: isMobile 
            ? 'none' 
            : `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`,
          WebkitMaskImage: isMobile 
            ? 'none' 
            : `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 15%, transparent 80%)`,
        }}
      >
        <h1 className={`text-9xl sm:text-[10rem] md:text-[13rem] font-bold leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#8A6E20] select-none drop-shadow-xl ${isMobile ? 'animate-pulse' : ''}`}>
          {textContent}
        </h1>
      </div>

      {/* 3. SCROLL INDICATOR (Animated) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 opacity-60"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1/2 bg-white/80 blur-[1px]"
          />
        </div>
        <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.4em]">
          Scroll to Explore
        </p>
      </motion.div>

    </div>
  );
}