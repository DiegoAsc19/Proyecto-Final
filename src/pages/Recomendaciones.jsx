import React from 'react';
import { Lightbulb, PlugZap, Snowflake, Shirt } from 'lucide-react';

export default function Recomendaciones() {
  const tarjetas = [
    {
      titulo: 'Desconecta en espera',
      categoria: 'Consumo Fantasma',
      impacto: 'IMPACTO MEDIO',
      impactoColor: 'text-amber-400 bg-amber-950/50 border-amber-800',
      ahorroKwh: '-12 kWh',
      ahorroCo2: '-2.33 kg',
      icono: <PlugZap className="text-amber-400" />
    },
    {
      titulo: 'Ajusta a 24 °C',
      categoria: 'Climatización',
      impacto: 'IMPACTO ALTO',
      impactoColor: 'text-red-400 bg-red-950/50 border-red-800',
      ahorroKwh: '-25 kWh',
      ahorroCo2: '-4.86 kg',
      icono: <Snowflake className="text-sky-400" />
    },
    {
      titulo: 'Ciclos en agua fría',
      categoria: 'Lavado Inteligente',
      impacto: 'IMPACTO BAJO',
      impactoColor: 'text-emerald-400 bg-emerald-950/50 border-emerald-800',
      ahorroKwh: '-8 kWh',
      ahorroCo2: '-1.55 kg',
      icono: <Shirt className="text-emerald-400" />
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-darkBg text-gray-100 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="text-amber-400" /> Recomendaciones de Ahorro
        </h1>
        <p className="text-sm text-gray-400">
          Generadas por IA a partir de hábitos detectados en tu vivienda
        </p>
      </div>

      <div className="space-y-4">
        {tarjetas.map((item, idx) => (
          <div key={idx} className="bg-cardBg p-5 rounded-xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
                {item.icono}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.impactoColor}`}>
                    {item.impacto}
                  </span>
                  <span className="text-xs text-gray-400">{item.categoria}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-200 mt-1">{item.titulo}</h3>
              </div>
            </div>

            <div className="text-right font-mono text-sm space-x-3">
              <span className="text-emerald-400 font-bold">{item.ahorroKwh}</span>
              <span className="text-lime-400 font-bold">{item.ahorroCo2}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cardBg p-6 rounded-xl border border-gray-800 grid grid-cols-3 gap-4">
        <div>
          <span className="text-xs text-gray-400 block">kWh evitados</span>
          <span className="text-2xl font-bold text-neonGreen font-mono">45 <span className="text-sm">kWh</span></span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Ahorro USD</span>
          <span className="text-2xl font-bold text-amber-400 font-mono">$6.50 <span className="text-sm">USD</span></span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">CO₂ evitado</span>
          <span className="text-2xl font-bold text-lime-400 font-mono">8.74 <span className="text-sm">kg</span></span>
        </div>
      </div>
    </div>
  );
}