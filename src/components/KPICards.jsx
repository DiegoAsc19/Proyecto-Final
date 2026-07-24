// src/components/KPICards.jsx
import React from 'react';
import { Zap, Gauge, Flame, DollarSign } from 'lucide-react';

export default function KPICards({ data }) {
  const cards = [
    {
      id: 'power',
      title: 'Potencia Actual',
      value: `${data.power_w} W`,
      subtext: 'Lectura instantánea',
      icon: Zap,
      colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'voltage',
      title: 'Voltaje RMS',
      value: `${data.voltage_v} V`,
      subtext: 'Tensión de red',
      icon: Gauge,
      colorClass: 'text-[#4F98CF] bg-[#4F98CF]/10 border-[#4F98CF]/20',
    },
    {
      id: 'current',
      title: 'Corriente',
      value: `${data.current_a} A`,
      subtext: 'Flujo de carga',
      icon: Flame,
      colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      id: 'cost',
      title: 'Costo Proyectado',
      value: `$${data.projected_cost_usd}`,
      subtext: 'Estimado mensual',
      icon: DollarSign,
      colorClass: 'text-[#4FCF86] bg-[#4FCF86]/10 border-[#4FCF86]/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between transition-colors hover:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl border ${card.colorClass}`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold font-mono text-slate-100">
                {card.value}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}