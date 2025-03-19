import React, { useState, useRef } from 'react';
import { motion, useInView, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Twitter } from 'lucide-react';
import ScrambledText from './ScrambledText';

interface Submission {
  id: number;
  url: string;
  twitterHandle: string;
  twitterUrl: string;
  displayName?: string;
}

const ProjectCard: React.FC<{ submission: Submission; index: number }> = ({ submission, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col bg-[#0F0F0F] rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-[#1A1A1A] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ 
        scale: 1.02, 
        borderColor: "rgba(0, 163, 255, 0.4)",
        boxShadow: "0 0 20px rgba(0, 163, 255, 0.2)"
      }}
    >
      {/* Website preview */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/20 opacity-50 z-10"></div>
        <iframe 
          src={submission.url} 
          title={`Preview of ${submission.twitterHandle}'s submission`}
          className="w-full h-full transform scale-[0.75] origin-top"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute top-2 right-2 z-20">
          <motion.a 
            href={submission.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#00A3FF] hover:bg-[#0084D1] text-white p-1.5 rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink size={14} />
          </motion.a>
        </div>
      </div>
      
      {/* Card footer with creator info */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-white">
            {submission.displayName || submission.twitterHandle}
          </h3>
          <motion.a 
            href={submission.twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1DA1F2] text-sm flex items-center mt-1"
            whileHover={{ x: 2 }}
          >
            <Twitter size={14} className="mr-1" />
            <span>@{submission.twitterHandle.replace('https://x.com/', '')}</span>
          </motion.a>
        </div>
        <motion.a 
          href={submission.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#00A3FF] hover:text-white text-xs bg-[#00A3FF]/10 hover:bg-[#00A3FF] px-2 py-1 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Site
        </motion.a>
      </div>
    </motion.div>
  );
};

const ImpactSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const submissions: Submission[] = [
    {
      id: 1,
      url: "https://t.co/pN0UcPtImB",
      twitterHandle: "ruark",
      twitterUrl: "https://x.com/ruark"
    },
    {
      id: 2,
      url: "https://chic-boba-762b1b.netlify.app",
      twitterHandle: "ruark",
      twitterUrl: "https://x.com/ruark"
    },
    {
      id: 3,
      url: "https://spiffy-fudge-aebc33.netlify.app",
      twitterHandle: "lalopenguin",
      twitterUrl: "https://x.com/lalopenguin"
    },
    {
      id: 4,
      url: "https://bolt-hackathondev.netlify.app",
      twitterHandle: "MuhammadN_orani",
      twitterUrl: "https://x.com/MuhammadN_orani"
    },
    {
      id: 5,
      url: "https://funny-bonbon-158cd1.netlify.app",
      twitterHandle: "km_bndr",
      twitterUrl: "https://x.com/km_bndr"
    },
    {
      id: 6,
      url: "https://v0-hackathon-website-info.vercel.app",
      twitterHandle: "km_bndr",
      twitterUrl: "https://x.com/km_bndr"
    },
    {
      id: 7,
      url: "https://gilded-kringle-6ce8fa.netlify.app/",
      twitterHandle: "pal_analytics",
      twitterUrl: "https://x.com/pal_analytics"
    }
  ];
  
  const ITEMS_PER_PAGE = {
    sm: 1,
    md: 2,
    lg: 3
  };
  
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE.lg);
  
  const handlePrev = () => {
    setCurrentPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handlePrev();
    } else if (info.offset.x < -100) {
      handleNext();
    }
  };

  return (
    <div id="submissions" className="py-20 md:py-32 px-4 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 w-72 h-72 bg-[#00A3FF]/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute right-10 bottom-10 w-72 h-72 bg-[#00A3FF]/5 rounded-full filter blur-[120px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            <ScrambledText text="built with bolt" duration={1.3} />
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
            phase 1 submissions: competitor landing pages for the hackathon
          </p>
        </motion.div>
        
        {/* Desktop View: Grid layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mb-12">
            {submissions.map((submission, index) => (
              <ProjectCard key={submission.id} submission={submission} index={index} />
            ))}
          </div>
        </div>
        
        {/* Mobile View: Swipeable Carousel */}
        <div className="md:hidden relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={handlePrev}
              className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-r-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={handleNext}
              className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-l-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          
          <div className="overflow-hidden rounded-xl">
            <motion.div 
              ref={carouselRef}
              className="flex transition-all duration-500 ease-out pb-10" 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{ 
                x: -currentPage * 100 + '%' 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              {submissions.map((submission, index) => (
                <div key={submission.id} className="min-w-full px-4">
                  <ProjectCard submission={submission} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Pagination indicators */}
          <div className="absolute z-10 -bottom-2 left-0 right-0 flex justify-center space-x-2">
            {Array.from({ length: submissions.length }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'bg-[#00A3FF] w-6 shadow-[0_0_10px_rgba(0,163,255,0.5)]' 
                    : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          
          {/* Swipe instruction */}
          <motion.div 
            className="text-center text-xs text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Swipe or tap arrows to navigate
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;