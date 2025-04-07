import React from 'react';
import { useGameStore } from '../store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export const Quests: React.FC = () => {
  const { player, completeQuest } = useGameStore();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Quests</CardTitle>
        <CardDescription>Your active quests</CardDescription>
      </CardHeader>
      <CardContent>
        {player.quests.length === 0 ? (
          <p className="text-gray-500">You don't have any active quests.</p>
        ) : (
          <div className="space-y-4">
            {player.quests.map((quest) => (
              <div key={quest.id} className="border rounded p-3">
                <h3 className="font-bold text-lg">{quest.title}</h3>
                <p className="text-sm text-gray-600">{quest.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Rewards: {quest.rewards.map(r => r.name).join(', ')}
                  </div>
                  <button
                    className={`px-2 py-1 text-xs rounded ${
                      quest.completed 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    onClick={() => !quest.completed && completeQuest(quest.id)}
                    disabled={quest.completed}
                  >
                    {quest.completed ? 'Completed' : 'Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
