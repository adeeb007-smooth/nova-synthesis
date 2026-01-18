'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// IMPORT LOCAL IMAGES
import img1 from '../images/image.1.jpg';
import img2 from '../images/image.2.jpg';
import img3 from '../images/image.3.jpg';
import img4 from '../images/image.4.jpg';
import img5 from '../images/image.5.jpg';
import img6 from '../images/image.6.jpg';

// DATA
const projects = [
  { 
    id: 1, 
    title: "NEON NEXUS", 
    category: "FINTECH", 
    image: img1,
    gallery: [img1, img2, img3],
    details: {
      challenge: "Client needed 0-latency data visualization for high-frequency trading. Traditional charts were lagging by 200ms.",
      solution: "Engineered a custom WebGL rendering pipeline bypassing standard DOM manipulation, linked directly to websocket streams.",
      outcome: "Render time dropped to <16ms (60fps). User retention increased by 40% due to real-time responsiveness."
    }
  },
  { 
    id: 2, 
    title: "VOID ENGINE", 
    category: "WEBGL", 
    image: img2,
    gallery: [img2, img3, img4],
    details: {
      challenge: "Render millions of particles in real-time on mobile devices without draining battery life.",
      solution: "Utilized GPGPU (General-Purpose computing on Graphics Processing Units) to offload physics calculations.",
      outcome: "Achieved 120fps on iPhone 15 Pro. The engine was acquired by a major gaming studio."
    }
  },
  { 
    id: 3, 
    title: "CIPHER WALL", 
    category: "SECURITY", 
    image: img3,
    gallery: [img3, img4, img5],
    details: {
      challenge: "Create a visualization for network traffic that allows security analysts to spot anomalies instantly.",
      solution: "Built a 3D force-directed graph system that represents threat levels through color intensity and node proximity.",
      outcome: "Reduced threat detection time by 60%. Used by 3 Fortune 500 cybersecurity firms."
    }
  },
  { 
    id: 4, 
    title: "HYPER GRID", 
    category: "DATA", 
    image: img4,
    gallery: [img4, img5, img6],
    details: {
      challenge: "Legacy systems were fragmenting the client's data workflow, causing 40% operational redundancy.",
      solution: "Designed a unified 'Hyper Grid' interface that aggregates multiple data streams into a single dashboard.",
      outcome: "Operational costs reduced by 30% in Q1 alone. System adoption reached 95% within two weeks."
    }
  },
  { 
    id: 5, 
    title: "QUANTUM UI", 
    category: "DESIGN", 
    image: img5,
    gallery: [img5, img6, img1],
    details: {
      challenge: "A quantum computing firm needed an interface that explained their qubit states to investors.",
      solution: "Created an abstract, interactive visual language based on quantum superposition principles.",
      outcome: "Helped secure $50M in Series B funding by making complex physics accessible visually."
    }
  },
  { 
    id: 6, 
    title: "AETHER SYNC", 
    category: "CLOUD", 
    image: img6,
    gallery: [img6, img1, img2],
    details: {
      challenge: "Synchronize state across 10,000+ connected clients with zero conflict.",
      solution: "Implemented a conflict-free replicated data type (CRDT) algorithm wrapped in a sleek UI.",
      outcome: "Zero data loss incidents in 2 years of uptime. Scaled to 100k concurrent users."
    }
  },
];

export default function AchieveSection() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const val = (e.clientX - left) / width;
    mouseX.set(val);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
  };

  return (
    <section 
      id="work" 
      className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      <div className="mb-12 text-center z-10">
        <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
          [ EXPLORE THE ARCHIVE ]
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col md:flex-row w-full max-w-[1400px] h-[800px] md:h-[500px] px-4 gap-2 md:gap-4"
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            activeId={activeId} 
            setActiveId={setActiveId}
            onOpenModal={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
}

function ProjectCard({ project, activeId, setActiveId, onOpenModal }: any) {
  const isActive = activeId === project.id;

  return (
    <motion.div
      layout
      onClick={() => isActive ? onOpenModal() : setActiveId(project.id)}
      onMouseEnter={() => setActiveId(project.id)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[0.22,1,0.36,1] group border ${isActive ? 'border-[#D4AF37]' : 'border-gray-200 hover:border-[#D4AF37]/50'}`}
      style={{
        flex: isActive ? 5 : 1,
      }}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          // FIX: ADDED SIZES PROP
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-white/20 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className={`absolute bottom-0 left-0 p-6 md:p-8 w-full transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest mb-2">
          {project.category}
        </p>
        <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter whitespace-nowrap mb-4">
          {project.title}
        </h3>
        
        <div className="inline-flex items-center gap-2 text-[10px] font-mono text-white uppercase tracking-widest bg-[#D4AF37] px-4 py-2 rounded-full pointer-events-none shadow-md">
          OPEN MISSION REPORT
          <span className="text-white">+</span>
        </div>
      </div>

      <div className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${!isActive ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-gray-800 font-mono text-[10px] uppercase tracking-widest rotate-[-90deg] whitespace-nowrap origin-center font-bold">
          {project.category}
        </p>
      </div>

      <div className={`md:hidden absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${!isActive ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-lg font-bold text-white drop-shadow-md uppercase tracking-widest">
          {project.title}
        </h3>
      </div>

    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-white/80 backdrop-blur-xl transition-all" 
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        className="relative w-full max-w-6xl max-h-[90vh] h-[85vh] bg-white border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row rounded-xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-gray-100 hover:bg-[#D4AF37] hover:text-white text-black border border-gray-200 rounded-full group transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div 
          data-lenis-prevent="true"
          className="w-full md:w-[45%] p-8 md:p-12 overflow-y-auto custom-scrollbar order-2 md:order-1 border-r border-gray-100 overscroll-contain"
        >
          <div className="mb-10">
            <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest">ID_{project.id} // SECURE FILE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tighter leading-none mt-3 mb-6">
              {project.title}
            </h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded text-[10px] text-gray-600 font-mono uppercase">{project.category}</span>
               <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded text-[10px] text-[#D4AF37] font-mono uppercase">COMPLETED</span>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> The Challenge
              </h4>
              <p className="text-gray-600 font-mono text-sm leading-relaxed border-l border-gray-200 pl-4">
                {project.details.challenge}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" /> The Solution
              </h4>
              <p className="text-gray-600 font-mono text-sm leading-relaxed border-l border-gray-200 pl-4">
                {project.details.solution}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-lg">
              <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> The Outcome
              </h4>
              <p className="text-black font-mono text-sm leading-relaxed">
                {project.details.outcome}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] bg-gray-50 relative order-1 md:order-2 h-[300px] md:h-full">
          <div 
            data-lenis-prevent="true"
            className="absolute inset-0 overflow-y-auto no-scrollbar overscroll-contain"
          >
             {project.gallery.map((img: any, i: number) => (
                <div key={i} className="relative w-full aspect-[16/10] border-b border-gray-200 last:border-0 group">
                  <Image 
                    src={img} 
                    alt={`Evidence ${i+1}`}
                    fill
                    // FIX: ADDED SIZES PROP
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-md border border-gray-200 text-[10px] font-mono text-black rounded-full shadow-sm">
                    IMG_EVIDENCE_0{i+1}
                  </div>
                </div>
              ))}
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                 <p className="text-[10px] font-mono text-gray-400 uppercase">END OF GALLERY</p>
              </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}