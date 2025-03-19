import React from 'react';
import { motion } from 'framer-motion';
import ScrambledText from './ScrambledText';

interface Judge {
  id: number;
  name: string;
  role: string;
  company: string;
  twitter: string;
  imageFilename: string;
}

const JudgesSection: React.FC = () => {
  const judges: Judge[] = [
    {
      id: 1,
      name: "pieter levels",
      role: "indie maker",
      company: "nomad list, remote ok",
      twitter: "levelsio",
      imageFilename: "levels.jpg"
    },
    {
      id: 2,
      name: "logan kilpatrick",
      role: "developer advocate",
      company: "openAI",
      twitter: "OfficialLoganK",
      imageFilename: "logan.jpg"
    },
    {
      id: 3,
      name: "sara normous",
      role: "founder",
      company: "tech ventures",
      twitter: "saranormous",
      imageFilename: "sara.jpg"
    },
    {
      id: 4,
      name: "theo",
      role: "creator",
      company: "t3.gg",
      twitter: "theo",
      imageFilename: "theo.jpg"
    },
    {
      id: 5,
      name: "evan you",
      role: "creator",
      company: "vue.js",
      twitter: "youyuxi",
      imageFilename: "youyu.jpg"
    },
    {
      id: 6,
      name: "kp",
      role: "founder",
      company: "100ms",
      twitter: "thisiskp_",
      imageFilename: "kp.jpg"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="py-24 md:py-32 px-4 bg-black relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <ScrambledText text="hall of legends" duration={1.3} />
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
            meet our distinguished panel of industry experts who will be evaluating your creations
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {judges.map(judge => (
            <motion.div key={judge.id} variants={item}>
              <motion.div 
                className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#00A3FF]/10 group"
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 30px rgba(0, 163, 255, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col sm:flex-row items-center p-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-4">
                    <img 
                      src={`/judges/${judge.imageFilename}`} 
                      alt={judge.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/150/1A1A1A/00A3FF?text=${judge.name.charAt(0).toUpperCase()}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-white font-bold text-lg md:text-xl group-hover:text-[#00A3FF] transition-colors">{judge.name}</h3>
                    <p className="text-gray-300 text-sm">{judge.role}</p>
                    <p className="text-[#00A3FF] font-medium text-sm">{judge.company}</p>
                    
                    {/* Twitter Link */}
                    <motion.a 
                      href={`https://twitter.com/${judge.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-gray-400 hover:text-[#1DA1F2] transition-colors text-sm"
                      whileHover={{ scale: 1.05, color: "#1DA1F2" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>@{judge.twitter}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default JudgesSection;