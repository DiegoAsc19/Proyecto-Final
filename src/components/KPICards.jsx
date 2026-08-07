// src/components/KPICards.jsx
import React from 'react';
import { Zap, Gauge, Flame, DollarSign } from 'lucide-react';

export default function KPICards({ telemetry = {} }) {
  const powerW = telemetry?.power_w ?? 945.8;
  const voltageV = telemetry?.voltage_v ?? 120.4;
  const currentA = telemetry?.current_a ?? 7.85;
  const projectedCost = 18.25;

  const cardData = [
    {
      id: 'power',
      label: 'Potencia Actual',
      value: `${powerW.toFixed(1)} W`,
      icon: Zap,
      iconBg: 'bg-[#3D321D]',
      iconColor: 'text-[#E5A93C]',
    },
    {
      id: 'voltage',
      label: 'Voltaje RMS',
      value: `${voltageV.toFixed(1)} V`,
      icon: Gauge,
      iconBg: 'bg-[#1E2B3C]',
      iconColor: 'text-[#4A8CE8]',
    },
    {
      id: 'current',
      label: 'Corriente',
      value: `${currentA.toFixed(2)} A`,
      icon: Flame,
      iconBg: 'bg-[#3C2024]',
      iconColor: 'text-[#E85555]',
    },
    {
      id: 'cost',
      label: 'Costo Proyectado',
      value: `$${projectedCost.toFixed(2)}`,
      icon: DollarSign,
      iconBg: 'bg-[#1E382B]',
      iconColor: 'text-[#34C759]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-3"
          >
            <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-normal mb-1">{card.label}</span>
              <span className="text-2xl font-bold text-white font-sans tracking-tight block">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}