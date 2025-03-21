
import React, { useRef, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles } from 'lucide-react';

export default function FloatingElements({ height = 200 }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const splineRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  function onSplineLoad(spline) {
    setLoaded(true);
    splineRef.current = spline;
    
    // Set up animations for floating elements
    return animateFloatingElements(spline);
  }
  
  function animateFloatingElements(spline) {
    if (!spline) return;
    
    try {
      // Find the objects to animate
      const floatingObjects = [
        spline.findObjectByName('FloatingShape1'),
        spline.findObjectByName('FloatingShape2'),
        spline.findObjectByName('FloatingShape3'),
        spline.findObjectByName('FloatingShape4')
      ].filter(Boolean);
      
      if (floatingObjects.length === 0) {
        console.warn('No floating objects found in Spline scene');
        return;
      }
      
      // Set up animation loop
      const animate = (time) => {
        floatingObjects.forEach((obj, index) => {
          if (obj) {
            // Create bobbing motion with different phases
            obj.position.y = Math.sin(time * 0.001 + index * 0.7) * 0.5 + obj.position.y;
            
            // Gentle rotation
            obj.rotation.x += 0.001 * (index % 2 ? 1 : -1);
            obj.rotation.y += 0.001 * (index % 3 ? 1 : -1);
          }
        });
        
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);
    } catch (err) {
      console.error('Error animating floating elements:', err);
    }
  }
  
  const handleError = () => {
    console.error("Failed to load floating elements");
    setHasError(true);
  };
  
  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <div style={{ 
      width: '100%', 
      height: `${height}px`, 
      position: 'absolute', 
      inset: 0, 
      zIndex: 0, 
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center opacity-30">
          <Sparkles size={height / 4} className="text-brand-500" />
        </div>
      ) : (
        <Spline
          scene="https://prod.spline.design/OI8gHC6ycEWjC5Nh/scene.splinecode"
          onLoad={onSplineLoad}
          onError={handleError}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}
