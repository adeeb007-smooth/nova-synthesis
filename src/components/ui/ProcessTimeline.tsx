'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const steps = [
  {
    title: "THE PLAN",
    simpleTitle: "We Listen & Learn",
    description: "We start by chatting with you to understand your idea. No complex terms—just us understanding what you want to build and who it's for."
  },
  {
    title: "THE DESIGN",
    simpleTitle: "We Draw the Look",
    description: "Before writing code, we design exactly how your site will look. You get to see a picture of the final product to ensure you love it."
  },
  {
    title: "THE BUILD",
    simpleTitle: "We Bring it to Life",
    description: "This is where we do the heavy lifting. We write the code to make the design real, ensuring it works smoothly on phones and computers."
  },
  {
    title: "THE POLISH",
    simpleTitle: "We Check Everything",
    description: "We test every button and link to make sure nothing is broken. We fix any small issues so your users have a perfect experience."
  },
  {
    title: "THE LAUNCH",
    simpleTitle: "We Go Live",
    description: "Once everything is perfect, we flip the switch. Your website goes online for the world to see, and we help you keep it running."
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // --- LOGIC: CLOSEST NEIGHBOR DETECTION ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Reset if at the very top
    if (latest < 0.02) {
      if (activeIndex !== -1) setActiveIndex(-1);
      return;
    }

    const totalSteps = steps.length - 1;
    let closestStepIndex = -1;
    let minDistance = Infinity;

    // 2. Find closest step
    for (let i = 0; i < steps.length; i++) {
        const stepPosition = i / totalSteps;
        const distance = Math.abs(latest - stepPosition);

        if (distance < minDistance) {
            minDistance = distance;
            closestStepIndex = i;
        }
    }

    // 3. Activate if close enough (High threshold for fast scrolling)
    if (minDistance < 0.2 && closestStepIndex !== activeIndex) {
        setActiveIndex(closestStepIndex);
    }
  });

  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.3em] block mb-4">
          [ HOW WE WORK ]
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tighter">
          SIMPLE <span className="text-[#D4AF37]">STEPS</span>
        </h2>
      </div>

      {/* TRACK CONTAINER */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4">
        
        {/* 1. THE TRACK (Gray Line) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 transform md:-translate-x-1/2 rounded-full overflow-hidden">
           <motion.div 
             style={{ height }}
             className="w-full bg-[#D4AF37] origin-top"
           />
        </div>

        {/* 2. THE BALL */}
        <motion.div 
          style={{ top: height }}
          className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
           <div className="w-6 h-6 bg-[#D4AF37] rounded-full shadow-[0_0_20px_#D4AF37] border-4 border-white relative z-20" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#D4AF37]/20 rounded-full blur-md" />
        </motion.div>

        {/* 3. STEPS CONTENT */}
        <div className="flex flex-col gap-24 py-12">
          {steps.map((step, i) => (
            <TimelineNode 
              key={i} 
              step={step} 
              index={i} 
              isActive={i === activeIndex} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function TimelineNode({ step, index, isActive }: { step: any, index: number, isActive: boolean }) {
  const isEven = index % 2 === 0;

  // KEY CHANGE: High stiffness spring for instant reaction to fast scrolling
  const activeSpring = {
    type: "spring",
    stiffness: 500, // Very stiff = moves instantly
    damping: 30,    // No bouncing, just snappy
    mass: 0.5
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5 }}
      className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      
      {/* SPACER */}
      <div className="hidden md:block w-5/12" />

      {/* --- THE STATION DOT (CENTER) --- */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
         <motion.div 
           animate={{
             scale: isActive ? 1.5 : 1,
             backgroundColor: isActive ? "#D4AF37" : "#FFFFFF",
             borderColor: isActive ? "#D4AF37" : "#E5E7EB"
           }}
           transition={activeSpring} // Apply Snappy Spring
           className="w-4 h-4 border-2 rounded-full flex items-center justify-center"
         >
            <motion.div 
              animate={{ opacity: isActive ? 0 : 1 }}
              transition={{ duration: 0.1 }} // Instant fade
              className="w-1.5 h-1.5 bg-gray-300 rounded-full" 
            />
         </motion.div>

         {/* Ripple Effect */}
         {isActive && (
            <motion.div 
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute w-4 h-4 bg-[#D4AF37]/30 rounded-full -z-10"
            />
         )}
      </div>

      {/* --- CONTENT CARD --- */}
      <div className="pl-20 md:pl-0 w-full md:w-5/12">
        <motion.div 
          animate={{
            scale: isActive ? 1.05 : 1, 
            borderColor: isActive ? "rgba(212, 175, 55, 0.5)" : "rgba(243, 244, 246, 1)", 
            boxShadow: isActive ? "0 10px 30px -10px rgba(212, 175, 55, 0.2)" : "0 0 0 0 transparent" 
          }}
          transition={activeSpring} // Apply Snappy Spring here too
          className={`
            relative p-6 bg-white border rounded-xl overflow-hidden
            ${isEven ? 'text-left' : 'text-left md:text-right'}
            ${isActive ? 'z-10' : 'z-0'}
          `}
        >
          
          {/* Big Number */}
          <span className={`
            absolute -z-10 text-[5rem] font-bold leading-none -top-4 transition-colors duration-200 select-none
            ${isEven ? 'right-10' : 'right-10 md:left-10 md:right-auto'}
            ${isActive ? 'text-[#D4AF37]/10' : 'text-gray-50'}
          `}>
            {index + 1}
          </span>

          <h3 className={`text-xl font-bold mb-1 transition-colors duration-200 ${isActive ? 'text-black' : 'text-gray-800'}`}>
            {step.title}
          </h3>
          <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-3">
            {step.simpleTitle}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {step.description}
          </p>

          {/* Connector Line */}
          <motion.div 
            animate={{ backgroundColor: isActive ? "#D4AF37" : "#E5E7EB" }}
            transition={activeSpring}
            className={`
             hidden md:block absolute top-1/2 w-8 h-[1px]
             ${isEven ? '-left-8' : '-right-8'}
          `} />
        </motion.div>
      </div>

    </motion.div>
  );
}