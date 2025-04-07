import { Position } from '../types';

export function gridToIso(position: Position): Position {
  return {
    x: (position.x - position.y) * 32,
    y: (position.x + position.y) * 16,
  };
}

export function isoToGrid(position: Position): Position {
  const x = (position.x / 32 + position.y / 16) / 2;
  const y = (position.y / 16 - position.x / 32) / 2;
  return { x: Math.round(x), y: Math.round(y) };
}

export function isValidPosition(position: Position, mapWidth: number, mapHeight: number): boolean {
  return position.x >= 0 && position.x < mapWidth && position.y >= 0 && position.y < mapHeight;
}

export function calculateZIndex(position: Position): number {
  return position.x + position.y;
}
