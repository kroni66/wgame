import React, { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export const BasicArena = () => {
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
    </>
  );
};

export const LoadingSpinner = () => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <mesh position={[0, 0, 0]} rotation={[0, rotation, 0]}>
      <torusGeometry args={[2, 0.5, 16, 32]} />
      <meshStandardMaterial color="#f6ad55" wireframe />
    </mesh>
  );
};

export const Model = () => {
  const [error, setError] = useState(false);
  
  try {
    const gltf = useLoader(GLTFLoader, '/models/arena.gltf');
    
    useEffect(() => {
      if (gltf) {
        gltf.scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
      }
    }, [gltf]);
    
    return (
      <primitive 
        object={gltf.scene} 
        scale={[5, 5, 5]} 
        position={[0, -1, 0]} 
        rotation={[0, Math.PI / 4, 0]} 
      />
    );
  } catch (err) {
    console.error("Error loading model:", err);
    setError(true);
    return <BasicArena />;
  }
};
