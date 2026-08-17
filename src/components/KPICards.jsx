// src/components/KPICards.jsx
import React from 'react';
import { Zap, Gauge, Flame, DollarSign } from 'lucide-react';

export default function KPICards({ data }) {
  // Mantenemos exactamente tus props/variables de datos
  const potencia = data?.watts ?? '951.9 W';
  const voltaje = data?.volts ?? '120.1 V';
  const corriente = data?.amps ?? '7.93 A';
  const costo = data?.costo ?? '$18.25';

  const kpis = [
    {
      title: 'Potencia Actual',
      value: potencia,
      icon: Zap,
      accent: 'text-amber-400',
      bgIcon: 'bg-amber-500/10 border-amber-500/20',
      glow: 'group-hover:border-amber-500/40',
    },
    {
      title: 'Voltaje RMS',
      value: voltaje,
      icon: Gauge,
      accent: 'text-sky-400',
      bgIcon: 'bg-sky-500/10 border-sky-500/20',
      glow: 'group-hover:border-sky-500/40',
    },
    {
      title: 'Corriente',
      value: corriente,
      icon: Flame,
      accent: 'text-rose-400',
      bgIcon: 'bg-rose-500/10 border-rose-500/20',
      glow: 'group-hover:border-rose-500/40',
    },
    {
      title: 'Costo Proyectado',
      value: costo,
      icon: DollarSign,
      accent: 'text-emerald-400',
      bgIcon: 'bg-emerald-500/10 border-emerald-500/20',
      glow: 'group-hover:border-emerald-500/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className={`group bg-[#151921] border border-[#262C36] ${kpi.glow} rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {kpi.title}
              </span>
              <div className={`p-2.5 rounded-xl border ${kpi.bgIcon} transition-transform group-hover:scale-110`}>
                <Icon className={`w-4 h-4 ${kpi.accent}`} />
              </div>
            </div>
            <div className="text-2xl font-black text-white tracking-tight">
              {kpi.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}