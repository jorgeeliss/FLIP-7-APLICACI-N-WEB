import React from 'react';


export function Header({ roundNumber, deckCount, status, currentPlayerName, isRoundFinished }) {
  
  const getStatusText = () => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'EN JUEGO';
      case 'FINISHED':
        return 'FINALIZADO';
      default:
        return 'ESPERANDO';
    }
  };

  return (
    <div className="hdr">
      <div className="logo">FLIP 7</div>
      
      {/* Detalles de giro central / redondeado */}
      <div>
        {!isRoundFinished && currentPlayerName ? (
          <div className="turn-lbl">✦ TURNO DE {currentPlayerName.toUpperCase()} ✦</div>
        ) : (
          <div className="turn-lbl">✦ RONDA TERMINADA ✦</div>
        )}
        <div className="rnd-lbl">
          RONDA {roundNumber} · {deckCount} CARTAS
        </div>
      </div>

      {/* Insignia de estado */}
      <div className="status-pill">
        <div className="dot"></div>
        {getStatusText()}
      </div>
    </div>
  );
}
