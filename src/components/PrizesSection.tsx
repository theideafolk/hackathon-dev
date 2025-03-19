import React, { useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import ScrambledText from './ScrambledText';

// Dollar bill component for confetti
const DollarBill = ({ index }: { index: number }) => {
  const randomX = Math.random() * 140 - 70; // -70 to 70 (wider spread)
  const randomY = Math.random() * 140 - 70; // -70 to 70 (wider spread)
  const randomRotate = Math.random() * 720 - 360; // -360 to 360 (more rotation)
  const randomScale = 0.4 + Math.random() * 1.8; // Varying sizes
  const randomDelay = Math.random() * 0.8; // More varied timing
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
        duration: 2 + Math.random() * 2, // Longer animation
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

const PrizesSection: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  // Generate dollars for confetti - increased amount
  const dollars = Array.from({ length: 80 }, (_, i) => i);
  
  // Sponsor logos
  const sponsorLogos = [
    { name: 'Algo Foundation', image: '/sponsors/algoFoundation.jpg' },
    { name: 'Loops', image: '/sponsors/loops.jpg' },
    { name: 'Sentry', image: '/sponsors/sentry.png' },
    { name: 'Cloudflare', image: '/sponsors/cloudflare.jpg' },
    { name: 'Netlify', image: '/sponsors/netlify.png' },
    { name: 'Supabase', image: '/sponsors/supabase.jpg' }
  ];

  React.useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
      
      // Trigger confetti once when scrolled into view
      const timer = setTimeout(() => {
        setShowConfetti(true);
        // Hide it after animation completes
        setTimeout(() => setShowConfetti(false), 4000);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, controls]);

  // Function to trigger confetti on hover of prize text
  const triggerConfetti = () => {
    if (!showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="py-24 md:py-32 px-4 bg-gradient-to-b from-black via-[#040e1a] to-[#001A33] relative overflow-hidden perspective-[1200px]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00A3FF]/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00A3FF]/30"></div>
      </div>
      
      {/* Dollar confetti effect */}
      {showConfetti && dollars.map((i) => (
        <DollarBill key={i} index={i} />
      ))}
      
      <div className="max-w-6xl mx-auto relative z-10 transform-style-3d">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20, z: -5 }}
          animate={controls}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transform hover:translate-z-8 transition duration-300"
            whileHover={{ 
              textShadow: "0 0 15px rgba(0, 163, 255, 0.6)",
              scale: 1.05
            }}
            onMouseEnter={triggerConfetti}
          >
            <span className="text-gradient bg-gradient-to-r from-[#00A3FF] to-[#87CEFA]">
              <ScrambledText text="$1M+" duration={1.2} />
            </span> <ScrambledText text="prize pool" duration={1.5} />
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-xl italic transform hover:translate-z-4 transition duration-300"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={triggerConfetti}
          >
            closing in on <span className="text-[#00A3FF] font-bold">$2M</span>!
          </motion.p>
        </motion.div>
        
        {/* Prize pool image with 3D effect */}
        <div className="relative mx-auto max-w-3xl mb-16 transform-style-3d">
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-2xl transform hover:translate-z-12 transition duration-500"
            initial={{ opacity: 0, y: 20, rotateX: 2, rotateY: -2 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ 
              boxShadow: "0 0 30px rgba(0, 163, 255, 0.3)",
              rotateX: 2,
              rotateY: -2
            }}
            onMouseEnter={triggerConfetti}
          >
            {/* Prize pool image */}
            <img 
              src="/prize-pool.jpg" 
              alt="$1M+ Prize Pool" 
              className="w-full"
            />
            
            {/* Overlay to help the image blend with the background */}
            <div className="absolute inset-0 bg-radial-gradient opacity-70"></div>
            
            {/* Text overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-white font-bold text-3xl md:text-4xl text-shadow-blue">
                $1M<span className="text-[#00A3FF]">+</span>
              </h3>
              <p className="text-white text-xl">prize pool</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Horizontal sponsor logos with 3D effect */}
        <motion.div 
          className="mb-10 transform-style-3d"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h3 
            className="text-center text-xl md:text-2xl font-bold text-white mb-6 transform hover:translate-z-6 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Sponsored By
          </motion.h3>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 transform-style-3d">
            {sponsorLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="bg-white p-2 md:p-3 rounded-lg shadow-lg transform hover:translate-z-8 transition duration-300"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(0, 163, 255, 0.5)",
                  rotateY: 10,
                  rotateX: 5
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden flex items-center justify-center">
                  <img 
                    src={logo.image}
                    alt={logo.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback for any missing images
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/150/FFFFFF/333333?text=${logo.name.charAt(0)}`;
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12 transform-style-3d"
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p 
            className="text-gray-300 text-base md:text-lg transform hover:translate-z-4 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            backed by the world's leading tech companies and venture capital firms
          </motion.p>
          <motion.a 
            href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-block mt-6 md:mt-8 bg-[#00A3FF] hover:bg-[#0084D1] text-white font-bold py-3 px-8 rounded-lg transition shadow-blue-glow transform hover:translate-z-8 transition duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(0, 163, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            register now
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default PrizesSection;