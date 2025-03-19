
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

function FloatingSphere({ position, size, color, speed = 1, rotationFactor = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    
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

export default function FloatingElements({ className }) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingSphere position={[-3, 2, -5]} size={1.2} color="#0EA5E9" speed={0.3} />
        <FloatingSphere position={[4, -2, -2]} size={0.8} color="#66CCFF" speed={0.5} />
        <FloatingSphere position={[0, 3, -3]} size={0.6} color="#0583BB" speed={0.7} />
        <FloatingSphere position={[5, 1, -5]} size={1} color="#33BBFF" speed={0.4} />
        <FloatingSphere position={[-5, -1, -2]} size={0.7} color="#9FDDFF" speed={0.6} />
      </Canvas>
    </div>
  );
}
