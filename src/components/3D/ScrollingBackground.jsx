
import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

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
  const splineRef = useRef(null);
  
  // Handle Spline load event
  function onSplineLoad(spline) {
    setLoaded(true);
    splineRef.current = spline;
    
    // You can access objects in the scene like this
    // const wireframeSphere = spline.findObjectByName('wireframeSphere');
  }
  
  // Update Spline scene based on scroll position
  useEffect(() => {
    if (splineRef.current && loaded) {
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
        ];
        
        shapes.forEach((shape, i) => {
          if (shape) {
            shape.rotation.x = scrollY * 0.0005 * (i % 2 ? 1 : -1);
            shape.rotation.y = scrollY * 0.0005 * (i % 3 ? 1 : -1);
          }
        });
      }
    }
  }, [scrollY, loaded]);
  
  return (
    <div className="canvas-wrapper">
      <ScrollTracker onScroll={setScrollY} />
      <Spline
        scene="https://prod.spline.design/6oYrcjTCE1Y9BJlQ/scene.splinecode"
        onLoad={onSplineLoad}
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
    </div>
  );
}
