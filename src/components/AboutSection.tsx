import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div id="about" className="py-20 md:py-32 px-4 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00A3FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          {/* rect element removed */}
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Main visualization */}
        <motion.div 
          className="relative overflow-hidden max-w-5xl mx-auto rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          whileHover={{ 
            boxShadow: "0 0 30px rgba(0, 163, 255, 0.3)",
            scale: 1.02
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/30 to-purple-500/20 z-10 mix-blend-overlay"></div>
          <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Digital matrix code on computer screens" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-48"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;