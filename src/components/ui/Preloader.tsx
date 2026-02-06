'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoadingComplete(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 5) + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  // Handle Exit Logic
  useEffect(() => {
    if (loadingComplete) {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    }
  }, [loadingComplete, onComplete]);

  // Animation variants for the bounces
  const bounceVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -40, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } }
  };

  const goldBounceVariants = {
    initial: { y: 0 },
    // Bounce higher than the others
    animate: { 
      y: [0, -60, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.1 
      }
    },
    // Fade out instantly so the expander takes over
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  return (
    <AnimatePresence>
      {(!loadingComplete || true) ? (
        <motion.div
          key="loader-container"
          // Final fade out of the gold screen to reveal the site
          animate={loadingComplete ? { opacity: 0, transition: { delay: 1.2, duration: 0.8 } } : { opacity: 1 }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden ${loadingComplete ? 'pointer-events-none' : ''}`}
        >
          
          {/* 1. THE THREE BOUNCING BALLS */}
          <motion.div
            animate={loadingComplete ? "exit" : "animate"}
            initial="initial"
            className="relative z-20 flex items-end gap-6 h-32 pb-10"
          >
             {/* Black Ball */}
             <motion.div 
                variants={bounceVariants}
                className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10 shadow-sm"
             />
             
             {/* Gold Ball (Bouncing) */}
             <motion.div 
                variants={goldBounceVariants}
                className="w-8 h-8 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]"
             />
             
             {/* White Ball */}
             <motion.div 
                variants={bounceVariants}
                transition={{ delay: 0.2 }}
                className="w-6 h-6 rounded-full bg-white shadow-[0_0_10px_white]"
             />
          </motion.div>


          {/* 2. THE EXPANDING GOLD CIRCLE (The Final "Pop") 
              FIX: Initial scale is now 0 so it is invisible until needed.
          */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={loadingComplete ? { scale: 60, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.87, 0, 0.13, 1], // Expo ease for dramatic pop
              delay: 0.1 
            }}
            className="absolute z-10 w-8 h-8 bg-[#D4AF37] rounded-full"
          />

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}