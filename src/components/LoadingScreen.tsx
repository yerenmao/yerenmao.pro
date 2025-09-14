'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';


const TransitionEffect = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="layer-1"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut"}}
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-40' 
        style={{ backgroundColor: 'var(--primary-dark)' }}
      />
      <motion.div
        key="layer-2"
        initial={{ x: "-100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut"}}
        className='fixed top-0 bottom-0 left-full w-screen h-screen z-30' 
        style={{ backgroundColor: 'var(--primary-light)' }}
      />
    </AnimatePresence>   
  );
};

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('LoadingScreen: Starting timer');
    // Show loading screen for 2.4 seconds (0.8 + 0.2 + 0.8 + 0.4 + 0.2 buffer)
    const timer = setTimeout(() => {
      console.log('LoadingScreen: Timer finished, hiding loading screen');
      setIsLoading(false);
      // Focus window immediately after loading screen disappears
      window.focus();
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-100">
      <TransitionEffect />
      
      {/* Bird Image with Grow and Fade Animation */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1.2, 1.5]
        }}
        transition={{
          duration: 0.7,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut"
        }}
      >
        <img
          src="/honchkrow.png"
          alt="Loading Bird"
          className="w-64 h-64 object-contain"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))'
          }}
        />
      </motion.div>
    </div>
  );
}
