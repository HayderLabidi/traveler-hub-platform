
import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function FloatingElements({ height = 200 }) {
  const [loaded, setLoaded] = useState(false);
  const splineRef = useRef(null);
  
  function onSplineLoad(spline) {
    setLoaded(true);
    splineRef.current = spline;
    
    // Set up animations for floating elements
    animateFloatingElements(spline);
  }
  
  function animateFloatingElements(spline) {
    if (!spline) return;
    
    // Find the objects to animate
    const floatingObjects = [
      spline.findObjectByName('FloatingShape1'),
      spline.findObjectByName('FloatingShape2'),
      spline.findObjectByName('FloatingShape3'),
      spline.findObjectByName('FloatingShape4')
    ];
    
    // Set up animation loop
    let frame;
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
      
      frame = requestAnimationFrame(animate);
    };
    
    // Start animation
    frame = requestAnimationFrame(animate);
    
    // Clean up function
    return () => {
      cancelAnimationFrame(frame);
    };
  }
  
  return (
    <div style={{ width: '100%', height: `${height}px`, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Spline
        scene="https://prod.spline.design/OI8gHC6ycEWjC5Nh/scene.splinecode"
        onLoad={onSplineLoad}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
