import { useState, useEffect, useRef } from 'react';
import { apiService } from './services/apiService';
import { audioService } from './services/audioService';
import { Header } from './components/Header';
import { GameTable } from './components/GameTable';
import { ControlPanel } from './components/ControlPanel';
import { Scoreboard } from './components/Scoreboard';
import { Lobby } from './components/Lobby';
import { WinnerScreen } from './components/WinnerScreen';

function App() {
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  
  const previousCardCount = useRef(0);

  const fetchGameState = async (id) => {
    try {
      const data = await apiService.fetchGameState(id);
      setGameState(data);
      
      const currentTotalCards = (data.players || []).reduce(
        (total, p) => total + (p.currentHand ? p.currentHand.length : 0), 
        0
      );
      if (currentTotalCards > previousCardCount.current && previousCardCount.current !== 0) {
        audioService.playCardSound();
      }
      previousCardCount.current = currentTotalCards;
    } catch (err) {
      console.error('Failed to fetch game state:', err);
    }
  };

  useEffect(() => {
    if (!gameId) return;

    fetchGameState(gameId);

    const interval = setInterval(() => {
      fetchGameState(gameId);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameId]);

  const handleStartGame = async (playerNames) => {
    try {
      setError('');
      const data = await apiService.startGame(playerNames);
      setGameId(data.gameId);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePlayerAction = async (playerId, action) => {
    try {
      setError('');
      await apiService.handleAction(gameId, playerId, action);
      await fetchGameState(gameId);
    } catch (err) {
      console.error('Action failed:', err);
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStartNextRound = async () => {
    try {
      setError('');
      await apiService.startNextRound(gameId);
      previousCardCount.current = 0;
      await fetchGameState(gameId);
    } catch (err) {
      console.error('Failed to start next round:', err);
      setError(err.message);
    }
  };

 
  const handleRestart = () => {
    setGameId(null);
    setGameState(null);
    setError('');
    previousCardCount.current = 0;
  };

  
  if (gameId && gameState && gameState.status === 'FINISHED') {
    const sortedPlayers = [...gameState.players].sort((a, b) => b.totalScore - a.totalScore);
    const winner = sortedPlayers[0];

    return (
      <WinnerScreen 
        winnerName={winner.name} 
        winnerScore={winner.totalScore} 
        onRestart={handleRestart} 
      />
    );
  }

  if (gameId && gameState) {
    const activePlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
    
   
    const totalHandCardsCount = (gameState.players || []).reduce(
      (total, p) => total + (p.currentHand ? p.currentHand.length : 0),
      0
    );
    const deckCount = Math.max(79 - totalHandCardsCount, 0);

    return (
      <div className="root w-screen h-screen flex flex-col relative overflow-hidden bg-[#1a0d05] text-white">
        {/* Superposición de errores de acción */}
        {error && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-rose-950/90 border border-rose-600 text-rose-200 font-bold py-1.5 px-4 rounded-full shadow-2xl z-50 text-[9px] tracking-wider animate-bounce uppercase">
            ⚠️ {error}
          </div>
        )}

        {/* Ambiente de la habitación */}
        <div className="room-bg"></div>
        <div className="room-pattern"></div>
        <div className="lamp-glow"></div>
        
        {/* Mesa de juego con textura de madera */}
        <div className="wood-outer">
          <div className="wood-grain"></div>
          <div className="wood-sheen"></div>
        </div>

        {/* Línea de ferrocarril decorativa alrededor de la mesa */}
        <div className="rail-line"></div>

        {/* Superficie de fieltro con detalles de tejido y marca central */}
        <div className="felt-surface">
          <div className="felt-weave"></div>
          <div className="felt-light"></div>
          <div className="felt-center-mark"></div>
        </div>

        {/* Header */}
        <Header 
          roundNumber={gameState.roundCounter || 1} 
          deckCount={deckCount} 
          status={gameState.status} 
          currentPlayerName={gameState.currentPlayerName}
          isRoundFinished={gameState.isRoundFinished}
        />

      
        <div className="flex-1 relative w-full z-10" style={{ minHeight: '400px' }}>
          <GameTable 
            players={gameState.players} 
            currentPlayerId={gameState.currentPlayerId} 
            isRoundFinished={gameState.isRoundFinished} 
            startNextRound={handleStartNextRound} 
            deckCount={deckCount}
          />
        </div>

        <ControlPanel 
          activePlayer={activePlayer} 
          isMyTurn={!!activePlayer} 
          isRoundFinished={gameState.isRoundFinished} 
          onAction={(action) => handlePlayerAction(gameState.currentPlayerId, action)} 
        />

        <Scoreboard players={gameState.players} />
      </div>
    );
  }

  // Si no hay juego activo, mostramos el lobby para iniciar uno nuevo
  return (
    <Lobby 
      error={error} 
      onStartGame={handleStartGame} 
    />
  );
}

export default App;
