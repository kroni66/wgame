import React, { Suspense, useState } from 'react';
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

const LoadingSpinner = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <torusGeometry args={[2, 0.5, 16, 32]} />
      <meshStandardMaterial color="#f6ad55" wireframe />
    </mesh>
  );
};

interface ErrorBoundaryProps {
  onError: () => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error in 3D model:", error, errorInfo);
    this.props.onError();
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <BasicArena />;
    }

    return this.props.children;
  }
}

export const Arena3D: React.FC = () => {
  const [modelFailed, setModelFailed] = useState(false);

  const handleError = () => {
    console.error("Failed to load 3D model, using fallback");
    setModelFailed(true);
  };

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
        
        {/* Use Suspense for async loading of the model */}
        <Suspense fallback={<LoadingSpinner />}>
          {modelFailed ? (
            <BasicArena />
          ) : (
            <ErrorBoundary onError={handleError}>
              <BasicArena />
            </ErrorBoundary>
          )}
        </Suspense>
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <h2 className="text-xl font-bold text-white bg-gray-800 bg-opacity-50 rounded-md mx-auto w-fit px-2">3D Arena View</h2>
      </div>
    </div>
  );
};
