import React from 'react';

const SCORE_TO_WIN = 200;

export function Scoreboard({ players }) {
  // Encuentra la puntuación más alta para resaltar al líder.
  const maxScore = Math.max(...players.map(p => p.totalScore), 0);

  return (
    <div className="scoreboard">
      {players.map((player) => {
        const scorePercent = Math.min((player.totalScore / SCORE_TO_WIN) * 100, 100);
        const isLeader = player.totalScore === maxScore && maxScore > 0;
        
        const barStyle = player.totalScore < 75 
          ? { width: `${scorePercent}%`, background: 'rgba(255,80,80,0.55)' }
          : { width: `${scorePercent}%` };

        return (
          <div 
            key={player.id} 
            className={`sc ${isLeader ? 'lead' : ''}`}
          >
            <div className="sc-n">{player.name}</div>
            <div className="sc-v">{player.totalScore}</div>
            <div className="sc-bg">
              <div className="sc-bar" style={barStyle}></div>
            </div>
          </div>
        );
      })}

      {/* Targeta META Card */}
      <div className="sc" style={{ borderStyle: 'dashed', borderColor: 'rgba(255,200,60,0.2)' }}>
        <div className="sc-n" style={{ color: 'rgba(255,200,60,0.45)' }}>Meta</div>
        <div className="sc-v" style={{ color: 'rgba(255,200,60,0.4)' }}>{SCORE_TO_WIN}</div>
        <div className="sc-bg">
          <div className="sc-bar" style={{ width: '100%', background: 'rgba(255,200,60,0.18)' }}></div>
        </div>
      </div>
    </div>
  );
}
