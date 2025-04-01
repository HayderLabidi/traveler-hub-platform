
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Car, MapPin, CreditCard, Shield, Sparkles } from "lucide-react";
import { useDarkMode } from "@/providers/DarkModeProvider";

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
}) => {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCompleted(true);
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

  const loadingSteps = [
    { icon: Car, text: "Locating rides", complete: progress > 25 },
    { icon: MapPin, text: "Finding best routes", complete: progress > 50 },
    { icon: CreditCard, text: "Preparing payments", complete: progress > 75 },
    { icon: Shield, text: "Securing your journey", complete: progress > 95 },
  ];

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 ${isDarkMode ? 'bg-background/95 backdrop-blur-sm' : 'bg-gradient-to-br from-brand-50/95 via-background/95 to-brand-100/95 backdrop-blur-sm'} flex items-center justify-center z-[9999] transition-opacity duration-500 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center space-y-8 max-w-md px-4">
          {!completed ? (
            <motion.div 
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <LoadingSpinner size="lg" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-brand-500/20" 
                initial={{ scale: 0.8, opacity: 0.2 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center justify-center"
            >
              <CheckCircle size={50} className="text-green-500" />
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <motion.div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-bold text-brand-500">
                {title}
              </h1>
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.5
                }}
              >
                <Sparkles size={24} className="text-yellow-500" />
              </motion.div>
            </motion.div>
            
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
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-400 to-brand-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {loadingSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.2 }
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent transition-all duration-300"
                  style={{
                    background: step.complete ? (isDarkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)') : 'transparent',
                    borderColor: step.complete ? (isDarkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)') : 'transparent'
                  }}
                >
                  <div className={`p-2 rounded-full ${step.complete 
                    ? 'text-green-500 bg-green-100 dark:bg-green-900/30' 
                    : 'text-gray-400 bg-gray-100 dark:bg-gray-800'}`}>
                    <step.icon size={16} />
                  </div>
                  <span className={`text-sm ${step.complete ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.text}
                  </span>
                  {step.complete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 200 }}
                    >
                      <CheckCircle size={12} className="text-green-500 ml-auto" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage;
