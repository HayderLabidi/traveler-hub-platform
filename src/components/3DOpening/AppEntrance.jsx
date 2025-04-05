
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingPage from '../LoadingPage';

const AppEntrance = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Force localStorage to be 'false' initially to ensure intro always shows on reload
    localStorage.setItem('hasSeenIntro', 'false');
    
    // Mark component as initialized
    setIsInitialized(true);
    
    // Log the state for debugging
    console.log('Initial localStorage state:', localStorage.getItem('hasSeenIntro'));
  }, []);
  
  const handleStart = () => {
    console.log('Starting app, setting hasSeenIntro to true');
    setShowIntro(false);
    // Save that user has seen intro
    localStorage.setItem('hasSeenIntro', 'true');
  };

  // Force reset the intro for testing purposes - remove localStorage item
  const resetIntro = () => {
    console.log('Resetting intro');
    localStorage.removeItem('hasSeenIntro');
    localStorage.setItem('hasSeenIntro', 'false');
    window.location.reload();
  };
  
  // Wait until the component is initialized before rendering anything
  if (!isInitialized) {
    return null;
  }
  
  return (
    <div className="relative h-full w-full">
      {showIntro ? (
        <LoadingPage onComplete={handleStart} />
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
            <button 
              onClick={resetIntro}
              className="fixed bottom-2 right-2 bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-50 hover:opacity-100 z-50"
            >
              Reset Intro
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AppEntrance;
