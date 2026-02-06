'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updatePosition = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Handle both Mouse and Touch events
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setMousePosition({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('touchmove', updatePosition);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('touchmove', updatePosition);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Centralized Responsive Text Style
  // Using 'vw' and 'clamp' ensures the text scales smoothly between mobile and desktop
  const textClasses = "text-[18vw] md:text-[13rem] font-bold leading-none tracking-tighter select-none text-center px-4 w-full";

  const textContent = "VYBAND";

  return (
    <div 
      ref={containerRef} 
      className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] bg-transparent overflow-hidden touch-none"
    >
      
      {/* 1. BASE LAYER: THE WATERMARK */}
      <h1 className={`${textClasses} relative z-0 text-[#e5e5e5] opacity-40`}>
        {textContent}
      </h1>

      {/* 2. REVEAL LAYER: LIQUID GOLD */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle ${isMobile ? '120px' : '200px'} at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle ${isMobile ? '120px' : '200px'} at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
        }}
      >
        <h1 className={`${textClasses} text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#8A6E20] drop-shadow-2xl`}>
          {textContent}
        </h1>
      </div>

      {/* 3. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-3 opacity-60"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#D4AF37] to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1/2 bg-white/50 blur-[1px]"
          />
        </div>
        <p className="text-[8px] md:text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
          {isMobile ? 'Tap & Move' : 'Scroll to Explore'}
        </p>
      </motion.div>
    </div>
  );
}