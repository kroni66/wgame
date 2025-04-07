import React from 'react';
import { Character as CharacterType } from '../types';
import { gridToIso, calculateZIndex } from '../utils/isometric';

interface CharacterProps {
  character: CharacterType;
  isPlayer?: boolean;
  onClick?: () => void;
}

export const Character: React.FC<CharacterProps> = ({ character, isPlayer = false, onClick }) => {
  const isoPosition = gridToIso(character.position);
  const zIndex = calculateZIndex(character.position) + 1; // Characters above tiles

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ${isPlayer ? 'border-2 border-blue-500 rounded-full' : ''}`}
      style={{
        left: `${isoPosition.x}px`,
        top: `${isoPosition.y - 32}px`, // Offset to place character on tile
        width: '64px',
        height: '64px',
        zIndex,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      <img 
        src={character.animations.idle} 
        alt={character.name} 
        width={64} 
        height={64} 
      />
      <div className="absolute -bottom-5 left-0 right-0 text-center text-xs font-bold text-white bg-gray-800 rounded-md px-1">
        {character.name}
      </div>
    </div>
  );
};
