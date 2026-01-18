import ParticlesBackground from '@/components/ui/ParticlesBackground';
import HeroSpotlight from '@/components/ui/HeroSpotlight';
import AboutSection from '@/components/ui/AboutSection';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import AchieveSection from '@/components/ui/ProjectAccordion';
import TeamSection from '@/components/ui/TeamSection';
import ReviewSection from '@/components/ui/ReviewSection';
import ContactSection from '@/components/ui/ContactSection';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-transparent text-black">
      
      {/* 1. BACKGROUND */}
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
        
        {/* ADDED: PROCESS TIMELINE HERE */}
        <ProcessTimeline />
        
        <AchieveSection />

        <TeamSection />
        
        <ReviewSection />
        
        <ContactSection />
        
      </div>

    </main>
  );
}