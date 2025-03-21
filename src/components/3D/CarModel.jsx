
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from "@react-three/drei";

function Car(props) {
  const group = useRef();
  
  // Simple animation for the car
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Fallback to a simple mesh if no model is loaded
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshStandardMaterial color="#0EA5E9" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.45, -1.2]}>
        <boxGeometry args={[1.8, 0.8, 1.3]} />
        <meshStandardMaterial color="#0EA5E9" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.25, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.25, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Wheels */}
      <mesh castShadow receiveShadow position={[0.9, -0.25, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, -0.25, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.9, -0.25, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.9, -0.25, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

export default function CarModel({ className }) {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={["transparent"]} />
        <fog attach="fog" args={["#f0f0f0", 10, 50]} />
        <PerspectiveCamera makeDefault position={[6, 3, 9]} fov={42} />
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[10, 10, 10]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Car position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.5} 
          autoRotate
          autoRotateSpeed={1}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
