import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export function Lobby({ error, onStartGame }) {
  const [playerNames, setPlayerNames] = useState(['Emerson', 'Eliss', 'Cerda', 'Ghost']);
  const [validationError, setValidationError] = useState('');

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
    setValidationError('');
  };

  const addPlayer = () => {
    if (playerNames.length >= 6) return;
    setPlayerNames([...playerNames, '']);
    setValidationError('');
  };

  const removePlayer = (indexToRemove) => {
    setPlayerNames(playerNames.filter((_, index) => index !== indexToRemove));
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNames = playerNames.map(name => name.trim());
    
    if (trimmedNames.length < 2) {
      return setValidationError('Se requieren al menos 2 jugadores para iniciar.');
    }
    
    if (trimmedNames.some(name => name === '')) {
      return setValidationError('Por favor completa todos los nombres.');
    }

    onStartGame(trimmedNames);
  };

  const displayedError = validationError || error;

  return (
    <>
      <style>{`
        .l-root {
          font-family: 'DM Sans', sans-serif;
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0c0804;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* ── AMBIENT BG ── */
        .l-amb {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 45% at 50% 0%,   rgba(180,90,10,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 20% 100%, rgba(120,50,5,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 80% 100%, rgba(120,50,5,0.14) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 50%, rgba(60,25,5,0.4) 0%, transparent 80%);
        }

        /* Tapete pattern */
        .l-tapete {
          position: absolute; inset: 0; opacity: 0.04;
          background-image:
            repeating-linear-gradient(45deg,  #c8a050 0, #c8a050 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient(-45deg, #c8a050 0, #c8a050 1px, transparent 1px, transparent 32px);
        }

        /* Lamp cone from top */
        .l-lamp {
          position: absolute;
          top: -60px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 340px;
          background: radial-gradient(ellipse 55% 75% at 50% 5%,
            rgba(255,200,100,0.18) 0%,
            rgba(200,130,40,0.07) 35%,
            transparent 68%
          );
          pointer-events: none;
          animation: l-flicker 7s ease-in-out infinite;
        }
        @keyframes l-flicker {
          0%,100%{opacity:1} 42%{opacity:.88} 44%{opacity:.96} 46%{opacity:.82} 58%{opacity:1}
        }

        /* ── LOGO ── */
        .l-logo-wrap {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 28px;
        }
        .l-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 68px; letter-spacing: 12px;
          line-height: 1;
          background: linear-gradient(180deg, #ffe08a 0%, #c8860a 55%, #7a4d00 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 24px rgba(200,140,20,0.45));
        }
        .l-logo-sub {
          font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(200,140,40,0.5); margin-top: -4px;
          font-weight: 500;
        }

        /* ── PANEL ── */
        .l-panel {
          position: relative; z-index: 10;
          width: 420px;
          background: rgba(10,6,2,0.72);
          border: 1px solid rgba(180,110,20,0.22);
          border-radius: 16px;
          padding: 28px 28px 24px;
          backdrop-filter: blur(12px);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,200,80,0.04),
            inset 0 1px 0 rgba(255,200,80,0.08);
        }

        /* Thin gold top edge accent */
        .l-panel::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 60%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,190,60,0.5), transparent);
          border-radius: 1px;
        }

        .l-panel-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(200,140,40,0.65);
          text-align: center; margin-bottom: 22px;
          display: flex; align-items: center; gap: 10px; justify-content: center;
        }
        .l-panel-title::before, .l-panel-title::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,110,20,0.3));
        }
        .l-panel-title::after { background: linear-gradient(90deg, rgba(180,110,20,0.3), transparent); }

        /* ── PLAYER ROWS ── */
        .l-players-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }

        .l-player-row {
          display: flex; align-items: center; gap: 8px;
          animation: l-fadeIn .25s ease;
        }
        @keyframes l-fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .l-player-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 2px;
          color: rgba(180,110,20,0.5);
          width: 68px; flex-shrink: 0;
          text-transform: uppercase;
        }

        .l-input-wrap {
          flex: 1; position: relative;
        }
        .l-input-wrap input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(180,110,20,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 400;
          color: rgba(255,235,180,0.9);
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          letter-spacing: 0.3px;
        }
        .l-input-wrap input::placeholder { color: rgba(180,130,60,0.3); }
        .l-input-wrap input:focus {
          border-color: rgba(200,150,40,0.6);
          background: rgba(255,200,80,0.04);
          box-shadow: 0 0 0 3px rgba(180,120,20,0.1);
        }

        /* Active row indicator */
        .l-player-row.active .l-input-wrap input {
          border-color: rgba(200,150,40,0.55);
          box-shadow: 0 0 0 3px rgba(180,120,20,0.1);
        }

        .l-btn-remove {
          width: 34px; height: 34px; flex-shrink: 0;
          border: 1px solid rgba(200,50,50,0.3);
          border-radius: 8px;
          background: rgba(180,30,30,0.1);
          color: rgba(220,80,80,0.7);
          font-size: 15px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: border-color .15s, background .15s, color .15s;
        }
        .l-btn-remove:hover {
          border-color: rgba(220,60,60,0.6);
          background: rgba(200,30,30,0.22);
          color: #ff6060;
        }

        /* ── ADD PLAYER ── */
        .l-btn-add {
          width: 100%;
          padding: 9px;
          background: transparent;
          border: 1px dashed rgba(180,110,20,0.3);
          border-radius: 9px;
          color: rgba(200,150,50,0.6);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 3px;
          cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
          margin-bottom: 22px;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .l-btn-add:hover {
          border-color: rgba(200,150,50,0.55);
          color: rgba(220,170,70,0.9);
          background: rgba(180,110,20,0.06);
        }

        /* Player count badge */
        .l-count-badge {
          display: flex; justify-content: center; gap: 6px;
          margin-bottom: 18px;
        }
        .l-cb-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1px solid rgba(180,110,20,0.35);
          transition: background .25s, border-color .25s;
        }
        .l-cb-dot.on { background: rgba(200,140,30,0.7); border-color: rgba(200,140,30,0.6); }

        /* ── START BTN ── */
        .l-btn-start {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: none;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; letter-spacing: 5px;
          color: rgba(255,240,200,0.95);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: opacity .2s, letter-spacing .2s;
          position: relative;
        }
        .l-btn-start::after {
          content: '';
          position: absolute; bottom: 0; left: 15%; right: 15%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,200,80,0.3), transparent);
        }
        .l-btn-start:hover { opacity: .8; letter-spacing: 7px; }

        .l-arrow-icon {
          font-size: 18px;
          display: inline-block;
          transition: transform .2s;
        }
        .l-btn-start:hover .l-arrow-icon { transform: translateX(5px); }

        /* ── FOOTER ── */
        .l-footer-note {
          position: relative; z-index: 10;
          margin-top: 18px;
          font-size: 10px; color: rgba(150,100,30,0.4);
          letter-spacing: 1.5px; text-transform: uppercase;
          text-align: center;
        }

        /* Global Error overlay */
        .l-error-box {
          background: rgba(180,30,30,0.15);
          border: 1px solid rgba(220,60,60,0.3);
          color: rgba(255,100,100,0.9);
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 14px;
          font-size: 12px;
          text-align: center;
          font-weight: 500;
        }
      `}</style>

      <div className="l-root">
        <div className="l-amb"></div>
        <div className="l-tapete"></div>
        <div className="l-lamp"></div>

        {/* Logo */}
        <div className="l-logo-wrap">
          <div className="l-logo">FLIP 7</div>
          <div className="l-logo-sub">the greatest card game of all time</div>
        </div>

        {/* Panel */}
        <div className="l-panel">
          <div className="l-panel-title">Mesa VIP</div>

          {/* Player count dots */}
          <div className="l-count-badge">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`l-cb-dot ${i < playerNames.length ? 'on' : ''}`}></div>
            ))}
          </div>

          {displayedError && (
            <div className="l-error-box">
              {displayedError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="l-players-list">
              <AnimatePresence>
                {playerNames.map((name, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="l-player-row"
                  >
                    <div className="l-player-num">Jugador {index + 1}</div>
                    <div className="l-input-wrap">
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        placeholder="Nombre del jugador" 
                      />
                    </div>
                    <button type="button" onClick={() => removePlayer(index)} className="l-btn-remove">✕</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {playerNames.length < 6 && (
              <button type="button" onClick={addPlayer} className="l-btn-add">
                ＋ &nbsp;Añadir Jugador
              </button>
            )}

            <button type="submit" className="l-btn-start">
              Iniciar Partida <span className="l-arrow-icon">→</span>
            </button>
          </form>
        </div>

        <div className="l-footer-note">2 – 6 jugadores · Flip 7 © 2024</div>
      </div>
    </>
  );
}
