import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a 
            href="https://bolt.new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-[#00A3FF] transition-colors mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/bolt-logo.png" alt="Bolt Logo" className="h-5 md:h-6 mr-2" />
            <span className="text-sm md:text-base">powered by bolt.new</span>
          </motion.a>
          
          <div className="flex items-center">
            <motion.a 
              href="https://hackathon.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#00A3FF] transition-colors text-sm md:text-base flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold mr-1">hackathon.dev</span>
              <span className="text-xs bg-[#00A3FF]/10 text-[#00A3FF] px-2 py-0.5 rounded">2025</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;