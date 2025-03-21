
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls } from '@react-three/drei';

// Simple Car model component
function Car(props) {
  const meshRef = useRef();
  
  // Simple animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group {...props}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 0.8, 4]} />
        <meshStandardMaterial color="#0EA5E9" />
        {/* Car body */}
        <mesh position={[0, 0.65, -0.2]} castShadow>
          <boxGeometry args={[1.7, 0.6, 2]} />
          <meshStandardMaterial color="#0EA5E9" />
        </mesh>
        {/* Wheels */}
        <mesh position={[1, -0.4, 1]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[-1, -0.4, 1]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[1, -0.4, -1]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[-1, -0.4, -1]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Windows */}
        <mesh position={[0, 0.9, -0.2]} castShadow>
          <boxGeometry args={[1.65, 0.5, 1.9]} />
          <meshStandardMaterial color="#A5D8FF" opacity={0.7} transparent />
        </mesh>
      </mesh>
    </group>
  );
}

// Floating objects component
function FloatingObjects() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref1.current) ref1.current.position.y = Math.sin(t * 0.5) * 0.5 + 2;
    if (ref2.current) ref2.current.position.y = Math.sin(t * 0.7 + 1) * 0.5 + 2;
    if (ref3.current) ref3.current.position.y = Math.sin(t * 0.3 + 2) * 0.5 + 2;
  });

  return (
    <>
      <mesh ref={ref1} position={[-3, 2, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#66CCFF" />
      </mesh>
      <mesh ref={ref2} position={[3, 2, -2]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color="#9FDDFF" />
      </mesh>
      <mesh ref={ref3} position={[0, 2, 3]}>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#33BBFF" />
      </mesh>
    </>
  );
}

export default function Car3DModel() {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 3, 5], fov: 50 }}
      style={{ width: '100%', height: '400px', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'transparent' }}
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <PresentationControls
        global
        snap
        rotation={[0, -Math.PI / 4, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Car position={[0, -1, 0]} />
        <FloatingObjects />
      </PresentationControls>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
