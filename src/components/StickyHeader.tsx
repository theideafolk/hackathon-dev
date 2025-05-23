import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const StickyHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Control body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          setMobileMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const navItems = [
    { name: "about", href: "#journey" },
    { name: "prizes", href: "#prizes" },
    { name: "judges", href: "#judges" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 bg-black/80 backdrop-blur-lg shadow-lg border-b border-[#00A3FF]/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <motion.a 
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <img src="/bolt-logo.png" alt="Bolt Logo" className="h-7 md:h-10 mr-2" />
            </motion.a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-10">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.name}
                href={item.href} 
                className="text-white hover:text-[#00A3FF] transition-colors font-medium text-sm lg:text-base"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05, 
                  color: "#00A3FF",
                  textShadow: "0 0 8px rgba(0, 163, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a 
              href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00A3FF] hover:bg-[#0084D1] text-white font-bold py-2 px-4 lg:px-6 rounded-lg text-sm lg:text-base transition"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0, 163, 255, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              register now
            </motion.a>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-[#00A3FF]/10 transition"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[1001] pt-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button inside mobile menu */}
            <motion.button
              className="absolute top-5 right-5 text-white p-2 rounded-full bg-[#00A3FF]/10 hover:bg-[#00A3FF]/20"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X size={24} />
            </motion.button>

            <div className="px-4 py-6 space-y-6 flex flex-col items-center">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href} 
                  className="block text-white hover:text-[#00A3FF] transition-colors py-3 font-medium text-xl text-center w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: "#00A3FF",
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.a 
                href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#00A3FF] hover:bg-[#0084D1] text-white font-bold py-4 px-4 rounded-lg transition mt-6 max-w-xs text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 15px rgba(0, 163, 255, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                register now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default StickyHeader;