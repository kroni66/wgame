import React from 'react';
import { useGameStore } from '../store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Item } from '../types';

export const Inventory: React.FC = () => {
  const { player, removeItemFromInventory } = useGameStore();

  const handleUseItem = (item: Item) => {
    removeItemFromInventory(item.id);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>Your items and equipment</CardDescription>
      </CardHeader>
      <CardContent>
        {player.inventory.length === 0 ? (
          <p className="text-gray-500">Your inventory is empty.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {player.inventory.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => handleUseItem(item)}
              >
                <img src={item.icon} alt={item.name} className="w-8 h-8 mb-1" />
                <span className="text-xs text-center">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-500">
          Click on an item to use it
        </div>
      </CardFooter>
    </Card>
  );
};
