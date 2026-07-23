import React, { useState } from 'react';
import { FileSearch, Upload, CheckCircle } from 'lucide-react';

export default function OCRRecibos() {
  const [cargando, setCargando] = useState(false);
  const [completado, setCompletado] = useState(false);

  const simularEscaneo = () => {
    setCargando(true);
    setCompletado(false);
    setTimeout(() => {
      setCargando(false);
      setCompletado(true);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-900 text-gray-100 min-h-screen">
      <div className="flex items-center gap-2">
        <FileSearch className="text-cyan-400" />
        <h1 className="text-2xl font-bold">Escáner OCR de Recibos</h1>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl border border-dashed border-slate-600 text-center space-y-4">
        <Upload className="mx-auto text-gray-400" size={48} />
        <div>
          <p className="font-semibold">Arrastra tu factura de luz o selecciona un archivo</p>
          <p className="text-sm text-gray-400">Soporta formatos JPG, PNG o PDF</p>
        </div>
        <button 
          onClick={simularEscaneo}
          disabled={cargando}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-all"
        >
          {cargando ? "Analizando imagen con IA..." : "Simular Análisis OCR"}
        </button>
      </div>

      {completado && (
        <div className="bg-slate-800 p-5 rounded-xl border border-emerald-500/50 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle size={20} />
            <span>Datos Extraídos Exitosamente</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-2">
            <div><span className="text-gray-400 block">Consumo Detected:</span> <strong className="text-base">391 kWh</strong></div>
            <div><span className="text-gray-400 block">Total a Pagar:</span> <strong className="text-base text-amber-400">$63.15 USD</strong></div>
            <div><span className="text-gray-400 block">Periodo:</span> <strong>Junio 2026</strong></div>
            <div><span className="text-gray-400 block">N° Comercial:</span> <strong>1098234-2</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}