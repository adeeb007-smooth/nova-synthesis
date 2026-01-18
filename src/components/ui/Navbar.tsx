'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openTerminal = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event('open-terminal'));
  };

  const openContact = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event('start-contact'));
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
        
        {/* =======================================
            DESKTOP VIEW: FLOATING PILL (White/Gold)
           ======================================= */}
        <div className="hidden md:flex justify-center pt-6 transition-all duration-300">
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            // Changed bg to white/light with a subtle gold shadow on scroll
            className={`pointer-events-auto flex items-center gap-6 px-3 py-2 border rounded-full shadow-lg transition-all duration-500 ${
              scrolled 
                ? 'bg-white/90 backdrop-blur-xl border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                : 'bg-white/70 backdrop-blur-md border-gray-200'
            }`}
          >
            
            {/* LOGO SECTION */}
            <div className="flex items-center pl-3 gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-6 h-6 flex items-center justify-center">
                 {/* Gold blur and gradient icon */}
                 <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-md group-hover:opacity-50 transition-opacity" />
                 <div className="w-4 h-4 bg-gradient-to-br from-[#D4AF37] to-[#B59025] rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_10px_#D4AF37]" />
              </div>
              <div className="w-[1px] h-4 bg-gray-300" />
            </div>

            {/* NAVIGATION LINKS */}
            <div className="flex items-center gap-6">
              {['MISSION', 'PROJECTS', 'TEAM'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item === 'PROJECTS' ? 'work' : item.toLowerCase())}
                  // Changed text colors to dark gray -> black
                  className="text-[11px] font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors relative group"
                >
                  {item}
                  {/* Gold hover dot */}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </button>
              ))}

              <button 
                onClick={openTerminal}
                className="text-[11px] font-bold text-gray-500 hover:text-[#D4AF37] uppercase tracking-widest transition-colors"
              >
                TERMINAL
              </button>
            </div>

            {/* CONTACT BUTTON (Gold) */}
            <button 
              onClick={openContact}
              // Changed button to Gold bg with White text
              className="px-5 py-2 bg-[#D4AF37] text-white font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              CONTACT
            </button>
          </motion.div>
        </div>


        {/* =======================================
            MOBILE VIEW: FULL WIDTH BAR
           ======================================= */}
        <div className={`md:hidden pointer-events-auto flex justify-between items-center px-6 py-4 transition-colors duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100' : 'bg-transparent'}`}>
          
          {/* Mobile Logo (Gold) */}
          <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B59025] rounded-lg rotate-45 shadow-[0_0_10px_#D4AF37]" />
             <span className="font-bold text-xl tracking-tighter text-black ml-2">NOVA</span>
          </div>

          {/* Burger Button (Black) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center gap-[6px] group z-50"
          >
            <span className={`h-[2px] w-full bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px] bg-white' : ''}`} />
            <span className={`h-[2px] w-full bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px] bg-white' : ''}`} />
          </button>
        </div>

      </header>


      {/* =======================================
          MOBILE MENU OVERLAY (White/Gold)
         ======================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Changed bg to white
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {['MISSION', 'PROJECTS', 'TEAM'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'PROJECTS' ? 'work' : item.toLowerCase())}
                // Changed text to black -> gold hover
                className="text-3xl font-bold text-black uppercase tracking-tighter hover:text-[#D4AF37]"
              >
                {item}
              </button>
            ))}

            <button
              onClick={openTerminal}
              className="text-xl font-mono text-gray-400 uppercase tracking-widest hover:text-[#D4AF37]"
            >
              > TERMINAL_
            </button>

            <button
              onClick={openContact}
              // Gold button
              className="mt-8 px-10 py-4 bg-[#D4AF37] text-white text-xl font-bold uppercase tracking-widest rounded-full"
            >
              CONTACT US
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}