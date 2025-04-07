import { create } from 'zustand';
import { Character, GameMap, Item, NPC, Quest, GameState, CombatState, Position } from './types';
import { v4 as uuidv4 } from 'uuid';
import { isValidPosition } from './utils/isometric';

const initialMap: GameMap = {
  width: 10,
  height: 10,
  tiles: Array(10).fill(Array(10).fill(0)),
  npcs: [],
};

const initialPlayer: Character = {
  id: uuidv4(),
  name: 'Hero',
  position: { x: 5, y: 5 },
  health: 100,
  maxHealth: 100,
  attack: 10,
  defense: 5,
  inventory: [],
  quests: [],
  animations: {
    idle: '/src/game/assets/sprites/character.svg',
    walk: '/src/game/assets/sprites/character.svg',
    attack: '/src/game/assets/sprites/character.svg',
  },
};

const initialItems: Item[] = [
  {
    id: uuidv4(),
    name: 'Sword',
    type: 'weapon',
    value: 10,
    stats: {
      attack: 5,
    },
    icon: '/src/game/assets/items/sword.svg',
  },
];

const initialNPCs: NPC[] = [
  {
    id: uuidv4(),
    name: 'Village Elder',
    position: { x: 3, y: 3 },
    dialog: ['Welcome to our village!', 'Would you help us defeat the monsters?'],
    questId: '1',
  },
];

const initialQuests: Quest[] = [
  {
    id: '1',
    title: 'Village Defense',
    description: 'Defeat 3 monsters attacking the village.',
    completed: false,
    rewards: [initialItems[0]],
  },
];

const initialCombatState: CombatState = {
  active: false,
  player1: initialPlayer,
  player2: {
    ...initialPlayer,
    id: uuidv4(),
    name: 'Enemy',
    position: { x: 6, y: 6 },
  },
  turn: 'player1',
  logs: [],
};

interface GameStore extends GameState {
  combat: CombatState;
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
  addItemToInventory: (item: Item) => void;
  removeItemFromInventory: (itemId: string) => void;
  startQuest: (questId: string) => void;
  completeQuest: (questId: string) => void;
  startCombat: (player2: Character) => void;
  endCombat: () => void;
  attackInCombat: () => void;
  interactWithNPC: (npcId: string) => string[];
}

export const useGameStore = create<GameStore>((set, get) => ({
  player: initialPlayer,
  map: initialMap,
  npcs: initialNPCs,
  items: initialItems,
  quests: initialQuests,
  combat: initialCombatState,

  movePlayer: (direction) => {
    const { player, map } = get();
    let newPosition: Position = { ...player.position };

    switch (direction) {
      case 'up':
        newPosition.y -= 1;
        break;
      case 'down':
        newPosition.y += 1;
        break;
      case 'left':
        newPosition.x -= 1;
        break;
      case 'right':
        newPosition.x += 1;
        break;
    }

    if (isValidPosition(newPosition, map.width, map.height)) {
      set({ player: { ...player, position: newPosition } });
    }
  },

  addItemToInventory: (item) => {
    const { player } = get();
    set({ player: { ...player, inventory: [...player.inventory, item] } });
  },

  removeItemFromInventory: (itemId) => {
    const { player } = get();
    set({
      player: {
        ...player,
        inventory: player.inventory.filter((item) => item.id !== itemId),
      },
    });
  },

  startQuest: (questId) => {
    const { player, quests } = get();
    const quest = quests.find((q) => q.id === questId);
    if (quest && !player.quests.includes(quest)) {
      set({
        player: { ...player, quests: [...player.quests, quest] },
      });
    }
  },

  completeQuest: (questId) => {
    const { player, quests } = get();
    const updatedQuests = quests.map((quest) =>
      quest.id === questId ? { ...quest, completed: true } : quest
    );
    
    const questToComplete = quests.find((quest) => quest.id === questId);
    if (questToComplete) {
      const updatedPlayer = { ...player };
      questToComplete.rewards.forEach((item) => {
        updatedPlayer.inventory.push(item);
      });
      
      set({
        player: updatedPlayer,
        quests: updatedQuests,
      });
    }
  },

  startCombat: (player2) => {
    set({
      combat: {
        active: true,
        player1: get().player,
        player2,
        turn: 'player1',
        logs: ['Combat started!'],
      },
    });
  },

  endCombat: () => {
    set({
      combat: { ...initialCombatState, active: false },
    });
  },

  attackInCombat: () => {
    const { combat } = get();
    if (!combat.active) return;

    const attacker = combat.turn === 'player1' ? combat.player1 : combat.player2;
    const defender = combat.turn === 'player1' ? combat.player2 : combat.player1;
    
    const damage = Math.max(1, attacker.attack - defender.defense);
    const newHealth = Math.max(0, defender.health - damage);
    
    const newLogs = [
      ...combat.logs,
      `${attacker.name} attacks ${defender.name} for ${damage} damage!`,
    ];

    if (newHealth === 0) {
      newLogs.push(`${defender.name} has been defeated!`);
    }

    const newCombat: CombatState = {
      ...combat,
      logs: newLogs,
      turn: combat.turn === 'player1' ? 'player2' : 'player1',
    };

    if (combat.turn === 'player1') {
      newCombat.player2 = { ...combat.player2, health: newHealth };
    } else {
      newCombat.player1 = { ...combat.player1, health: newHealth };
    }

    if (newHealth === 0) {
      newCombat.active = false;
    }

    set({ combat: newCombat });
  },

  interactWithNPC: (npcId) => {
    const { npcs, quests } = get();
    const npc = npcs.find((n) => n.id === npcId);
    
    if (npc && npc.questId) {
      const quest = quests.find((q) => q.id === npc.questId);
      if (quest && !quest.completed) {
        get().startQuest(npc.questId);
      }
    }
    
    return npc ? npc.dialog : ['No NPC found.'];
  },
}));
