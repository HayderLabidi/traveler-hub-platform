import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingPageProps {
  duration?: number;
  messages?: string[];
  title?: string;
  showProgress?: boolean;
}

const LoadingPage = ({
  duration = 2000,
  messages = [
    "Preparing your experience...",
    "Loading amazing destinations...",
    "Getting things ready...",
    "Almost there...",
  ],
  title = "Welcome to RideShare",
  showProgress = true,
}: LoadingPageProps) => {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, duration / messages.length);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShow(false);
        document.body.style.overflow = 'auto';
      }, 500);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      document.body.style.overflow = 'auto';
    };
  }, [duration, messages.length]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-[9999] transition-opacity duration-500 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center space-y-8 max-w-md px-4">
          <motion.div 
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <LoadingSpinner size="lg" />
            <div className="absolute inset-0 animate-ping rounded-full bg-brand-500/20" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-brand-500 animate-pulse">
              {title}
            </h1>
            
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-muted-foreground text-lg"
            >
              {messages[currentMessageIndex]}
            </motion.p>

            {showProgress && (
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-brand-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage;