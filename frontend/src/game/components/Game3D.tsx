import React, { useState } from 'react';
import { Arena3D } from './Arena3D';
import { Inventory } from './Inventory';
import { Quests } from './Quests';
import { Combat } from './Combat';
import { useGameStore } from '../store';
import { Button } from '../../components/ui/button';

export const Game3D: React.FC = () => {
  const { combat } = useGameStore();
  const [view, setView] = useState<'inventory' | 'quests' | 'combat'>('inventory');

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">3D Arena Battle</h1>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Use mouse to rotate, zoom, and pan the 3D arena view.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1">
          <Arena3D />
        </div>
        
        <div className="w-full md:w-80 space-y-4">
          <div className="flex space-x-2 mb-2">
            <Button 
              variant={view === 'inventory' ? 'default' : 'outline'} 
              onClick={() => setView('inventory')}
            >
              Inventory
            </Button>
            <Button 
              variant={view === 'quests' ? 'default' : 'outline'} 
              onClick={() => setView('quests')}
            >
              Quests
            </Button>
            {combat.active && (
              <Button 
                variant={view === 'combat' ? 'default' : 'outline'} 
                onClick={() => setView('combat')}
              >
                Combat
              </Button>
            )}
          </div>
          
          {view === 'inventory' && <Inventory />}
          {view === 'quests' && <Quests />}
          {view === 'combat' && combat.active && <Combat />}
        </div>
      </div>
    </div>
  );
};
