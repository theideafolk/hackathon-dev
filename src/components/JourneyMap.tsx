import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Verified as CheckVerified, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrambledText from './ScrambledText';

interface MilestoneProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}

interface TweetProps {
  id: string;
  username: string;
  handle: string;
  content: string;
  date: string;
}

const Milestone: React.FC<MilestoneProps> = ({ 
  title, 
  description, 
  isCompleted, 
  isActive, 
  onClick 
}) => {
  return (
    <div className="flex-1 relative">
      <motion.div 
        className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer mx-auto
                  ${isCompleted ? 'bg-[#00A3FF]' : 'bg-[#0A0A0A] border-2 border-[#00A3FF]/50'}
                  ${isActive ? 'shadow-[0_0_15px_rgba(0,163,255,0.7)]' : ''}`}
        onClick={onClick}
        whileHover={{ 
          scale: 1.2, 
          boxShadow: "0 0 20px rgba(0, 163, 255, 0.6)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isActive 
            ? ['0 0 5px rgba(0, 163, 255, 0.3)', '0 0 15px rgba(0, 163, 255, 0.7)', '0 0 5px rgba(0, 163, 255, 0.3)'] 
            : 'none'
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {isCompleted ? (
          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        ) : (
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00A3FF]/80 rounded-full"></div>
        )}
      </motion.div>
      
      <motion.div 
        className={`mt-3 md:mt-4 text-center ${isActive ? 'text-white' : 'text-gray-400'}`}
        animate={{ y: isActive ? 0 : 5, opacity: isActive ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-base md:text-lg font-bold">{title}</h3>
        <p className="text-xs md:text-sm">{description}</p>
      </motion.div>
    </div>
  );
};

const Tweet: React.FC<TweetProps> = ({ username, handle, content, date }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-[#15171A] to-[#1A1A1A] border border-gray-800 rounded-xl p-4 md:p-6 shadow-xl min-w-[250px] sm:min-w-[300px] max-w-[300px] sm:max-w-[350px] mx-2 md:mx-3 flex-shrink-0"
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        borderColor: "rgba(0, 163, 255, 0.3)"
      }}
    >
      <div className="flex items-start mb-3 md:mb-4">
        <motion.div 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white mr-3 shadow-lg overflow-hidden"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 10px rgba(29, 161, 242, 0.7)"
          }}
        >
          <img src="/eric.jpg" alt="Eric Simons" className="w-full h-full object-cover" />
        </motion.div>
        <div>
          <div className="flex items-center">
            <h4 className="text-white font-bold text-sm md:text-base">{username}</h4>
            <div className="flex items-center ml-1">
              <span className="text-[#1DA1F2]">
                <CheckVerified size={14} />
              </span>
              <span className="ml-1 h-3.5 w-3.5">
                <img src="/bolt-x.jpg" alt="Bolt X" className="h-full w-full object-contain" />
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-xs md:text-sm">{handle}</p>
        </div>
      </div>
      <p className="text-white text-sm md:text-md mb-3 md:mb-4 leading-relaxed whitespace-pre-line">
        {content}
      </p>
      <p className="text-gray-400 text-xs h-4">
        {date}
      </p>
    </motion.div>
  );
};

const JourneyMap: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [showScrollIndicators, setShowScrollIndicators] = useState(false);
  
  const milestones = [
    {
      title: "idea",
      description: "from a tweet to reality"
    },
    {
      title: "sponsors",
      description: "onboarded 5+ sponsors"
    },
    {
      title: "$1M",
      description: "first milestone reached"
    },
    {
      title: "$2M",
      description: "final goal in sight"
    }
  ];

  const tweets = [
    {
      id: "1902019001448087555",
      username: "Eric Simons",
      handle: "@ericsimons40",
      content: "I love this idea- Bolt will do it\n\nTo set world record of 100k people building together at the same hackathon, probably need a world record cash prize… maybe $100k? (Or more? *gulp* lol)\n\nWho's in?! Reply w ideas & sponsors 🫡",
      date: "8:57 PM · Mar 18, 2025"
    },
    {
      id: "1902065548764311803",
      username: "Eric Simons",
      handle: "@ericsimons40",
      content: "prize pool now >$1m\n\nform to register to participate and/or sponsor now live: https://bolt.fyi/1m-hackathon\n\nlezzzgoooo!!!",
      date: "12:02 AM · Mar 19, 2025"
    },
    {
      id: "1902075707318268244",
      username: "Eric Simons",
      handle: "@ericsimons40",
      content: "@levelsio & @OfficialLoganK are officially our first judges 🔥 LFG!!\n\nwho else should be a judge?",
      date: "12:42 AM · Mar 19, 2025"
    },
    {
      id: "1902103875076944114",
      username: "Eric Simons",
      handle: "@ericsimons40",
      content: "calling all vibe coders & designers: whoever makes the best website for this wins $3k",
      date: "2:34 AM · Mar 19, 2025"
    },
    {
      id: "1902237027766030345",
      username: "Eric Simons",
      handle: "@ericsimons40",
      content: "In the past 12 hours, this went from an idea @thisiskp_ tweeted to:\n\n💥 $1m+ in prizes committed (close to crossing $2m already 🤯)\n💥 50+ companies registered to sponsor\n💥 5k+ registered to compete\n💥 insanely stacked judges panel\n\nUnbelievable & more to come tomorrow- LFG!!!",
      date: "11:23 AM · Mar 19, 2025"
    }
  ];

  // Auto scroll tweets with option to pause
  useEffect(() => {
    if (isManualScrolling) {
      return;
    }
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        
        // Calculate new scroll position
        let newPosition = scrollPosition + 1;
        
        // Reset when we reach the end
        if (newPosition > scrollWidth - clientWidth) {
          newPosition = 0;
        }
        
        scrollRef.current.scrollLeft = newPosition;
        setScrollPosition(newPosition);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [scrollPosition, isManualScrolling]);
  
  // Handle manual scroll control
  const scrollLeft = () => {
    if (scrollRef.current) {
      setIsManualScrolling(true);
      const newPosition = Math.max(0, scrollPosition - 350);
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
      
      // Resume auto-scroll after a brief pause
      setTimeout(() => setIsManualScrolling(false), 1500);
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      setIsManualScrolling(true);
      const { scrollWidth, clientWidth } = scrollRef.current;
      const newPosition = Math.min(scrollWidth - clientWidth, scrollPosition + 350);
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
      
      // Resume auto-scroll after a brief pause
      setTimeout(() => setIsManualScrolling(false), 1500);
    }
  };
  
  // Show scroll indicators when the mouse is over the tweets container
  const handleMouseEnter = () => {
    setShowScrollIndicators(true);
  };
  
  const handleMouseLeave = () => {
    setShowScrollIndicators(false);
  };

  return (
    <div id="journey" className="py-10 md:py-16 px-4 bg-gradient-to-b from-black to-[#001A33]/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            <ScrambledText text="the prize pool is closer to $2M" duration={1.3} />
          </h2>
          <p className="text-gray-400 text-sm md:text-base">what's happened in the last 24 hours (or lesser)</p>
        </motion.div>
        
        <div className="relative mb-10 md:mb-16">
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-[#001A33] via-[#00A3FF] to-[#001A33] top-4 md:top-5"></div>
          
          {/* Milestones */}
          <div className="flex">
            {milestones.map((milestone, index) => (
              <Milestone
                key={index}
                title={milestone.title}
                description={milestone.description}
                isCompleted={index < activeIndex}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Twitter Posts with navigation controls */}
        <div className="mt-12 md:mt-16 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">latest updates</h3>
          
          {/* Left scroll button */}
          <motion.button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 text-white rounded-r-lg p-2 ${
              showScrollIndicators ? 'opacity-70' : 'opacity-0'
            } transition-opacity duration-300`}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          {/* Right scroll button */}
          <motion.button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 text-white rounded-l-lg p-2 ${
              showScrollIndicators ? 'opacity-70' : 'opacity-0'
            } transition-opacity duration-300`}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </motion.button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-4 md:pb-6 space-x-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#00A3FF]/20 hover:scrollbar-thumb-[#00A3FF]/40"
            onTouchStart={() => setIsManualScrolling(true)}
            onTouchEnd={() => setTimeout(() => setIsManualScrolling(false), 1500)}
            onMouseDown={() => setIsManualScrolling(true)}
            onMouseUp={() => setTimeout(() => setIsManualScrolling(false), 1500)}
          >
            {/* Add duplicate tweets at the end for continuous scrolling */}
            {[...tweets, ...tweets].map((tweet, index) => (
              <Tweet
                key={`${tweet.id}-${index}`}
                id={tweet.id}
                username={tweet.username}
                handle={tweet.handle}
                content={tweet.content}
                date={tweet.date}
              />
            ))}
          </div>
          
          {/* Scroll instruction indicator */}
          <motion.div 
            className="text-center mt-4 text-gray-400 text-xs opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
          >
            <span className="inline-flex items-center">
              <ChevronLeft size={14} className="mr-1" /> scroll to see more <ChevronRight size={14} className="ml-1" />
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JourneyMap;