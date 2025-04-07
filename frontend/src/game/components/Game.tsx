import React, { useEffect } from 'react';
import { GameMap } from './GameMap';
import { Inventory } from './Inventory';
import { Quests } from './Quests';
import { Combat } from './Combat';
import { useGameStore } from '../store';

export const Game: React.FC = () => {
  const { combat, movePlayer } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          movePlayer('up');
          break;
        case 'ArrowDown':
          movePlayer('down');
          break;
        case 'ArrowLeft':
          movePlayer('left');
          break;
        case 'ArrowRight':
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer]);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Isometric RPG Game</h1>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Use arrow keys to move your character. Interact with NPCs by clicking on them.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1">
          <GameMap />
        </div>
        
        <div className="w-full md:w-80 space-y-4">
          {combat.active ? (
            <Combat />
          ) : (
            <>
              <Inventory />
              <Quests />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
