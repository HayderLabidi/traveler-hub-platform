
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function FloatingShapes() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref1.current) {
      ref1.current.position.y = Math.sin(t * 0.5) * 0.5 + 0.5;
      ref1.current.rotation.y += 0.01;
    }
    if (ref2.current) {
      ref2.current.position.y = Math.sin(t * 0.7 + 1) * 0.5 + 0.5;
      ref2.current.rotation.z += 0.01;
    }
    if (ref3.current) {
      ref3.current.position.y = Math.sin(t * 0.3 + 2) * 0.5 + 0.5;
      ref3.current.rotation.x += 0.01;
    }
    if (ref4.current) {
      ref4.current.position.y = Math.sin(t * 0.6 + 3) * 0.5 + 0.5;
      ref4.current.rotation.z += 0.01;
    }
  });

  return (
    <>
      <mesh ref={ref1} position={[-2, 0.5, -1]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
      <mesh ref={ref2} position={[2, 0.5, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0583BB" />
      </mesh>
      <mesh ref={ref3} position={[-1.5, 0.5, 1]}>
        <tetrahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#66CCFF" />
      </mesh>
      <mesh ref={ref4} position={[1.5, 0.5, 1]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#33BBFF" />
      </mesh>
    </>
  );
}

export default function FloatingElements({ height = 200 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: `${height}px`, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingShapes />
    </Canvas>
  );
}
