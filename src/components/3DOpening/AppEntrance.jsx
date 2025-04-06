
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningScene from './OpeningScene';

const AppEntrance = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
    }
    setIsLoading(false);
  }, []);

  const handleStart = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="relative h-screen w-full">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <OpeningScene onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppEntrance;
