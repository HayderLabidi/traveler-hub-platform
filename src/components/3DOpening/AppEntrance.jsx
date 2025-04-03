
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningScene from './OpeningScene';

const AppEntrance = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
      setHasOpenedBefore(true);
    }
    // Mark component as initialized
    setIsInitialized(true);
  }, []);
  
  const handleStart = () => {
    setShowIntro(false);
    // Save that user has seen intro
    localStorage.setItem('hasSeenIntro', 'true');
  };

  // Force reset the intro for testing purposes - remove localStorage item
  const resetIntro = () => {
    localStorage.removeItem('hasSeenIntro');
    window.location.reload();
  };
  
  // Wait until the component is initialized before rendering anything
  if (!isInitialized) {
    return null;
  }
  
  return (
    <div className="relative h-full w-full">
      {showIntro ? (
        <OpeningScene onStart={handleStart} />
      ) : (
        <AnimatePresence>
          <motion.div
            key="main-app"
            initial={!hasOpenedBefore ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {children}
            {/* Dev button to reset intro - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                onClick={resetIntro}
                className="fixed bottom-2 right-2 bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-50 hover:opacity-100"
              >
                Reset Intro
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AppEntrance;
