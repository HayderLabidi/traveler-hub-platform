import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const LoadingPage = () => {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShow(false);
        // Restore scrolling after loading
        document.body.style.overflow = 'auto';
      }, 500); // Wait for fade out animation to complete
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Restore scrolling if component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-[9999] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: 'auto' }}
    >
      <div 
        className="text-center space-y-6"
        style={{ pointerEvents: 'none' }}
      >
        <div className="relative">
          <LoadingSpinner size="lg" />
          <div className="absolute inset-0 animate-ping rounded-full bg-brand-500/20"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-brand-500 animate-pulse">
            Welcome to RideShare
          </h1>
          <p className="text-muted-foreground">
            Your journey begins here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 