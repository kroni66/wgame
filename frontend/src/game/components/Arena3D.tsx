import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const BasicArena = () => {
  const wallHeight = 3;
  const wallThickness = 0.5;
  
  const positions = [
    [-8, 0, -8],
    [8, 0, -8],
    [-8, 0, 8],
    [8, 0, 8]
  ];
  
  return (
    <>
      {/* Floor */}
      <mesh 
        position={[0, -0.25, 0]} 
        receiveShadow
      >
        <boxGeometry args={[20, 0.5, 20]} />
        <meshStandardMaterial color="#8a6d3b" />
      </mesh>
      
      {/* North Wall */}
      <mesh 
        position={[0, wallHeight / 2, -10]} 
        castShadow
      >
        <boxGeometry args={[20, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* South Wall */}
      <mesh 
        position={[0, wallHeight / 2, 10]} 
        castShadow
      >
        <boxGeometry args={[20, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* East Wall */}
      <mesh 
        position={[10, wallHeight / 2, 0]} 
        castShadow
      >
        <boxGeometry args={[wallThickness, wallHeight, 20]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* West Wall */}
      <mesh 
        position={[-10, wallHeight / 2, 0]} 
        castShadow
      >
        <boxGeometry args={[wallThickness, wallHeight, 20]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* Pillars */}
      {positions.map((pos, index) => (
        <mesh 
          key={index} 
          position={[pos[0], wallHeight * 0.75, pos[2]]} 
          castShadow
        >
          <cylinderGeometry args={[0.5, 0.5, wallHeight * 1.5, 8]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
      ))}
      
      {/* Center Platform */}
      <mesh 
        position={[0, 0.1, 0]} 
        receiveShadow
      >
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <meshStandardMaterial color="#a1887f" />
      </mesh>
      
      {/* Torches */}
      {positions.map((pos, index) => (
        <group key={`torch-${index}`} position={[pos[0], wallHeight * 1.5, pos[2]]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          <pointLight 
            position={[0, 0.5, 0]} 
            color="#ff7700" 
            intensity={1} 
            distance={5}
            castShadow
          />
        </group>
      ))}
      
      {/* Additional decorative elements */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <torusGeometry args={[1, 0.2, 16, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Banners */}
      {[
        [9, wallHeight, 0],
        [-9, wallHeight, 0],
        [0, wallHeight, 9],
        [0, wallHeight, -9]
      ].map((pos, index) => (
        <mesh 
          key={`banner-${index}`} 
          position={[pos[0], pos[1], pos[2]]} 
          rotation={[0, Math.PI * 0.5 * index, 0]}
          castShadow
        >
          <planeGeometry args={[2, 3]} />
          <meshStandardMaterial 
            color={index % 2 === 0 ? "#7b1fa2" : "#1565c0"} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
};

const LoadingSpinner = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusGeometry args={[2, 0.5, 16, 32]} />
      <meshStandardMaterial color="#f6ad55" wireframe />
    </mesh>
  );
};

const SceneSetup = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    scene.background = new THREE.Color('#111827');
    scene.fog = new THREE.Fog('#111827', 15, 50);
    
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene]);
  
  return null;
};

const TorchFlame = ({ position }: { position: [number, number, number] }) => {
  const light = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (light.current) {
      light.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 10) * 0.5;
    }
  });
  
  return (
    <group position={position}>
      <pointLight 
        ref={light}
        color="#ff7700" 
        intensity={1.5} 
        distance={5}
        castShadow
      />
      <mesh>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#ff7700" />
      </mesh>
    </group>
  );
};

const EnhancedArena = () => {
  return (
    <>
      <BasicArena />
      
      {/* Add animated torch flames */}
      <TorchFlame position={[-8, 4.5, -8]} />
      <TorchFlame position={[8, 4.5, -8]} />
      <TorchFlame position={[-8, 4.5, 8]} />
      <TorchFlame position={[8, 4.5, 8]} />
      
      {/* Add central light beam */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Add fog effect */}
      <fog attach="fog" args={['#111827', 10, 50]} />
    </>
  );
};

export const Arena3D: React.FC = () => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-gray-300 relative">
      <Canvas shadows>
        <SceneSetup />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
        
        {/* Ambient light */}
        <ambientLight intensity={0.2} />
        
        {/* Directional light with shadow */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        
        {/* Use Suspense for async loading */}
        <Suspense fallback={<LoadingSpinner />}>
          <EnhancedArena />
        </Suspense>
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <h2 className="text-xl font-bold text-white bg-gray-800 bg-opacity-50 rounded-md mx-auto w-fit px-2">3D Arena View</h2>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-white bg-gray-800 bg-opacity-50 rounded-md mx-auto w-fit px-2">
          Use mouse to rotate, zoom, and pan the arena
        </p>
      </div>
    </div>
  );
};
