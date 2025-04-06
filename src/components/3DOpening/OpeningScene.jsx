import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

// Simplified CarModel for testing
function CarModel() {
  const carRef = useRef();

  return (
    <mesh ref={carRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

// Simplified Scene component
const OpeningScene = ({ onStart }) => {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <CarModel />
          <OrbitControls />
        </Suspense>
      </Canvas>
      
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button 
          onClick={onStart}
          className="px-8 py-4 bg-primary text-white rounded-lg"
        >
          Enter App
        </Button>
      </motion.div>
    </div>
  );
};

export default OpeningScene;


