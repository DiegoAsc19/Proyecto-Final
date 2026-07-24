// src/components/CarbonView.jsx
import React, { useState } from 'react';
import { Leaf, Calculator, Cloud } from 'lucide-react';
import KPICards from './KPICards';

export default function CarbonView({ telemetry = {} }) {
  const initialTariff = telemetry?.dgehm_factor || 0.38;
  const [customTariff, setCustomTariff] = useState(initialTariff);
  const [customDgehm, setCustomDgehm] = useState(0.38);
  const [dailyHours, setDailyHours] = useState(8);

  const powerW = telemetry?.power_w || 0;
  const currentKw = powerW / 1000;
  const dailyKwh = currentKw * dailyHours;
  const monthlyKwh = dailyKwh * 30;
  
  const monthlyCost = (monthlyKwh * customTariff).toFixed(2);
  const monthlyCo2 = (monthlyKwh * customDgehm).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Banner Principal */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#4FCF86]" /> Cálculo de Huella de Carbono
          </h2>
          <div className="text-4xl font-black text-[#4FCF86] font-mono my-2">
            {monthlyCo2} <span className="text-2xl font-semibold text-slate-300">kg CO₂ / mes</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Estimación de emisiones mensuales proyectada con la potencia actual ({powerW} W) operando {dailyHours}h diarias.
          </p>
        </div>

        <div className="p-4 bg-[#4FCF86]/10 rounded-2xl border border-[#4FCF86]/20 flex items-center justify-center">
          <Cloud className="w-12 h-12 text-[#4FCF86]" />
        </div>
      </div>

      {/* Calculadora */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-[#4F98CF]" />
          <h3 className="text-sm font-bold text-slate-200">
            Calculadora Interactiva de Tarifas e Impacto
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Tarifa Eléctrica ($ / kWh)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
              <input
                type="number"
                step="0.01"
                value={customTariff}
                onChange={(e) => setCustomTariff(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-[#4F98CF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Factor DGEHM (kg CO₂ / kWh)
            </label>
            <input
              type="number"
              step="0.01"
              value={customDgehm}
              onChange={(e) => setCustomDgehm(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-[#4FCF86]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Uso Estimado (Horas / Día)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={dailyHours}
              onChange={(e) => setDailyHours(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-[11px] text-slate-500 block">Consumo Mensual Proyectado</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{monthlyKwh.toFixed(1)} kWh</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Costo Proyectado Mensual</span>
            <span className="text-lg font-bold font-mono text-[#4FCF86]">${monthlyCost}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Emisión Mensual CO₂</span>
            <span className="text-lg font-bold font-mono text-rose-400">{monthlyCo2} kg</span>
          </div>
        </div>
      </div>

      <KPICards data={telemetry} />
    </div>
  );
}