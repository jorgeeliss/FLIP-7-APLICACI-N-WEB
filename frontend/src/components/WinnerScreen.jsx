import React from 'react';
import { motion } from 'framer-motion';


export function WinnerScreen({ winnerName, winnerScore, onRestart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white text-center select-none relative">
      {/* Background glow */}
      <div className="absolute w-[400px] h-[400px] bg-[#EAB308]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ type: 'spring', damping: 15 }}
        className="bg-[#051325]/90 border-2 border-[#EAB308] p-12 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden flex flex-col items-center"
      >
        {/* Acento de borde brillante */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EAB308] to-yellow-600 rounded-3xl blur opacity-25 pointer-events-none"></div>

        {/* Trofeo / Icono*/}
        <span className="text-6xl mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] animate-bounce relative z-10">
          🏆
        </span>

        {/* Header */}
        <h1 className="text-4xl font-black text-[#EAB308] tracking-widest uppercase mb-2 relative z-10">
          ¡GANADOR!
        </h1>
        
        {/* Nombre del ganador */}
        <p className="text-5xl font-black text-slate-100 drop-shadow-md mb-6 truncate max-w-full px-2 relative z-10">
          {winnerName}
        </p>

        {/* Puntuación del ganador */}
        <p className="text-sm font-extrabold bg-gradient-to-r from-[#EAB308] to-yellow-600 text-[#030c17] py-2 px-6 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.3)] tracking-wider uppercase relative z-10">
          {winnerScore} Puntos
        </p>

        {/* Botón de reinicio */}
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart} 
          className="mt-12 bg-gradient-to-r from-[#ffd060] to-[#e69b00] hover:from-[#ffdf80] hover:to-[#ffb700] text-[#0d0705] border-2 border-[#fff2b2]/60 font-black py-4 px-10 rounded-full transition-colors w-full uppercase tracking-[4px] text-[16px] shadow-[0_0_25px_rgba(255,200,60,0.5)] hover:shadow-[0_0_35px_rgba(255,200,60,0.8)] relative z-20 cursor-pointer flex items-center justify-center gap-3"
        >
          Volver a Jugar <span className="text-xl leading-none">↻</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
