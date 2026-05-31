import React from 'react';
import { motion } from 'framer-motion';

export function ControlPanel({ activePlayer, isMyTurn, isRoundFinished, onAction }) {
  const getUniqueCardCount = () => {
    if (!activePlayer || !activePlayer.currentHand) return 0;
    const values = activePlayer.currentHand.map(c => c.value);
    const uniqueValues = new Set(values);
    return uniqueValues.size;
  };

  const uniqueCount = getUniqueCardCount();
  const maxBonusCards = 7;

  // Los botones solo se pueden pulsar si es el turno del jugador local y la ronda de juego está activa.
  const canPlay = isMyTurn && !isRoundFinished && activePlayer?.roundState === 'PLAYING';

  return (
    <>
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '4px 22px 4px' }}>
        <div className="bonus-strip">
          <span className="bonus-lbl">FLIP 7</span>
          <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: maxBonusCards }).map((_, i) => {
              const isFilled = i < uniqueCount;
              return (
                <div 
                  key={i} 
                  className={`b7slot ${isFilled ? 'on' : 'off'}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="controls">
        <motion.button
          whileHover={canPlay ? { scale: 1.05 } : {}}
          whileTap={canPlay ? { scale: 0.95 } : {}}
          disabled={!canPlay}
          onClick={() => onAction('HIT')}
          className="btn-hit"
          style={!canPlay ? { opacity: 0.4, cursor: 'not-allowed', transform: 'none' } : {}}
        >
          <i className="ti ti-cards" aria-hidden="true" style={{ fontSize: '14px', verticalAlign: '-2px', marginRight: '5px' }}></i>HIT
        </motion.button>

        <motion.button
          whileHover={canPlay ? { scale: 1.05 } : {}}
          whileTap={canPlay ? { scale: 0.95 } : {}}
          disabled={!canPlay}
          onClick={() => onAction('STAND')}
          className="btn-stand"
          style={!canPlay ? { opacity: 0.4, cursor: 'not-allowed', transform: 'none' } : {}}
        >
          <i className="ti ti-hand-stop" aria-hidden="true" style={{ fontSize: '14px', verticalAlign: '-2px', marginRight: '5px' }}></i>STAND
        </motion.button>
      </div>
    </>
  );
}
