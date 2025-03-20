
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

function ScrollingShapes({ scrollY }) {
  const group = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (group.current) {
      // Move entire group based on scroll position
      group.current.position.y = -scrollY * 0.3;
    }
    
    if (ref1.current) {
      ref1.current.rotation.x = t * 0.1;
      ref1.current.rotation.y = t * 0.15;
    }
    if (ref2.current) {
      ref2.current.rotation.y = t * 0.17;
      ref2.current.rotation.z = t * 0.1;
    }
    if (ref3.current) {
      ref3.current.rotation.z = t * 0.1;
      ref3.current.rotation.x = t * 0.13;
    }
    if (ref4.current) {
      ref4.current.rotation.y = -t * 0.12;
      ref4.current.rotation.z = -t * 0.15;
    }
    if (ref5.current) {
      ref5.current.rotation.x = -t * 0.11;
      ref5.current.rotation.y = t * 0.14;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={ref1} position={[-5, 5, -10]}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#0EA5E9" wireframe opacity={0.1} transparent />
      </mesh>
      <mesh ref={ref2} position={[5, -2, -8]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#0583BB" wireframe opacity={0.1} transparent />
      </mesh>
      <mesh ref={ref3} position={[-6, -6, -6]}>
        <octahedronGeometry args={[1.0]} />
        <meshStandardMaterial color="#66CCFF" wireframe opacity={0.1} transparent />
      </mesh>
      <mesh ref={ref4} position={[6, 8, -9]}>
        <tetrahedronGeometry args={[1.3]} />
        <meshStandardMaterial color="#33BBFF" wireframe opacity={0.1} transparent />
      </mesh>
      <mesh ref={ref5} position={[0, 0, -7]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#0EA5E9" wireframe opacity={0.1} transparent />
      </mesh>
    </group>
  );
}

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
  const [mounted, setMounted] = useState(false);
  
  // Only mount the Canvas after component is fully mounted
  useEffect(() => {
    setMounted(true);
    
    // Cleanup function to help prevent memory leaks
    return () => {
      setMounted(false);
    };
  }, []);
  
  if (!mounted) return null;
  
  return (
    <>
      <ScrollTracker onScroll={setScrollY} />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          zIndex: -1 
        }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
        performance={{ min: 0.1 }} // Lower performance for better FPS
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <ScrollingShapes scrollY={scrollY} />
      </Canvas>
    </>
  );
}
