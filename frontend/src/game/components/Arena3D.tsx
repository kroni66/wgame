import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

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
    </>
  );
};


export const Arena3D = () => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-gray-300 relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        
        {/* Ambient light */}
        <ambientLight intensity={0.5} />
        
        {/* Directional light with shadow */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        
        {/* Use BasicArena directly instead of trying to load the model */}
        <BasicArena />
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <h2 className="text-xl font-bold text-white bg-gray-800 bg-opacity-50 rounded-md mx-auto w-fit px-2">3D Arena View</h2>
      </div>
    </div>
  );
};
