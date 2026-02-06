'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// YOUR ID
const FORMSPREE_ID = "xreagzqn"; 

type Step = 'name' | 'email' | 'message' | 'submitting' | 'success' | 'error';

interface HistoryLine {
  prompt: string;
  value: string;
}

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>('name');
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  // Store the form data as we go
  const formData = useRef({ name: '', email: '', message: '' });
  
  // Auto-focus input
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset everything when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('name');
      setHistory([]);
      setInputValue('');
      formData.current = { name: '', email: '', message: '' };
    }
  }, [isOpen]);

  // Keep focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, [history, step]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue.trim()) return; // Don't allow empty inputs

      // 1. RECORD THE ANSWER
      const currentPrompt = getPromptText(step);
      setHistory(prev => [...prev, { prompt: currentPrompt, value: inputValue }]);
      
      // 2. SAVE DATA
      if (step === 'name') formData.current.name = inputValue;
      if (step === 'email') formData.current.email = inputValue;
      if (step === 'message') formData.current.message = inputValue;

      const nextVal = inputValue; // Temp store for submission
      setInputValue(''); // Clear input for next line

      // 3. MOVE TO NEXT STEP
      if (step === 'name') {
        setStep('email');
      } else if (step === 'email') {
        setStep('message');
      } else if (step === 'message') {
        // FINISHED! SUBMIT NOW
        setStep('submitting');
        await submitToFormspree();
      }
    }
  };

  const submitToFormspree = async () => {
    const data = new FormData();
    data.append('name', formData.current.name);
    data.append('email', formData.current.email);
    data.append('message', formData.current.message);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStep('success');
        setTimeout(() => onClose(), 3500); // Close after 3.5s
      } else {
        setStep('error');
      }
    } catch (error) {
      setStep('error');
    }
  };

  // Helper to get the prompt text based on current step
  const getPromptText = (s: Step) => {
    switch(s) {
      case 'name': return 'ENTER DESIGNATION (NAME):';
      case 'email': return 'ENTER FREQUENCY (EMAIL):';
      case 'message': return 'UPLOAD DATA (MESSAGE):';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 font-mono">
          
          {/* BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* TERMINAL WINDOW */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0c0c0c] rounded-lg shadow-2xl overflow-hidden border border-gray-800 flex flex-col min-h-[400px]"
            onClick={() => inputRef.current?.focus()} // Clicking anywhere focuses input
          >
            
            {/* WINDOW HEADER */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center relative border-b border-gray-800 shrink-0">
               <div className="flex gap-2 absolute left-4">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-red-600 transition-colors" /> 
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /> 
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" /> 
               </div>
               <div className="mx-auto text-gray-500 text-xs tracking-widest select-none">
                 secure:uplink
               </div>
            </div>

            {/* TERMINAL CONTENT AREA */}
            <div className="p-6 md:p-10 flex-1 overflow-y-auto flex flex-col justify-start text-left" style={{ scrollBehavior: 'smooth' }}>
              
              {/* 1. RENDER HISTORY (Previous lines) */}
              {history.map((line, i) => (
                <div key={i} className="mb-6 opacity-70">
                  <p className="text-cyan-400 text-sm mb-1">{line.prompt}</p>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-green-500">{`>`}</span>
                    <span className="text-white font-bold">{line.value}</span>
                  </div>
                </div>
              ))}

              {/* 2. RENDER CURRENT ACTIVE INPUT */}
              {(step === 'name' || step === 'email' || step === 'message') && (
                <div className="mb-6">
                  <p className="text-cyan-400 text-sm mb-1 typing-effect">
                    {getPromptText(step)}
                  </p>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-green-500 animate-pulse">{`>`}</span>
                    <input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent border-none outline-none text-white font-bold caret-white"
                      autoComplete="off"
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* 3. LOADING STATE */}
              {step === 'submitting' && (
                <div className="mt-4">
                  <p className="text-yellow-400 animate-pulse text-sm">
                    [ ENCRYPTING & TRANSMITTING PACKETS... ]
                  </p>
                </div>
              )}

              {/* 4. SUCCESS STATE */}
              {step === 'success' && (
                <div className="mt-4 space-y-2">
                  <p className="text-green-500 text-xl font-bold">
                    [ ✔ TRANSMISSION SUCCESSFUL ]
                  </p>
                  <p className="text-gray-500 text-xs">
                    > Closing connection in 3... 2... 1...
                  </p>
                </div>
              )}

               {/* 5. ERROR STATE */}
               {step === 'error' && (
                <div className="mt-4">
                   <p className="text-red-500 font-bold">
                    [ ✖ ERROR: CONNECTION SEVERED ]
                  </p>
                  <button 
                    onClick={() => { setStep('name'); setHistory([]); }}
                    className="mt-2 text-xs text-gray-400 hover:text-white underline underline-offset-4"
                  >
                    [ RETRY HANDSHAKE ]
                  </button>
                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}