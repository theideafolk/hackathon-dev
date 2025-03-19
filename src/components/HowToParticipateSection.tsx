import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardEdit, Code, Upload } from 'lucide-react';
import ScrambledText from './ScrambledText';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-[#0A0A0A] to-[#121212] rounded-2xl p-4 sm:p-6 md:p-8 border border-[#1A1A1A] h-full flex flex-col"
      whileHover={{ 
        scale: 1.03,
        borderColor: 'rgba(0, 163, 255, 0.3)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-4 md:mb-6">
        <motion.div 
          className="bg-gradient-to-r from-[#00A3FF] to-[#0084D1] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 15px rgba(0, 163, 255, 0.6)" 
          }}
        >
          {number}
        </motion.div>
        <div className="ml-4">
          <div className="text-[#00A3FF] mb-1">
            {icon}
          </div>
          <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm md:text-base">{description}</p>
    </motion.div>
  );
};

const HowToParticipateSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "register",
      description: "sign up for the hackathon with your email and create your team or join solo.",
      icon: <ClipboardEdit size={20} className="md:w-6 md:h-6" />,
    },
    {
      number: 2,
      title: "build",
      description: "use bolt.new to create your project with our cutting-edge no-code platform.",
      icon: <Code size={20} className="md:w-6 md:h-6" />,
    },
    {
      number: 3,
      title: "submit",
      description: "upload your completed project before the deadline for judging.",
      icon: <Upload size={20} className="md:w-6 md:h-6" />,
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
    <div className="py-20 md:py-32 px-4 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 w-64 h-64 bg-[#00A3FF]/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute right-0 bottom-20 w-80 h-80 bg-[#0084D1]/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            <ScrambledText text="how to participate" duration={1.3} />
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            follow these simple steps to join the world's largest coding hackathon
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map(step => (
            <motion.div key={step.number} variants={item} className="h-full">
              <Step 
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HowToParticipateSection;