import React from 'react';
import { motion } from 'framer-motion';
import { PlayerBoard } from './PlayerBoard';

export function GameTable({ players, currentPlayerId, isRoundFinished, startNextRound, deckCount }) {
  const totalPlayers = players.length;

  // Custom coordinate mappings from the reference screenshot.
  const getPlayerPositionStyle = (index) => {
    switch (index) {
      case 0: // Top
        return { top: '0', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' };
      case 1: // Left
        return { top: '50%', left: '0', transform: 'translateY(-50%)', alignItems: 'flex-start' };
      case 2: // Right
        return { top: '50%', right: '0', transform: 'translateY(-50%)', alignItems: 'flex-end' };
      case 3: // Bottom
        return { bottom: '0', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' };
      default:
        // Sistema de reserva dinámico en caso de que haya más de 4 jugadores.
        const angle = (index / totalPlayers) * 2 * Math.PI - (Math.PI / 2);
        return {
          left: `calc(50% + ${38 * Math.cos(angle)}%)`,
          top: `calc(50% + ${32 * Math.sin(angle)}%)`,
          transform: 'translate(-50%, -50%)',
          alignItems: 'center'
        };
    }
  };

  return (
    <div style={{ position: 'absolute', inset: '10px 40px', zIndex: 10 }}>
      {/* CENTRAL DECK AREA */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -55%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        zIndex: 25
      }}>
        <div style={{ position: 'relative', width: '42px', height: '58px' }}>
          <div className="fc fc-back" style={{ position: 'absolute', top: '3px', left: '3px', opacity: 0.35 }}></div>
          <div className="fc fc-back" style={{ position: 'absolute', top: 0, left: 0 }}>
            <div className="fc-back-inner">
              <div className="fc-back-txt">F7</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>
          {deckCount} cartas
        </div>

        {isRoundFinished && (
          <motion.button 
            initial={{ scale: 0, y: 5 }} 
            animate={{ scale: [1, 1.08, 1], y: 0 }} 
            transition={{ scale: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={startNextRound} 
            className="absolute top-20 bg-gradient-to-r from-[#ffd060] to-[#e69b00] hover:from-[#ffdf80] hover:to-[#ffb700] text-[#0d0705] font-black py-3.5 px-10 rounded-full whitespace-nowrap shadow-[0_0_25px_rgba(255,200,60,0.8),inset_0_0_10px_rgba(255,255,255,0.4)] transition-all z-40 uppercase text-[15px] tracking-[3px] border-2 border-[#fff2b2]/50 cursor-pointer"
          >
            Repartir Ronda
          </motion.button>
        )}
      </div>

      {/* DRAW PLAYERS */}
      {players.map((player, index) => {
        const isMyTurn = currentPlayerId === player.id;
        const positionStyle = getPlayerPositionStyle(index);
        const angle = (index / totalPlayers) * 2 * Math.PI - (Math.PI / 2);

        return (
          <div 
            key={player.id} 
            className="player" 
            style={{
              ...positionStyle,
              zIndex: isMyTurn ? 40 : 30
            }}
          >
            <PlayerBoard 
              player={player} 
              isMyTurn={isMyTurn} 
              isRoundFinished={isRoundFinished}
              angle={angle}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}
