'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// --- PLACEHOLDER IMPORTS ---
import img1 from '../images/image.1.jpg';
import img2 from '../images/image.2.jpg';
import img3 from '../images/image.3.jpg';
import img4 from '../images/image.4.jpg';

// Mock Data
const operatives = [
  {
    id: "OP_01",
    name: "ALEX V.",
    role: "ARCHITECT",
    status: "ONLINE",
    stats: { code: 98 },
    image: img1
  },
  {
    id: "OP_02",
    name: "SARAH J.",
    role: "NEURAL NET",
    status: "BUSY",
    stats: { code: 96 },
    image: img2
  },
  {
    id: "OP_03",
    name: "DAVIDE R.",
    role: "SECURITY",
    status: "ONLINE",
    stats: { code: 99 },
    image: img3
  },
  {
    id: "OP_04",
    name: "ELENA K.",
    role: "VISUALS",
    status: "OFFLINE",
    stats: { code: 94 },
    image: img4
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full py-20 md:py-32 px-4 bg-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto mb-10 md:mb-16 text-center">
        <p className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.3em] mb-4">
          [ UNITE THE COLLECTIVE ]
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter">
          ACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B59025]">OPERATIVES</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="hidden md:grid grid-cols-4 gap-6">
          {operatives.map((op, i) => (
            <DesktopCard key={op.id} op={op} index={i} />
          ))}
        </div>

        <div className="md:hidden grid grid-cols-2 gap-3 px-2">
          {operatives.map((op) => (
             <MobileCompactCard key={op.id} op={op} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopCard({ op, index }: { op: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[400px] border border-gray-200 bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 rounded-xl"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={op.image} 
          alt={op.name}
          fill
          // FIX: ADDED SIZES PROP
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="absolute inset-0 bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/90 to-transparent pt-20">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[#D4AF37] font-mono text-xs">{op.id}</span>
           <div className={`w-2 h-2 rounded-full ${op.status === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-1">{op.name}</h3>
        <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">{op.role}</p>
      </div>
    </motion.div>
  );
}

function MobileCompactCard({ op }: { op: any }) {
  return (
    <div className="relative w-full h-[260px] bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group shadow-sm">
      
      <div className="relative h-[65%] w-full overflow-hidden">
        <Image 
          src={op.image} 
          alt={op.name}
          fill
          // FIX: ADDED SIZES PROP
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay" />

        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-[#D4AF37]/60 shadow-[0_0_10px_#D4AF37] z-10"
        />
        
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full z-20 ${op.status === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      </div>

      <div className="h-[35%] px-3 pb-3 flex flex-col justify-end relative bg-white">
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]/30" />

        <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-[2px] leading-tight">
          {op.name}
        </h3>
        <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-widest mb-2 opacity-80">
          {op.role}
        </p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
           <span className="text-[9px] text-gray-500 font-mono">RATING</span>
           <span className="text-[9px] text-black font-mono font-bold">{op.stats.code}/100</span>
        </div>

        <span className="absolute bottom-2 right-2 text-[20px] font-bold text-gray-100 pointer-events-none select-none">
          {op.id.split('_')[1]}
        </span>
      </div>

    </div>
  );
}