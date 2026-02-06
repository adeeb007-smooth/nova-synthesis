'use client';

import { useState, useEffect } from 'react';
import ParticlesBackground from '@/components/ui/ParticlesBackground';
import HeroSpotlight from '@/components/ui/HeroSpotlight';
import AboutSection from '@/components/ui/AboutSection';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import AchieveSection from '@/components/ui/ProjectAccordion'; // Or AchieveSection if you renamed it
import TeamSection from '@/components/ui/TeamSection';
import ReviewSection from '@/components/ui/ReviewSection';
import ContactSection from '@/components/ui/ContactSection';
// IMPORT THE PRELOADER
import Preloader from '@/components/ui/Preloader'; // Assuming you saved the previous code as LoadingScreen.tsx
// If you named the file Preloader.tsx, change the line above to: import Preloader from '@/components/ui/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-transparent text-black">
      
      {/* 0. PRELOADER */}
      {/* It sits on top (z-50) and handles its own exit animation */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* 1. BACKGROUND */}
      {/* We render this immediately so it's ready when the loader vanishes */}
      <ParticlesBackground />

      {/* 2. HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center z-10">
        <div className="flex flex-col items-center w-full">
          <HeroSpotlight />
          {/* Divider removed per previous request */}
        </div>
      </section>

      {/* 3. CONTENT STACK */}
      <div className="relative z-20 bg-white">
        
        <AboutSection />
        
        <ProcessTimeline />
        
        <AchieveSection />

        <TeamSection />
        
        <ReviewSection />
        
        <ContactSection />
        
      </div>

    </main>
  );
}