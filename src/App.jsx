import React, { useState } from 'react';
import IACostos from './pages/IACostos';
import Recomendaciones from './pages/Recomendaciones';
import OCRRecibos from './pages/OCRRecibos';

export default function App() {
  const [vista, setVista] = useState('costos');

  return (
    <div className="bg-slate-900 min-h-screen text-gray-100">
      {/* Barra superior de navegación */}
      <nav className="flex gap-2 p-4 bg-slate-800 border-b border-slate-700 overflow-x-auto">
        <button
          onClick={() => setVista('costos')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            vista === 'costos' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          IA & Costos
        </button>
        <button
          onClick={() => setVista('recomendaciones')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            vista === 'recomendaciones' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          Recomendaciones
        </button>
        <button
          onClick={() => setVista('ocr')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            vista === 'ocr' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          OCR Recibos
        </button>
      </nav>

      {/* Renderizado dinámico de la vista activa */}
      <main>
        {vista === 'costos' && <IACostos />}
        {vista === 'recomendaciones' && <Recomendaciones />}
        {vista === 'ocr' && <OCRRecibos />}
      </main>
    </div>
  );
}