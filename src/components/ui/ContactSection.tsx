'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

const Icons = {
  Github: ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>),
  X: ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768"/></svg>),
  Linkedin: ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>),
  Whatsapp: ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>)
};

export default function ContactSection() {
  const [showModal, setShowModal] = useState(false);

  // === THE CRITICAL CONNECTION ===
  useEffect(() => {
    // 1. Define what happens when the signal is received
    const handleOpenContact = () => setShowModal(true);
    
    // 2. Listen for the 'trigger-contact-modal' signal (from Navbar)
    window.addEventListener('trigger-contact-modal', handleOpenContact);
    
    // 3. Clean up when done
    return () => window.removeEventListener('trigger-contact-modal', handleOpenContact);
  }, []);

  return (
    <section id="contact" className="relative w-full bg-white border-t border-gray-100 overflow-hidden">
      
      {/* THIS IS THE SHARED MODAL (Dark Terminal) */}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* DESKTOP INTERFACE (White/Gold) */}
      <div className="hidden md:flex flex-col items-center justify-center py-32 px-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <h2 className="relative z-10 text-7xl font-bold text-black tracking-tighter mb-8 text-center">
          READY TO <span className="text-[#D4AF37]">INITIATE?</span>
        </h2>
        
        <p className="relative z-10 text-gray-600 font-mono text-sm max-w-xl text-center mb-12 leading-relaxed">
          Our channels are open. Secure uplink available for new project inquiries.
          Response time: {"<"} 2 hours.
        </p>

        {/* BUTTON: Manually opens the modal */}
        <button 
          onClick={() => setShowModal(true)}
          className="relative z-10 group px-8 py-4 bg-[#D4AF37] text-white font-bold text-sm uppercase tracking-widest hover:bg-black transition-colors duration-300 rounded-sm shadow-lg"
        >
          START TRANSMISSION
          <div className="absolute inset-0 border border-[#D4AF37]/50 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 rounded-sm" />
        </button>

        <div className="relative z-10 mt-24 flex flex-col items-center gap-8">
           <div className="flex gap-10">
              {['Github', 'X', 'Linkedin', 'Whatsapp'].map((icon) => {
                const IconComponent = Icons[icon as keyof typeof Icons];
                return (
                  <a href="#" key={icon} className="group relative">
                    <div className="absolute -inset-3 bg-[#D4AF37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <IconComponent className="w-6 h-6 text-gray-500 group-hover:text-[#D4AF37] transition-colors duration-300 relative z-10" />
                  </a>
                );
              })}
           </div>
           <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
             © 2026 VYBAND all rights reserved
           </span>
        </div>
      </div>

      {/* MOBILE INTERFACE (White/Gold) */}
      <div className="md:hidden relative py-20 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:14px_14px]" />
        
        <div className="relative z-10 w-full bg-white border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.1)]">
          <div className="bg-[#D4AF37]/10 px-4 py-2 flex justify-between items-center border-b border-[#D4AF37]/20">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">UPLINK_READY</span>
             </div>
             <span className="text-[10px] font-mono text-[#D4AF37]/70">V.2.0.0 (GOLD)</span>
          </div>

          <div className="p-8 flex flex-col items-center text-center">
             <h3 className="text-3xl font-bold text-black uppercase tracking-tighter mb-2">
               LET'S <br/> BUILD
             </h3>
             <p className="text-xs font-mono text-gray-500 mb-8 max-w-[200px]">
               Initialize contact protocol to discuss your digital reality.
             </p>

             <button 
               onClick={() => setShowModal(true)}
               className="w-full py-4 bg-[#D4AF37] text-white font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-black transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)] relative overflow-hidden group"
             >
               <span className="relative z-10">CONNECT</span>
               <motion.div 
                 animate={{ left: ['-100%', '200%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 w-1/2 h-full bg-white/40 skew-x-12 blur-sm"
               />
             </button>
          </div>

          <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 grid grid-cols-2 gap-4">
             <div>
               <p className="text-[9px] text-gray-500 font-mono uppercase">EMAIL</p>
               <p className="text-[10px] text-black font-mono">hello@vyband.os</p>
             </div>
             <div className="text-right">
               <p className="text-[9px] text-gray-500 font-mono uppercase">LOCATION</p>
               <p className="text-[10px] text-black font-mono">Grid 74.0</p>
             </div>
          </div>

          <div className="bg-gray-100 px-4 py-5 border-t border-[#D4AF37]/20 flex flex-col gap-3 relative overflow-hidden">
             <span className="text-[9px] text-gray-500 font-mono uppercase text-center w-full">SECURE CHANNELS</span>
             <div className="flex justify-center gap-8 relative z-10 items-center mt-1">
                {['Github', 'X', 'Linkedin', 'Whatsapp'].map((icon) => {
                  const IconComponent = Icons[icon as keyof typeof Icons];
                  return (
                    <a href="#" key={icon} className="group relative p-2">
                      <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"/>
                      <IconComponent className="w-6 h-6 text-gray-500 group-hover:text-[#D4AF37] transition-colors relative z-10" />
                    </a>
                  );
                })}
             </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            VYBAND © 2026
          </p>
        </div>
      </div>
    </section>
  );
}