import React from 'react';
import { motion } from 'framer-motion';

const VALUE_TEXTS = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve'
};

/**
 * Componente de tarjeta. Renderiza Flip 7 tarjetas que coinciden exactamente con las reglas de estilo en index.css.
 */
export function CardElement({ value, fromCenterX = 0, fromCenterY = 0, isDuplicate = null }) {
  const cleanValue = Math.min(Math.max(value || 0, 0), 12);
  const writtenVal = VALUE_TEXTS[cleanValue] || 'card';

  let duplicateClass = '';
  if (isDuplicate === 'left') {
    duplicateClass = 'bust-l';
  } else if (isDuplicate === 'right') {
    duplicateClass = 'bust-r';
  } else if (isDuplicate) {
    duplicateClass = 'bust-l'; // default fallback
  }

  // Verificación de doble tarjeta: si el valor es +10 (o un valor especial en el futuro, pero por ahora solo tenemos tarjetas numéricas)
  if (value === '+10' || String(value) === '+10') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: fromCenterX, y: fromCenterY }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="fc fc-mod" style={{ justifyContent: 'center', gap: '1px' }}
      >
        <div className="fc-border" style={{ borderColor: 'rgba(255,255,255,0.3)' }}></div>
        <div className="fc-shine" style={{ background: 'rgba(255,255,255,0.15)' }}></div>
        <div className="fc-mod-num">+10</div>
        <div className="fc-mod-sub">sum of your cards</div>
      </motion.div>
    );
  }

  // Let's render normal numeric cards
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: fromCenterX, y: fromCenterY }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`fc cn${cleanValue} ${duplicateClass}`}
    >
      <div className="fc-border"></div>
      <div className="fc-shine"></div>
      <div className="fc-num" style={cleanValue >= 10 ? { fontSize: '21px' } : {}}>
        {cleanValue}
      </div>
      <div className="fc-lbl">
        {writtenVal}
      </div>
    </motion.div>
  );
}
