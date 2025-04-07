import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ARENA_MODEL_URL = '/src/game/assets/models/arena.glb';

useGLTF.preload(ARENA_MODEL_URL);

function ArenaModel() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  
  const { scene } = useGLTF(ARENA_MODEL_URL);
  
  useEffect(() => {
    if (scene) {
      setModelLoaded(true);
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
    }
  });

  if (!modelLoaded) {
    return null;
  }

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={[0.5, 0.5, 0.5]} 
        position={[0, -1, 0]} 
      />
    </group>
  );
}

function FallbackArena() {
  const floorRef = useRef<THREE.Mesh>(null);
  const wallsRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    console.log("Using fallback arena model");
  }, []);
  
  return (
    <group>
      {/* Arena floor */}
      <mesh 
        ref={floorRef} 
        position={[0, -0.25, 0]} 
        receiveShadow
      >
        <boxGeometry args={[20, 0.5, 20]} />
        <meshStandardMaterial color="#8a6d3b" roughness={0.8} />
      </mesh>
      
      {/* Arena walls */}
      <group ref={wallsRef}>
        {/* North wall */}
        <mesh position={[0, 1.5, -10]} castShadow receiveShadow>
          <boxGeometry args={[20, 3, 0.5]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        
        {/* South wall */}
        <mesh position={[0, 1.5, 10]} castShadow receiveShadow>
          <boxGeometry args={[20, 3, 0.5]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        
        {/* East wall */}
        <mesh position={[10, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 3, 20]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
        
        {/* West wall */}
        <mesh position={[-10, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 3, 20]} />
          <meshStandardMaterial color="#5d4037" roughness={0.7} />
        </mesh>
      </group>
      
      {/* Pillars */}
      {[[-8, -8], [8, -8], [-8, 8], [8, 8]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 2.25, pos[1]]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 4.5, 8]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.5} />
        </mesh>
      ))}
      
      {/* Center platform */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3, 0.3, 16]} />
        <meshStandardMaterial color="#a1887f" roughness={0.6} />
      </mesh>
    </group>
  );
}

export const Arena3D: React.FC = () => {
  const [modelError, setModelError] = useState(false);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-gray-300">
      <Canvas shadows>
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 30, 100]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
        
        {/* Render either the arena model or fallback */}
        <React.Suspense fallback={null}>
          {modelError ? (
            <FallbackArena />
          ) : (
            <ErrorBoundary onError={() => setModelError(true)}>
              <ArenaModel />
            </ErrorBoundary>
          )}
        </React.Suspense>
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#4CAF50" roughness={1} />
        </mesh>
        
        {/* Environment lighting */}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  onError: () => void;
}> {
  componentDidCatch(error: any) {
    console.error("Failed to load 3D model:", error);
    this.props.onError();
  }

  render() {
    return this.props.children;
  }
}
