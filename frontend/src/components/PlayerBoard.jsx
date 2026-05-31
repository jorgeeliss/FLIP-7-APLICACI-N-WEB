import React from 'react';
import { CardElement } from './CardElement';
import { AnimatePresence } from 'framer-motion';


/**
* Calcula la puntuación de la ronda actual para la mano de un jugador.
*/
function getRoundPoints(hand, state) {
  if (state === 'BUSTED') return 0;
  if (!hand || hand.length === 0) return 0;
  
  const values = hand.map(c => c.value);
  const hasDupes = values.some((v, i) => values.indexOf(v) !== i);
  if (hasDupes) return 0;
  
  let score = values.reduce((sum, v) => sum + v, 0);
  if (values.length >= 7) {
    score += 15; // Flip 7 Bonus
  }
  return score;
}


export function PlayerBoard({ player, isMyTurn, isRoundFinished, angle, index }) {
  const isBusted = player.roundState === 'BUSTED';
  const isStanding = player.roundState === 'STANDING';
  
  // Calculate round score
  const roundPoints = getRoundPoints(player.currentHand, player.roundState);

  // Get state details
  const getBadgeDetails = () => {
    if (isBusted) {
      return { text: 'Reventado', classes: 'b-bust' };
    }
    if (isStanding) {
      return { text: 'Plantado', classes: 'b-safe' };
    }
    if (isMyTurn && !isRoundFinished) {
      return { text: 'Jugando', classes: 'b-play' };
    }
    return { text: 'Esperando', classes: 'b-play' };
  };

  const badge = getBadgeDetails();

  //Encuentra el valor duplicado para renderizar el emoji de explosión 💥 entre ellos
  const handValues = (player.currentHand || []).map(c => c.value);
  const duplicateValue = handValues.find((v, i) => handValues.indexOf(v) !== i);

  // Determine container classes based on turn
  let pcardClass = 'pcard';
  if (isBusted) {
    pcardClass += ' busted';
  } else if (isStanding) {
    pcardClass += ' safe';
  } else if (isMyTurn && !isRoundFinished) {
    pcardClass += ' active';
  }

  const isBottomPlayer = index === 3;

  const renderPlayerCard = () => (
    <div className={pcardClass}>
      {isMyTurn && !isRoundFinished && <div className="sweep"></div>}
      <div className={`pname ${isMyTurn && !isRoundFinished ? 'gold' : ''}`} style={isBusted ? { color: 'rgba(255,100,100,0.9)' } : {}}>
        {player.name}
      </div>
      <div className="ppts-l">ronda</div>
      <div className={`ppts ${isMyTurn && !isRoundFinished ? 'gold' : ''}`} style={isBusted ? { color: 'rgba(255,80,80,0.7)' } : {}}>
        {roundPoints}
      </div>
      <div className={`pbadge ${badge.classes}`}>
        {badge.text}
      </div>
    </div>
  );

  const renderHandCards = () => (
    <div className="pcards" style={isBottomPlayer ? { marginBottom: '5px' } : {}}>
      <AnimatePresence>
        {player.currentHand && player.currentHand.map((card, cardIndex) => {
          // Detect if it is the first or second duplicate
          const isFirstDupe = duplicateValue !== undefined && card.value === duplicateValue && cardIndex === handValues.indexOf(duplicateValue);
          const isSecondDupe = duplicateValue !== undefined && card.value === duplicateValue && cardIndex === handValues.lastIndexOf(duplicateValue);
          const dupeProp = isFirstDupe ? 'left' : (isSecondDupe ? 'right' : null);

          return (
            <React.Fragment key={`${player.id}-${cardIndex}-${card.value}`}>
              <CardElement 
                value={card.value} 
                isDuplicate={dupeProp}
              />
              
              {/* Icono de explosión entre duplicados */}
              {isBusted && isFirstDupe && (
                <div style={{ fontSize: '22px', alignSelf: 'center', margin: '0 3px' }}>
                  💥
                </div>
              )}
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {isBottomPlayer ? (
        <>
          {renderHandCards()}
          {renderPlayerCard()}
        </>
      ) : (
        <>
          {renderPlayerCard()}
          {renderHandCards()}
        </>
      )}
    </>
  );
}
