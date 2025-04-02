
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningScene from './OpeningScene';

const AppEntrance = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  
  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
      setHasOpenedBefore(true);
    }
  }, []);
  
  const handleStart = () => {
    setShowIntro(false);
    // Save that user has seen intro
    localStorage.setItem('hasSeenIntro', 'true');
  };
  
  return (
    <div className="relative">
      {showIntro ? (
        <OpeningScene onStart={handleStart} />
      ) : (
        <AnimatePresence>
          <motion.div
            key="main-app"
            initial={!hasOpenedBefore ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AppEntrance;
