import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer: React.FC = () => {
  // Set the target date to exactly 9 days from now
  const calculateTargetDate = () => {
    const now = new Date();
    const target = new Date(now);
    target.setDate(now.getDate() + 9);
    return target;
  };
  
  const [targetDate] = useState(calculateTargetDate());
  
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <motion.div 
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[999] bg-black/80 backdrop-blur-xl border border-[#00A3FF]/20 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.7,
        scale: isVisible ? 1 : 0.9,
        y: 0
      }}
      transition={{ duration: 0.4, type: "spring" }}
      whileHover={{ 
        opacity: 1, 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(0, 163, 255, 0.3)"
      }}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div className="p-2 sm:p-3 flex flex-col items-center">
        <h3 className="text-[10px] sm:text-xs font-bold text-white mb-1 opacity-80">
          hackathon starts in:
        </h3>
        
        <div className="flex space-x-2">
          <div className="text-center">
            <motion.div 
              className="bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#00A3FF]/30 rounded-lg w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-inner"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 10px rgba(0, 163, 255, 0.3)",
                borderColor: "rgba(0, 163, 255, 0.6)" 
              }}
            >
              <motion.span 
                className="text-xs sm:text-sm font-bold text-white"
                key={days}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {days}
              </motion.span>
            </motion.div>
            <span className="text-gray-400 text-[8px] sm:text-[10px] mt-0.5 block">d</span>
          </div>
          
          <div className="text-center">
            <motion.div 
              className="bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#00A3FF]/30 rounded-lg w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-inner"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 10px rgba(0, 163, 255, 0.3)",
                borderColor: "rgba(0, 163, 255, 0.6)" 
              }}
            >
              <motion.span 
                className="text-xs sm:text-sm font-bold text-white"
                key={hours}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {hours}
              </motion.span>
            </motion.div>
            <span className="text-gray-400 text-[8px] sm:text-[10px] mt-0.5 block">h</span>
          </div>
          
          <div className="text-center">
            <motion.div 
              className="bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#00A3FF]/30 rounded-lg w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-inner"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 10px rgba(0, 163, 255, 0.3)",
                borderColor: "rgba(0, 163, 255, 0.6)" 
              }}
            >
              <motion.span 
                className="text-xs sm:text-sm font-bold text-white"
                key={minutes}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {minutes}
              </motion.span>
            </motion.div>
            <span className="text-gray-400 text-[8px] sm:text-[10px] mt-0.5 block">m</span>
          </div>
          
          <div className="text-center">
            <motion.div 
              className="bg-gradient-to-b from-[#121212] to-[#1A1A1A] border border-[#00A3FF]/30 rounded-lg w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-inner"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 10px rgba(0, 163, 255, 0.3)",
                borderColor: "rgba(0, 163, 255, 0.6)" 
              }}
            >
              <motion.span 
                className="text-xs sm:text-sm font-bold text-white"
                key={seconds}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {seconds}
              </motion.span>
            </motion.div>
            <span className="text-gray-400 text-[8px] sm:text-[10px] mt-0.5 block">s</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;