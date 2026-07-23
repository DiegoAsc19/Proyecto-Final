import React, { useState } from 'react';
import IACostos from './pages/IACostos';
import Recomendaciones from './pages/Recomendaciones';
import OCRRecibos from './pages/OCRRecibos';

export default function App() {
  const [vista, setVista] = useState('costos');

  return (
    <div className="bg-slate-900 min-h-screen text-gray-100">
      {/* Barra superior de prueba local */}
      <nav className="flex gap-4 p-4 bg-slate-800 border-b border-slate-700">
        <button 
          onClick={() => setVista('costos')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${vista === 'costos' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
        >
          IA & Costos
        </button>
        <button 
          onClick={() => setVista('recomendaciones')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${vista === 'recomendaciones' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
        >
          Recomendaciones
        </button>
        <button 
          onClick={() => setVista('ocr')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${vista === 'ocr' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
        >
          OCR Recibos
        </button>
      </nav>

      {/* Renderizado de tu componente actual */}
      <main>
        {vista === 'costos' && <IACostos />}
        {vista === 'recomendaciones' && <Recomendaciones />}
        {vista === 'ocr' && <OCRRecibos />}
      </main>
    </div>
  );
}