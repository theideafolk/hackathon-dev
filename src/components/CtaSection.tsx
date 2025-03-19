import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrambledText from './ScrambledText';

const CtaSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div className="py-24 md:py-32 px-4 bg-gradient-to-b from-[#0A0A0A] to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 w-96 h-96 bg-[#00A3FF]/5 rounded-full filter blur-[150px]"></div>
        <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-[#00A3FF]/5 rounded-full filter blur-[150px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">
            <ScrambledText text="unleash your potential" duration={1.3} />
          </h2>
          
          <motion.p 
            className="text-center text-white text-lg md:text-xl mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            join <span className="font-bold text-[#00A3FF]">5k+ innovators</span>, judged by legends, backed by <span className="font-bold text-[#00A3FF]">50+ tech giants</span>. build a killer website/application with 
            <motion.span 
              className="text-[#00A3FF] hover:underline cursor-pointer font-medium px-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >bolt.new</motion.span>, 
            compete globally, and 
            <motion.span 
              className="text-[#00A3FF] hover:underline cursor-pointer font-medium pl-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >win big</motion.span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a 
              href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00A3FF] hover:bg-[#0084D1] text-white font-bold py-4 px-10 rounded-lg text-lg md:text-xl shadow-blue-glow"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(0, 163, 255, 0.6)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              register now
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CtaSection;