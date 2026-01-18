'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- IMPORT LOCAL IMAGES ---
// Make sure your images are exactly in src/components/images/
import img1 from '../images/image.1.jpg';
import img2 from '../images/image.2.jpg';
import img3 from '../images/image.3.jpg';
import img4 from '../images/image.4.jpg';
import img5 from '../images/image.5.jpg';
import img6 from '../images/image.6.jpg';

// --- COMPONENT DATA --- (No changes needed here)
const projects = [
  {
    id: 1,
    title: "QuantumNet",
    category: "Cybernetics",
    year: "2042",
    image: img1,
    description: "A decentralized neural interface for collective consciousness."
  },
  {
    id: 2,
    title: "Project Chimera",
    category: "Bio-Hacking",
    year: "2038",
    image: img2,
    description: "Synthetic organs built on a custom DNA-blockchain hybrid."
  },
  {
    id: 3,
    title: "Helios Initiative",
    category: "Energy Solutions",
    year: "2045",
    image: img3,
    description: "Dyson sphere prototype for stellar energy harvesting."
  },
  {
    id: 4,
    title: "Echo Protocol",
    category: "Stealth Tech",
    year: "2035",
    image: img4,
    description: "Active camouflage using light-bending meta-materials."
  },
  {
    id: 5,
    title: "Oracle Matrix",
    category: "Predictive AI",
    year: "2048",
    image: img5,
    description: "A quantum computer that forecasts global market shifts."
  },
  {
    id: 6,
    title: "Project Goliath",
    category: "Robotics",
    year: "2040",
    image: img6,
    description: "Autonomous mechs for deep-earth resource extraction."
  },
];

// --- MAIN COMPONENT --- (No changes needed here)
export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-black text-white flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <CarouselItem
            key={project.id}
            project={project}
            isActive={index === activeIndex}
            setActiveIndex={setActiveIndex}
            index={index}
          />
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === activeIndex ? 'bg-white' : 'bg-neutral-600'}`}
          />
        ))}
      </div>
    </section>
  );
}

// --- CAROUSEL ITEM SUB-COMPONENT ---
const CarouselItem = ({ project, isActive, setActiveIndex, index }: any) => {
  
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
     },
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 0.4,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
    },
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      variants={itemVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      exit="exit"
      aria-hidden={!isActive}
    >
      {/* BACKGROUND IMAGE */}
      <motion.div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={isActive}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-8 md:p-16">
        <motion.div variants={textVariants}>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
              {project.category}
            </span>
            <span className="w-3 h-px bg-neutral-600" />
            <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
              {project.year}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
            {project.title}
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
};