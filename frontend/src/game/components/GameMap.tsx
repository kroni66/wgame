import React from 'react';
import { Tile } from './Tile';
import { Character } from './Character';
import { useGameStore } from '../store';
import { NPC } from '../types';

export const GameMap: React.FC = () => {
  const { map, player, npcs, interactWithNPC, combat } = useGameStore();

  const handleNPCClick = (npc: NPC) => {
    const dialog = interactWithNPC(npc.id);
    console.log(dialog);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden" 
      style={{ 
        width: '800px', 
        height: '600px',
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <div className="absolute" style={{ top: '300px', left: '400px' }}>
        {/* Render tiles */}
        {Array.from({ length: map.width }).map((_, x) =>
          Array.from({ length: map.height }).map((_, y) => (
            <Tile key={`${x}-${y}`} position={{ x, y }} type={0} />
          ))
        )}

        {/* Render NPCs */}
        {npcs.map((npc) => (
          <Character
            key={npc.id}
            character={{
              ...npc,
              health: 100,
              maxHealth: 100,
              attack: 0,
              defense: 0,
              inventory: [],
              quests: [],
              animations: {
                idle: '/src/game/assets/sprites/character.svg',
                walk: '/src/game/assets/sprites/character.svg',
                attack: '/src/game/assets/sprites/character.svg',
              },
            }}
            onClick={() => handleNPCClick(npc)}
          />
        ))}

        {/* Render player */}
        <Character character={player} isPlayer={true} />

        {/* Render enemy in combat */}
        {combat.active && (
          <Character character={combat.player2} />
        )}
      </div>
    </div>
  );
};
