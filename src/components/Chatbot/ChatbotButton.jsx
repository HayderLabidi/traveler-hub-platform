
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotDialog from "./ChatbotDialog";
import { motion, AnimatePresence } from "framer-motion";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Show pulse animation after 3 seconds
    const timer = setTimeout(() => {
      setShowPulse(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPulse(false); // Hide pulse when clicked
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <ChatbotDialog onClose={() => setIsOpen(false)} />
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative"
          >
            <Button
              onClick={toggleChat}
              className="h-14 w-14 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 p-0 flex items-center justify-center transition-all duration-300 hover:shadow-xl"
              aria-label="Open chat"
            >
              <MessageCircle size={24} className="text-white" />
            </Button>
            
            {showPulse && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.2, 0.5, 0.2], 
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
                className="absolute inset-0 rounded-full bg-brand-400/30"
              />
            )}
            
            {showPulse && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 right-0 bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 text-xs whitespace-nowrap"
              >
                Need help? Chat with us!
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotButton;
