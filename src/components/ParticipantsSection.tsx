import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrambledText from './ScrambledText';

const ParticipantsSection: React.FC = () => {
  const [participantCount, setParticipantCount] = useState(5000);
  
  // Simulated counter that increases over time
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-24 md:py-32 px-4 bg-gradient-to-b from-[#001A33] to-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <ScrambledText text="global participation" duration={1.3} />
          </h2>
          <p className="text-xl md:text-2xl text-white inline-flex items-baseline flex-wrap justify-center">
            <span>join</span>
            <motion.span 
              className="mx-2 font-bold relative"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl md:text-4xl text-[#00A3FF] text-shadow-blue">
                {participantCount.toLocaleString()}+
              </span>
            </motion.span>
            <span>innovators from around the world</span>
          </p>
        </motion.div>
        
        {/* World map image */}
        <motion.div 
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 md:mb-16 transform-style-3d"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ 
            boxShadow: "0 0 30px rgba(0, 163, 255, 0.2)",
            scale: 1.01,
            rotateX: 1,
            rotateY: 1
          }}
        >
          <img 
            src="/worldwide-participation.jpg" 
            alt="Worldwide Participation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl text-[#00A3FF] font-medium">
            worldwide participation
          </p>
          <motion.a 
            href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 md:mt-8 bg-[#00A3FF] hover:bg-[#0084D1] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition shadow-blue-glow transform hover:translate-z-8"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(0, 163, 255, 0.4)" 
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

export default ParticipantsSection;