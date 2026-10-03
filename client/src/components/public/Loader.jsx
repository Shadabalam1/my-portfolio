import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVisible]);

  useEffect(() => {
    let timer;
    if (isLoading) {
      // Animate progress up to 90% while waiting for backend
      const duration = 2000; // 2 seconds to reach 90%
      const intervalTime = 30;
      const steps = duration / intervalTime;
      let currentStep = 0;

      timer = setInterval(() => {
        currentStep++;
        const t = currentStep / steps;
        const easedProgress = t * (2 - t); 
        
        const newProgress = Math.min(Math.floor(easedProgress * 92), 92); // Pause at 92%
        setProgress(newProgress);
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, intervalTime);
    } else {
      // When backend wakes up and data is loaded, jump to 100%
      setProgress(100);
      // Wait briefly at 100% then fade out
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 400);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-neutral-900"
        >
          <div className="w-full max-w-[280px] sm:max-w-xs px-4 flex flex-col relative">
            
            <div className="w-full flex justify-end mb-8">
              <span className="text-sm font-mono tracking-widest text-neutral-500">
                {progress}%
              </span>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-xl sm:text-2xl font-semibold tracking-[0.2em] text-neutral-900 mb-2">
                SHADAB ALAM
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] text-neutral-500 uppercase">
                Software Developer
              </p>
            </motion.div>

            <div className="w-full h-[1px] bg-neutral-200 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-neutral-900 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
