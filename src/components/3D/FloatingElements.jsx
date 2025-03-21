
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

function FloatingSphere({ position, size, color, speed = 1, rotationFactor = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const t = state.clock.getElapsedTime() * speed;
    
    // Update position and rotation only if the ref exists
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.rotation.x = Math.sin(t / 4) * rotationFactor;
    ref.current.rotation.z = Math.sin(t / 4) * rotationFactor;
  });

  return (
    <Sphere ref={ref} args={[size, 16, 16]} position={position}>
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
    </Sphere>
  );
}

// Fallback component that renders when there's an error with Three.js
function FallbackContent() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-blue-500 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
    </div>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingSphere position={[-3, 2, -5]} size={1.2} color="#0EA5E9" speed={0.3} />
      <FloatingSphere position={[4, -2, -2]} size={0.8} color="#66CCFF" speed={0.5} />
      <FloatingSphere position={[0, 3, -3]} size={0.6} color="#0583BB" speed={0.7} />
      <FloatingSphere position={[5, 1, -5]} size={1} color="#33BBFF" speed={0.4} />
      <FloatingSphere position={[-5, -1, -2]} size={0.7} color="#9FDDFF" speed={0.6} />
    </>
  );
}

export default function FloatingElements({ className }) {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Safely mount component after initial render
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) {
    return <FallbackContent />;
  }
  
  // If there was an error in the 3D rendering, show the fallback
  if (hasError) {
    return <FallbackContent />;
  }
  
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <ErrorBoundary onError={() => setHasError(true)}>
        <Canvas
          gl={{ antialias: false, powerPreference: 'default' }}
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]} // Lower DPR for better performance
        >
          <Scene />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

// Simple error boundary component for catching Three.js errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Three.js rendering error:", error);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <FallbackContent />;
    }
    return this.props.children;
  }
}

// Missing React import
import React from 'react';
