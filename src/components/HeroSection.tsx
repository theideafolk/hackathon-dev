import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Ticker from './Ticker';
import ScrambledText from './ScrambledText';
import { DollarSign } from 'lucide-react';

// Dollar bill component for confetti
const DollarBill = ({ index }: { index: number }) => {
  const randomX = Math.random() * 140 - 70; // -70 to 70
  const randomY = Math.random() * 140 - 70; // -70 to 70
  const randomRotate = Math.random() * 720 - 360; // -360 to 360
  const randomScale = 0.4 + Math.random() * 1.8; // Varying sizes
  const randomDelay = Math.random() * 0.8;
  const randomAmount = Math.floor(Math.random() * 900) + 100; // $100k to $999k
  
  return (
    <motion.div
      className="fixed pointer-events-none z-30"
      initial={{ 
        x: 0, 
        y: 0, 
        rotate: 0,
        scale: 0,
        opacity: 0 
      }}
      animate={{ 
        x: randomX + 'vw', 
        y: randomY + 'vh', 
        rotate: randomRotate,
        scale: randomScale,
        opacity: [0, 1, 0.8, 0]
      }}
      transition={{ 
        duration: 2 + Math.random() * 2,
        delay: randomDelay,
        ease: "easeOut"
      }}
      style={{
        top: '50%',
        left: '50%',
      }}
    >
      <div className="w-16 h-9 bg-[#00A3FF]/20 backdrop-blur-sm flex items-center justify-center rounded border border-[#00A3FF]/60 text-[#00A3FF] text-xs font-bold shadow-lg shadow-[#00A3FF]/20">
        <DollarSign size={14} className="mr-0.5" />
        <span>{randomAmount}k</span>
      </div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  // Generate dollars for confetti
  const [showConfetti, setShowConfetti] = useState(true);
  const dollars = Array.from({ length: 80 }, (_, i) => i);
  
  // Trigger confetti effect
  React.useEffect(() => {
    // Show initial confetti
    setShowConfetti(true);
    
    // Hide after animation completes
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add metal shine effect CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes metalShine {
        0% {
          background-position: -100px;
        }
        60% {
          background-position: 500px;
        }
        100% {
          background-position: 500px;
        }
      }
      
      .metal-text {
        background: linear-gradient(
          to right,
          #00A3FF 0%,
          #ffffff 45%,
          #87CEFA 50%,
          #00A3FF 55%,
          #87CEFA 100%
        );
        background-size: 600px 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: metalShine 4s infinite linear;
        text-shadow: 0 0 10px rgba(0, 163, 255, 0.3);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const triggerConfetti = () => {
    if (!showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  return (
    <div id="about" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden perspective-[1200px]">
      {/* Background with animated gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A1A2A] to-[#001A33] z-0">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-0.5 h-64 bg-[#00A3FF]"
              style={{
                left: `${10 + i * 20}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
                transform: 'rotate(15deg)'
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                height: ["40vh", "60vh", "40vh"]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Dollar confetti effect */}
      {showConfetti && dollars.map((i) => (
        <DollarBill key={i} index={i} />
      ))}

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-full md:max-w-5xl transform-style-3d pt-20 md:pt-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="mb-4 md:mb-8"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
            rotateY: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap size={60} className="mx-auto text-[#00A3FF] md:w-20 md:h-20 transform hover:translate-z-12 transition duration-300" />
        </motion.div>
        
        <div className="flex flex-col items-center">
          {/* First line: the $1M+ */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight transform hover:translate-z-20 transition duration-500 px-2 mb-0 md:mb-1"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              textShadow: "0 0 25px rgba(0, 163, 255, 0.7)",
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onMouseEnter={triggerConfetti}
          >
            <ScrambledText text="the" duration={1} /> <span className="text-[#00A3FF] font-extrabold text-5xl sm:text-6xl md:text-8xl lg:text-9xl"><ScrambledText text="$1M+" duration={1.2} /></span>
          </motion.h1>
          
          {/* Second line: bolt.new hackathon */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight transform hover:translate-z-20 transition duration-500 px-2 mb-4 md:mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              textShadow: "0 0 25px rgba(0, 163, 255, 0.7)",
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <span className="metal-text font-extrabold">
              <ScrambledText text="bolt.new" duration={1.3} />
            </span> <ScrambledText text="hackathon" duration={1.5} />
          </motion.h1>
        </div>
        
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-4 md:mb-6 transform hover:translate-z-12 transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          world's largest hackathon ever!
        </motion.h2>
        
        {/* Ticker above CTA */}
        <div className="mb-8 md:mb-12 rounded-lg overflow-hidden border border-[#00A3FF]/30 bg-black/40 backdrop-blur-sm transform hover:translate-z-8 transition duration-300">
          <Ticker />
        </div>
        
        <motion.a 
          href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#00A3FF] hover:bg-[#0084D1] text-white font-bold py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-lg text-lg md:text-xl transition shadow-blue-glow transform hover:translate-z-16 transition duration-500"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 30px rgba(0, 163, 255, 0.6)" 
          }}
          whileTap={{ scale: 0.98 }}
        >
          register now
        </motion.a>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-5 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
};

export default HeroSection;