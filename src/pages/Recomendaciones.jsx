import React from 'react';
import { Lightbulb, ShieldAlert, Zap, Leaf } from 'lucide-react';

export default function Recomendaciones() {
  const lista = [
    {
      titulo: "Horarios Pico de Tarifa",
      desc: "Evita usar electrodomésticos de alto consumo entre las 6:00 PM y 9:00 PM para reducir el cargo de potencia.",
      icono: ShieldAlert,
      color: "text-amber-500"
    },
    {
      titulo: "Ajuste de Climatización",
      desc: "Mantén el aire acondicionado a 24°C constante. Cada grado menos incrementa el consumo un 7%.",
      icono: Zap,
      color: "text-cyan-400"
    },
    {
      titulo: "Optimización por IA",
      desc: "Tus patrones indican que el fin de semana usas un 30% más de energía. Considera programar lavados en horario diurno.",
      icono: Lightbulb,
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-900 text-gray-100 min-h-screen">
      <div className="flex items-center gap-2">
        <Leaf className="text-emerald-400" />
        <h1 className="text-2xl font-bold">Recomendaciones del Sistema</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lista.map((item, index) => {
          const Icono = item.icono;
          return (
            <div key={index} className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
              <Icono className={item.color} size={32} />
              <h3 className="text-lg font-bold">{item.titulo}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}