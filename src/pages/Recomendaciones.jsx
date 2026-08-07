// src/pages/Recomendaciones.jsx
import React from 'react';
import { Lightbulb, Zap, ShieldAlert, CheckCircle } from 'lucide-react';

export default function Recomendaciones() {
  const tips = [
    {
      id: 1,
      title: 'Ajuste de Cargas de Alto Consumo',
      desc: 'Detectamos picos de más de 900W de manera constante. Mapea los equipos inductivos para programar su uso fuera de las horas pico.',
      tag: 'Alta Prioridad',
      tagBg: 'bg-[#3C2024]',
      tagColor: 'text-[#E85555]',
      icon: ShieldAlert,
      iconBg: 'bg-[#3C2024]',
      iconColor: 'text-[#E85555]'
    },
    {
      id: 2,
      title: 'Factor de Potencia Optimizado',
      desc: 'Tu factor de potencia promedio es 0.96, manteniéndote exento de penalizaciones por energía reactiva.',
      tag: 'Óptimo',
      tagBg: 'bg-[#1E382B]',
      tagColor: 'text-[#34C759]',
      icon: CheckCircle,
      iconBg: 'bg-[#1E382B]',
      iconColor: 'text-[#34C759]'
    },
    {
      id: 3,
      title: 'Monitoreo de Standby (Consumo Vampiro)',
      desc: 'Existen fluctuaciones de ~30W constantes durante horarios nocturnos. Desconectar dispositivos secundarios ahorrará aprox. $3.40 al mes.',
      tag: 'Sugerencia',
      tagBg: 'bg-[#3D321D]',
      tagColor: 'text-[#E5A93C]',
      icon: Zap,
      iconBg: 'bg-[#3D321D]',
      iconColor: 'text-[#E5A93C]'
    }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Plan de Recomendaciones</h1>
        <p className="text-xs text-slate-400 mt-1">
          Sugerencias automáticas para reducir tu consumo energético y optimizar tus costos de facturación.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tips.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl flex items-start gap-4"
            >
              <div className={`p-3 rounded-xl ${item.iconBg} ${item.iconColor} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-100">{item.title}</h3>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${item.tagBg} ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}