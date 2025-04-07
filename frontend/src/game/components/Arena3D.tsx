import React from 'react';

export const Arena3D: React.FC = () => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-gray-300 bg-blue-100 relative">
      {/* Fallback 3D Arena Representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 h-4/5 bg-amber-800 rounded-lg shadow-lg relative">
          {/* Arena Floor */}
          <div className="absolute inset-0 bg-amber-700 rounded-lg"></div>
          
          {/* Arena Walls */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-amber-900 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-amber-900 rounded-b-lg"></div>
          <div className="absolute top-8 left-0 bottom-8 w-8 bg-amber-900"></div>
          <div className="absolute top-8 right-0 bottom-8 w-8 bg-amber-900"></div>
          
          {/* Arena Pillars */}
          <div className="absolute top-20 left-20 w-12 h-12 bg-amber-950 rounded-full"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-amber-950 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-amber-950 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-amber-950 rounded-full"></div>
          
          {/* Center Platform */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-600 rounded-full shadow-inner"></div>
        </div>
      </div>
      
      {/* Overlay Text */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <h2 className="text-xl font-bold text-gray-800">3D Arena View</h2>
        <p className="text-sm text-gray-600">
          (Using CSS fallback due to Three.js loading issues)
        </p>
      </div>
    </div>
  );
};
