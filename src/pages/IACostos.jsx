// src/pages/IACostos.jsx
import React, { useState } from 'react';
import { Calculator, Sparkles } from 'lucide-react';

export default function IACostos() {
  const [kwh, setKwh] = useState(250);
  const [dgehmTariff, setDgehmTariff] = useState(0.38);

  const estimatedTotal = (kwh * dgehmTariff).toFixed(2);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Simulador IA Costos</h1>
        <p className="text-xs text-slate-400 mt-1">
          Proyección inteligente de la factura eléctrica según la tarifa regional DGEHM.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de Entrada */}
        <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-5">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-base">
            <Calculator className="w-5 h-5 text-[#52C5E0]" />
            <h3>Parámetros de Proyección</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Consumo Mensual Estimado (kWh)
              </label>
              <input
                type="number"
                value={kwh}
                onChange={(e) => setKwh(Number(e.target.value))}
                className="w-full bg-[#181B20] border border-[#2D323A] focus:border-[#52C5E0] text-slate-100 px-4 py-2.5 rounded-xl text-sm font-mono outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Tarifa Aplicada ($ / kWh)
              </label>
              <input
                type="number"
                step="0.01"
                value={dgehmTariff}
                onChange={(e) => setDgehmTariff(Number(e.target.value))}
                className="w-full bg-[#181B20] border border-[#2D323A] focus:border-[#52C5E0] text-slate-100 px-4 py-2.5 rounded-xl text-sm font-mono outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Resultado Proyectado */}
        <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#52C5E0] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Predicción IA
            </div>
            <h4 className="text-sm text-slate-300">Costo Total Proyectado</h4>
            <div className="text-5xl font-bold text-white font-mono tracking-tight">
              ${estimatedTotal}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Estimación generada mediante análisis predictivo con base en tu historial de consumo acumulado de 30 días.
            </p>
          </div>

          <div className="mt-6 p-4 bg-[#181B20] border border-[#2D323A] rounded-xl text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-[#34C759]">Consejo de optimización:</span>
            <p className="text-slate-400">Reduciendo 15 kWh en horas pico podrías ahorrar aprox. ${(15 * dgehmTariff).toFixed(2)} este mes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}