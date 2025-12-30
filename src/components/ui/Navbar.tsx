'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle Scroll Effect (for visual polish, not hiding)
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
      {/* WRAPPER: Fixed to top, high z-index.
        NO hiding animation anymore. It stays put.
      */}
      <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
        
        {/* =======================================
            DESKTOP VIEW: FLOATING PILL
            (Centered, Sticky, Always Visible)
           ======================================= */}
        <div className="hidden md:flex justify-center pt-6 transition-all duration-300">
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            // Pointer events auto re-enables clicking inside this container
            className={`pointer-events-auto flex items-center gap-6 px-3 py-2 border rounded-full shadow-2xl transition-all duration-500 ${
              scrolled 
                ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
                : 'bg-black/40 backdrop-blur-md border-white/5'
            }`}
          >
            
            {/* LOGO SECTION */}
            <div className="flex items-center pl-3 gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {/* Animated Diamond Logo */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                 <div className="absolute inset-0 bg-cyan opacity-20 blur-md group-hover:opacity-50 transition-opacity" />
                 <div className="w-4 h-4 bg-gradient-to-br from-cyan to-blue-600 rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_10px_#00F0FF]" />
              </div>
              {/* Vertical Separator */}
              <div className="w-[1px] h-4 bg-white/20" />
            </div>

            {/* NAVIGATION LINKS */}
            <div className="flex items-center gap-6">
              {['MISSION', 'PROJECTS', 'TEAM'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item === 'PROJECTS' ? 'work' : item.toLowerCase())}
                  className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors relative group"
                >
                  {item}
                  {/* Hover Dot */}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-cyan group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </button>
              ))}

              <button 
                onClick={openTerminal}
                className="text-[11px] font-bold text-gray-400 hover:text-cyan uppercase tracking-widest transition-colors"
              >
                TERMINAL
              </button>
            </div>

            {/* CONTACT BUTTON (Inside the pill) */}
            <button 
              onClick={openContact}
              className="px-5 py-2 bg-cyan text-black font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300"
            >
              CONTACT
            </button>
          </motion.div>
        </div>


        {/* =======================================
            MOBILE VIEW: FULL WIDTH BAR
            (Standard header for phones)
           ======================================= */}
        <div className={`md:hidden pointer-events-auto flex justify-between items-center px-6 py-4 transition-colors duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
          
          {/* Mobile Logo */}
          <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="w-8 h-8 bg-gradient-to-br from-cyan to-blue-600 rounded-lg rotate-45 shadow-[0_0_10px_#00F0FF]" />
             <span className="font-bold text-xl tracking-tighter text-white ml-2">NOVA</span>
          </div>

          {/* Burger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center gap-[6px] group z-50"
          >
            <span className={`h-[2px] w-full bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`h-[2px] w-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>

      </header>


      {/* =======================================
          MOBILE MENU OVERLAY
         ======================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {['MISSION', 'PROJECTS', 'TEAM'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'PROJECTS' ? 'work' : item.toLowerCase())}
                className="text-3xl font-bold text-white uppercase tracking-tighter hover:text-cyan"
              >
                {item}
              </button>
            ))}

            <button
              onClick={openTerminal}
              className="text-xl font-mono text-gray-500 uppercase tracking-widest hover:text-white"
            >
              {'>'} TERMINAL_
            </button>

            <button
              onClick={openContact}
              className="mt-8 px-10 py-4 bg-cyan text-black text-xl font-bold uppercase tracking-widest rounded-full"
            >
              CONTACT US
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}