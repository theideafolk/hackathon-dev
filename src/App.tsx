import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import PrizesSection from './components/PrizesSection';
import JudgesSection from './components/JudgesSection';
import ParticipantsSection from './components/ParticipantsSection';
import HowToParticipateSection from './components/HowToParticipateSection';
import ImpactSection from './components/ImpactSection';
import JourneyMap from './components/JourneyMap';
import Footer from './components/Footer';
import StickyHeader from './components/StickyHeader';
import CtaSection from './components/CtaSection';

function App() {
  useEffect(() => {
    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      
      @keyframes subtle-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .animate-subtle-rotate {
        animation: subtle-rotate 180s linear infinite;
      }
      
      .shadow-blue-glow {
        box-shadow: 0 0 25px 5px rgba(0, 163, 255, 0.3);
      }
      
      .text-shadow-blue {
        text-shadow: 0 0 15px rgba(0, 163, 255, 0.5);
      }

      .transform-style-3d {
        transform-style: preserve-3d;
      }

      .perspective-\\[1200px\\] {
        perspective: 1200px;
      }

      .translate-z-4 {
        transform: translateZ(4px);
      }

      .translate-z-6 {
        transform: translateZ(6px);
      }

      .translate-z-8 {
        transform: translateZ(8px);
      }

      .translate-z-12 {
        transform: translateZ(12px);
      }
      
      .translate-z-16 {
        transform: translateZ(16px);
      }
      
      .translate-z-20 {
        transform: translateZ(20px);
      }

      .hover\\:translate-z-4:hover {
        transform: translateZ(4px);
      }

      .hover\\:translate-z-6:hover {
        transform: translateZ(6px);
      }

      .hover\\:translate-z-8:hover {
        transform: translateZ(8px);
      }

      .hover\\:translate-z-12:hover {
        transform: translateZ(12px);
      }
      
      .hover\\:translate-z-16:hover {
        transform: translateZ(16px);
      }
      
      .hover\\:translate-z-20:hover {
        transform: translateZ(20px);
      }
      
      /* Mobile adjustments for 3D effects */
      @media (max-width: 768px) {
        .translate-z-4, .translate-z-6, .translate-z-8, .translate-z-12, .translate-z-16, .translate-z-20,
        .hover\\:translate-z-4:hover, .hover\\:translate-z-6:hover, .hover\\:translate-z-8:hover, 
        .hover\\:translate-z-12:hover, .hover\\:translate-z-16:hover, .hover\\:translate-z-20:hover {
          transform: translateZ(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Add viewport meta tag for better mobile rendering if not already present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(viewport);
    }
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-black text-white perspective-[1200px]">
      <StickyHeader />
      <main className="pt-16 md:pt-20"> {/* Added padding to account for fixed header */}
        <HeroSection />
        <JourneyMap />
        <section id="prizes">
          <PrizesSection />
        </section>
        <section id="judges">
          <JudgesSection />
        </section>
        <ParticipantsSection />
        <HowToParticipateSection />
        <ImpactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;