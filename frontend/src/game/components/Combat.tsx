import React from 'react';
import { useGameStore } from '../store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

export const Combat: React.FC = () => {
  const { combat, attackInCombat, endCombat } = useGameStore();

  if (!combat.active) {
    return null;
  }

  const player1HealthPercentage = (combat.player1.health / combat.player1.maxHealth) * 100;
  const player2HealthPercentage = (combat.player2.health / combat.player2.maxHealth) * 100;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Combat</CardTitle>
        <CardDescription>
          {combat.turn === 'player1' ? 'Your turn' : 'Enemy turn'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded p-2">
            <h3 className="font-bold">{combat.player1.name}</h3>
            <div className="w-full bg-gray-300 h-2 mt-1">
              <div
                className="bg-green-500 h-2"
                style={{ width: `${player1HealthPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1">
              HP: {combat.player1.health}/{combat.player1.maxHealth}
            </div>
          </div>
          
          <div className="border rounded p-2">
            <h3 className="font-bold">{combat.player2.name}</h3>
            <div className="w-full bg-gray-300 h-2 mt-1">
              <div
                className="bg-red-500 h-2"
                style={{ width: `${player2HealthPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1">
              HP: {combat.player2.health}/{combat.player2.maxHealth}
            </div>
          </div>
        </div>
        
        <div className="mt-4 border rounded p-2 h-32 overflow-y-auto">
          {combat.logs.map((log, index) => (
            <div key={index} className="text-sm mb-1">
              {log}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={attackInCombat}
          disabled={combat.turn !== 'player1'}
        >
          Attack
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={endCombat}
        >
          Flee
        </button>
      </CardFooter>
    </Card>
  );
};
