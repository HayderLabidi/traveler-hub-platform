import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text3D, Float, Center } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/store/actions/ui';
import { Car, Rocket } from 'lucide-react';

function CarModel({ rotation }) {
  const carRef = useRef();
  
  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={carRef} position={[0, -0.5, 0]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.7, 4]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1.8, 0.6, 2]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[-1, 0, 1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[1, 0, 1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[-1, 0, -1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[1, 0, -1.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.7} />
      </mesh>
      
      <mesh position={[0.7, 0.5, 1.9]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#f3f4f6" emissive="#f3f4f6" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-0.7, 0.5, 1.9]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#f3f4f6" emissive="#f3f4f6" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function RoadSection() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#374151" />
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.5, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </mesh>
  );
}

function FloatingText() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center position={[0, 2, 0]}>
        <Text3D
          font="/fonts/inter_bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
        >
          RideShare
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </Float>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-24 h-24">
        <Car className="absolute inset-0 w-full h-full text-primary animate-pulse" />
      </div>
      <p className="mt-4 text-xl font-semibold animate-pulse">Loading Experience...</p>
    </div>
  );
}

const Scene = React.memo(({ onStart }) => {
  return (
    <div className="h-screen w-full">
      <Canvas shadows className="h-full w-full">
        <color attach="background" args={['#111']} />
        <fog attach="fog" args={['#111', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        
        <Suspense fallback={null}>
          <CarModel rotation={Math.PI / 4} />
          <RoadSection />
          <FloatingText />
        </Suspense>
      </Canvas>
      
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          size="lg" 
          onClick={onStart}
          className="px-8 py-6 text-xl font-semibold tracking-wide shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group"
        >
          Start Journey
          <Rocket className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
        </Button>
      </motion.div>
    </div>
  );
});

const OpeningScene = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setTheme('dark'));
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background w-full h-screen"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Scene onStart={onStart} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningScene;
