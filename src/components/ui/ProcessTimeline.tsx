'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    id: "01",
    title: "CALIBRATION",
    subtitle: "Discovery & Strategy",
    description: "We begin by decoding your vision. Through intensive workshops, we align on core objectives, target demographics, and the digital persona your brand demands."
  },
  {
    id: "02",
    title: "SYNTHESIS",
    subtitle: "Architecture & Design",
    description: "Our architects draft the blueprint. We create wireframes and high-fidelity prototypes that map out user journeys, ensuring every interaction is purposeful."
  },
  {
    id: "03",
    title: "CONSTRUCTION",
    subtitle: "Development & Integration",
    description: "The build phase. We deploy clean, semantic code using cutting-edge frameworks (Next.js, WebGL) to bring the visual language to life with zero latency."
  },
  {
    id: "04",
    title: "REFINEMENT",
    subtitle: "Testing & Polish",
    description: "Perfection is in the details. We conduct rigorous stress testing, performance optimization, and aesthetic tuning to ensure a flawless deployment."
  },
  {
    id: "05",
    title: "DEPLOYMENT",
    subtitle: "Launch & Scale",
    description: "System go. We handle the secure migration to production servers and provide post-launch support to ensure your digital asset scales effortlessly."
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.3em] block mb-4">
          [ THE BLUEPRINT ]
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter">
          PROCESS <span className="text-[#D4AF37]">TIMELINE</span>
        </h2>
      </div>

      {/* TIMELINE CONTAINER */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4 relative">
        
        {/* CENTER LINE */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 transform md:-translate-x-1/2">
          <motion.div 
            style={{ height: lineHeight }}
            className="w-full bg-[#D4AF37] origin-top"
          />
        </div>

        {/* STEPS */}
        <div className="flex flex-col gap-16 md:gap-32 relative z-10">
          {steps.map((step, i) => (
            <TimelineItem key={i} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function TimelineItem({ step, index }: { step: any, index: number }) {
  // isEven = True for 01, 03, 05 (Left Side Content)
  // isEven = False for 02, 04 (Right Side Content)
  const isEven = index % 2 === 0; 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      
      {/* 1. SPACER */}
      <div className="hidden md:block flex-1" />

      {/* 2. CENTER NODE */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-4 h-4 md:w-6 md:h-6 bg-white border border-[#D4AF37] rounded-full z-20 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full" />
      </div>

      {/* 3. CONTENT CARD */}
      <div className="flex-1 pl-16 md:pl-0 w-full">
        <div className={`
          relative flex flex-col gap-2 
          ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}
        `}>
          
          {/* WATERMARK NUMBER ALIGNMENT FIX:
              - Mobile (Default): Always 'right-0' to avoid overlapping left-aligned text.
              - Desktop (md): 
                  - If Left Side (01, 03): anchor 'md:left-0' (Far Left)
                  - If Right Side (02, 04): anchor 'md:right-0' (Far Right)
          */}
          <span className={`
            absolute -z-10 font-bold text-gray-100 select-none leading-none
            text-[6rem] md:text-[8rem]
            top-[-1.5rem] md:top-[-2.5rem]
            right-0 
            ${isEven ? 'md:left-0 md:right-auto' : 'md:right-0 md:left-auto'}
          `}>
            {step.id}
          </span>
          
          <h3 className="relative z-10 text-xl md:text-2xl font-bold text-black uppercase tracking-wide">
            {step.title}
          </h3>
          
          <p className="relative z-10 text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
            {step.subtitle}
          </p>
          
          <p className="relative z-10 text-sm md:text-base text-gray-600 leading-relaxed max-w-md ml-0 md:ml-auto">
            {step.description}
          </p>
        </div>
      </div>

    </motion.div>
  );
}