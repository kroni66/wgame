import './App.css'
import { useState } from 'react'
import { Game } from './game/components/Game.tsx'
import { Game3D } from './game/components/Game3D.tsx'
import { Button } from './components/ui/button'

function App() {
  const [gameMode, setGameMode] = useState<'2d' | '3d'>('2d')

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center mb-4 space-x-4">
        <Button 
          variant={gameMode === '2d' ? 'default' : 'outline'} 
          onClick={() => setGameMode('2d')}
        >
          2D Isometric View
        </Button>
        <Button 
          variant={gameMode === '3d' ? 'default' : 'outline'} 
          onClick={() => setGameMode('3d')}
        >
          3D Arena View
        </Button>
      </div>
      
      {gameMode === '2d' ? <Game /> : <Game3D />}
    </div>
  )
}

export default App
