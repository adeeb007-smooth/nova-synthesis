'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// DUMMY DATA - Replace with your real projects later
const artifacts = [
  {
    id: 1,
    title: "VOID ENGINE",
    category: "WebGL Framework",
    // Using thematic unsplash images as placeholders
    image: "https://images.unsplash.com/photo-1451187580500-28a71d514828?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "NEON NEXUS",
    category: "Fintech Core",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "CIPHER WALL",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "HYPER GRID",
    category: "Data Visualization",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function ArtifactsAccordion() {
  // State to track which panel is expanded. Default to the first one (id: 1).
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section id="work" className="relative w-full py-32 px-4 flex flex-col items-center bg-[#050505]">
      
      {/* Header */}
      <div className="mb-20 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
          ARTIFACTS
        </h2>
        <div className="h-[1px] w-24 bg-cyan mx-auto shadow-[0_0_10px_#00F0FF]" />
      </div>

      {/* The Accordion Container */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-[600px] gap-4 z-10">
        {artifacts.map((item) => {
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                layout // This prop enables automatic smooth layout animations
                onMouseEnter={() => setActiveId(item.id)}
                // Animation variants for expanded vs collapsed state
                animate={{ 
                    flex: isActive ? 3 : 1,
                    opacity: 1
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // "Elite" easing curve
                className={`relative h-full rounded-2xl overflow-hidden cursor-pointer border ${isActive ? 'border-cyan/50' : 'border-white/10'} group transition-colors duration-500`}
              >
                {/* BACKGROUND IMAGE */}
                <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100 grayscale-[50%]'}`}
                />

                {/* DARK OVERLAY (Fades out when active) */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-60 group-hover:opacity-40'}`} />

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    {/* Category label - only shows when active */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="text-cyan font-mono text-xs uppercase tracking-widest mb-2"
                            >
                                {item.category}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Title */}
                    <motion.h3 
                        layout="position"
                        className={`font-bold text-white uppercase tracking-tighter transition-all duration-500 ${isActive ? 'text-4xl md:text-5xl drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'text-2xl md:text-3xl opacity-70'}`}
                    >
                        {item.title}
                    </motion.h3>
                </div>

                {/* Elite Corner Accents (Optional - keep if you like the tech look) */}
                <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r transition-colors duration-500 ${isActive ? 'border-cyan' : 'border-white/30'}`} />
                <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l transition-colors duration-500 ${isActive ? 'border-cyan' : 'border-white/30'}`} />

              </motion.div>
            );
        })}
      </div>

    </section>
  );
}
