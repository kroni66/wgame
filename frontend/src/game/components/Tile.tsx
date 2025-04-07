import React from 'react';
import { Position } from '../types';
import { gridToIso, calculateZIndex } from '../utils/isometric';

interface TileProps {
  position: Position;
  type: number;
}

const getTileImage = (type: number) => {
  switch (type) {
    case 0:
    default:
      return '/src/game/assets/tiles/grass.svg';
  }
};

export const Tile: React.FC<TileProps> = ({ position, type }) => {
  const isoPosition = gridToIso(position);
  const zIndex = calculateZIndex(position);

  return (
    <div
      className="absolute"
      style={{
        left: `${isoPosition.x}px`,
        top: `${isoPosition.y}px`,
        width: '64px',
        height: '32px',
        zIndex,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img src={getTileImage(type)} alt="Tile" width={64} height={32} />
    </div>
  );
};
