
import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { CircleDashed } from 'lucide-react';

function ScrollTracker({ onScroll }) {
  const scrolling = useRef(false);
  const frame = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!scrolling.current) {
        scrolling.current = true;
        
        // Use requestAnimationFrame to limit scroll event processing
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          onScroll(window.scrollY);
          scrolling.current = false;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScroll]);
  
  return null;
}

export default function ScrollingBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const splineRef = useRef(null);
  const mounted = useRef(false);
  
  // Set mounted ref on component mount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  
  // Handle Spline load event
  function onSplineLoad(spline) {
    if (!mounted.current) return;
    
    setLoaded(true);
    splineRef.current = spline;
    
    try {
      // Initial check if objects exist
      const wireframeGroup = spline.findObjectByName('WireframeGroup');
      if (!wireframeGroup) {
        console.warn('WireframeGroup not found in Spline scene');
      }
    } catch (err) {
      console.error('Error during Spline load:', err);
    }
  }
  
  const handleError = () => {
    console.error("Failed to load scrolling background");
    if (mounted.current) {
      setHasError(true);
    }
  };
  
  // Update Spline scene based on scroll position
  useEffect(() => {
    if (splineRef.current && loaded && !hasError) {
      try {
        // Move the entire scene based on scroll
        const obj = splineRef.current.findObjectByName('WireframeGroup');
        if (obj) {
          obj.position.y = -scrollY * 0.002;
          
          // You can add more dynamic effects here
          // For example, rotate objects based on scroll
          const shapes = [
            splineRef.current.findObjectByName('Wireframe1'),
            splineRef.current.findObjectByName('Wireframe2'),
            splineRef.current.findObjectByName('Wireframe3'),
            splineRef.current.findObjectByName('Wireframe4'),
            splineRef.current.findObjectByName('Wireframe5'),
          ].filter(Boolean);
          
          shapes.forEach((shape, i) => {
            if (shape) {
              shape.rotation.x = scrollY * 0.0005 * (i % 2 ? 1 : -1);
              shape.rotation.y = scrollY * 0.0005 * (i % 3 ? 1 : -1);
            }
          });
        }
      } catch (err) {
        console.error('Error updating scene on scroll:', err);
      }
    }
  }, [scrollY, loaded, hasError]);
  
  // Fallback elements
  const staticBackground = () => {
    const circles = [];
    for (let i = 0; i < 10; i++) {
      circles.push(
        <div 
          key={i}
          className={`absolute rounded-full bg-gradient-to-r from-brand-300/10 to-brand-500/20 animate-pulse`}
          style={{
            width: `${30 + Math.random() * 100}px`,
            height: `${30 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${3 + Math.random() * 5}s`
          }}
        />
      );
    }
    return circles;
  };
  
  return (
    <div className="canvas-wrapper">
      <ScrollTracker onScroll={setScrollY} />
      
      {hasError ? (
        <div className="fixed inset-0 z-[-1] overflow-hidden">
          {staticBackground()}
          <div className="fixed inset-0 z-[-1] opacity-30 flex items-center justify-center">
            <CircleDashed size={150} className="text-brand-500/20" />
          </div>
        </div>
      ) : (
        <Spline
          scene="https://prod.spline.design/6oYrcjTCE1Y9BJlQ/scene.splinecode"
          onLoad={onSplineLoad}
          onError={handleError}
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            pointerEvents: 'none',
            zIndex: -1,
            opacity: 0.7
          }}
        />
      )}
    </div>
  );
}
