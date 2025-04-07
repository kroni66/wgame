export interface Position {
  x: number;
  y: number;
}

export interface Character {
  id: string;
  name: string;
  position: Position;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  inventory: Item[];
  quests: Quest[];
  animations: {
    idle: string;
    walk: string;
    attack: string;
  };
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable';
  value: number;
  stats: {
    attack?: number;
    defense?: number;
    health?: number;
  };
  icon: string;
}

export interface NPC {
  id: string;
  name: string;
  position: Position;
  dialog: string[];
  questId?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  rewards: Item[];
}

export interface GameMap {
  width: number;
  height: number;
  tiles: number[][];
  npcs: NPC[];
}

export interface GameState {
  player: Character;
  map: GameMap;
  npcs: NPC[];
  items: Item[];
  quests: Quest[];
}

export interface CombatState {
  active: boolean;
  player1: Character;
  player2: Character;
  turn: 'player1' | 'player2';
  logs: string[];
}
