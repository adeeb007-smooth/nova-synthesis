'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Years of Innovation', value: '10+' },
  { label: 'Projects Deployed', value: '500+' },
  { label: 'Global Partners', value: '50+' },
  { label: 'Industry Awards', value: '25' },
];

export default function AboutSection() {
  return (
    <section id="mission" className="relative w-full py-24 md:py-32 bg-white px-6 md:px-12 overflow-hidden border-b border-gray-100">
      
      {/* Background Decor: Subtle Vertical Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-4">
         <div className="w-[1px] h-full bg-gray-50" />
         <div className="w-[1px] h-full bg-gray-50 hidden md:block" />
         <div className="w-[1px] h-full bg-gray-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. TOP ROW: SECTION LABEL & HEADLINE */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-gray-100 pb-12">
          
          {/* Label */}
          <div className="col-span-1">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-[#D4AF37]" />
               <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em]">
                 The Mission
               </span>
             </div>
          </div>

          {/* Big Headline */}
          <div className="col-span-1 md:col-span-3">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-black tracking-tight"
             >
               WE ENGINEER <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B59025]">
                 DIGITAL SUPREMACY.
               </span>
             </motion.h2>
          </div>
        </div>


        {/* 2. MIDDLE ROW: CONTENT & BADGE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Empty Space / Badge Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full">
             {/* Decorative Seal */}
             <motion.div 
               initial={{ rotate: -90, opacity: 0 }}
               whileInView={{ rotate: 0, opacity: 1 }}
               transition={{ duration: 1 }}
               className="w-32 h-32 border border-[#D4AF37]/30 rounded-full flex items-center justify-center relative self-start md:self-end md:mr-12"
             >
                <div className="absolute inset-2 border border-dashed border-[#D4AF37]/50 rounded-full animate-[spin_10s_linear_infinite]" />
                <span className="text-[10px] font-mono text-[#D4AF37] text-center leading-tight">
                  NOVA<br/>CERTIFIED<br/>AGENCY
                </span>
             </motion.div>
          </div>

          {/* Text Content */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10"
          >
             <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-4 border-b-2 border-[#D4AF37] w-12 pb-2">
                  Vision
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  We don't just build websites; we construct digital ecosystems. 
                  Nova Synthesis sits at the intersection of art, engineering, and user psychology.
                  Our goal is to override the mundane with precision.
                </p>
             </div>

             <div>
                <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-4 border-b-2 border-[#D4AF37] w-12 pb-2">
                  Method
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Utilizing WebGL, AI-driven interfaces, and decentralized protocols, 
                  we forge experiences that are not only functionally superior but 
                  fundamentally unforgettable. Excellence is our baseline.
                </p>
             </div>
          </motion.div>
        </div>


        {/* 3. BOTTOM ROW: STATS (Clean Grid) */}
        <div className="border-t border-gray-200 pt-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="relative group cursor-default">
                  {/* Hover Line */}
                  <div className="absolute -top-12 left-0 w-[1px] h-0 bg-[#D4AF37] group-hover:h-full transition-all duration-500 ease-in-out opacity-50" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                     <h3 className="text-4xl md:text-5xl font-bold text-black mb-2 group-hover:text-[#D4AF37] transition-colors">
                       {stat.value}
                     </h3>
                     <p className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">
                       {stat.label}
                     </p>
                  </motion.div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}