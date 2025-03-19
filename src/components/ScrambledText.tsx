import React, { useState, useEffect, useRef } from 'react';

interface ScrambledTextProps {
  text: string;
  className?: string;
  duration?: number;
  children?: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({ 
  text, 
  className = '', 
  duration = 1.5,
  children
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // If children are provided, just render them
  if (children) {
    return <span className={className}>{children}</span>;
  }
  
  // Initially set display text to the original text to avoid flashing empty content
  useEffect(() => {
    setDisplayText(text);
  }, [text]);
  
  // Set up intersection observer to trigger animation when element comes into view
  useEffect(() => {
    if (!elementRef.current || hasStarted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setIsScrambling(true);
          setHasStarted(true);
          setDisplayText(''); // Reset display text before starting animation
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    
    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);
  
  // Handle the scrambling animation
  useEffect(() => {
    if (!isScrambling) return;

    // Animation frame-based scrambling for smoother effect
    const scramble = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Generate scrambled text
      const scrambled = text
        .split('')
        .map((char, index) => {
          // Always keep spaces and special characters as is
          if (char === ' ' || char === '+' || char === '$' || char === ',') return char;
          
          // Gradually reveal more correct characters as we progress
          if (progress > 0.5 && Math.random() < progress * 1.5) {
            return text[index];
          }
          
          // Otherwise return random character
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');
      
      setDisplayText(scrambled);
      
      // Continue scrambling until duration is reached
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };
    
    frameRef.current = requestAnimationFrame(scramble);
    
    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, isScrambling, duration]);
  
  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
};

export default ScrambledText;