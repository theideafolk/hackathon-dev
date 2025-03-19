import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Ticker: React.FC = () => {
  const tickerItems = [
    "prize pool closing in on $2M soon...!",
    "sponsors: Algo Foundation, Loops, Sentry, Cloudflare, Netlify, Supabase, and more",
    "judges: Pieter Levels, Logan Kilpatrick, Sara Normous, Theo, Evan You, KP"
  ];
  
  const tickerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);
  
  useEffect(() => {
    if (tickerRef.current) {
      setTickerWidth(tickerRef.current.scrollWidth);
    }
    
    // Recalculate on window resize
    const handleResize = () => {
      if (tickerRef.current) {
        setTickerWidth(tickerRef.current.scrollWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-black/60 py-2 sm:py-3 overflow-hidden backdrop-blur-sm border-y border-[#00A3FF]/10">
      <motion.div 
        ref={tickerRef}
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -tickerWidth]
        }}
        transition={{
          repeat: Infinity,
          duration: 60, // Slower animation
          ease: "linear"
        }}
        style={{
          willChange: 'transform' // Performance optimization
        }}
      >
        {tickerItems.concat(tickerItems).map((item, index) => (
          <motion.div 
            key={index}
            className="mx-4 sm:mx-6 md:mx-8 text-white text-xs sm:text-sm md:text-base font-medium flex items-center"
            whileHover={{ 
              scale: 1.05, 
              color: "#00A3FF",
              transition: { duration: 0.2 }
            }}
          >
            <motion.span 
              className="text-[#00A3FF] mr-2"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >•</motion.span>
            <span className="truncate max-w-[300px] sm:max-w-none">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;