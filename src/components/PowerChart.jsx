// src/components/PowerChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const defaultData = [
  { time: '08:00', watts: 750 },
  { time: '08:05', watts: 820 },
  { time: '08:10', watts: 890 },
  { time: '08:15', watts: 940 },
  { time: '08:20', watts: 920 },
  { time: '08:25', watts: 951.9 },
];

export default function PowerChart({ chartData = defaultData }) {
  return (
    <div className="bg-[#151921] border border-[#262C36] rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Cabecera estilizada */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Histórico de Potencia (W)</h3>
          <p className="text-xs text-gray-400">Consumo registrado en las últimas horas</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0D1015] border border-[#262C36] px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase">En vivo</span>
        </div>
      </div>

      {/* Gráfico Recharts con degradado neón */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#4B5563" fontSize={11} tickLine={false} axisLine={false} domain={[0, 1200]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0D1015', 
                borderColor: '#262C36', 
                borderRadius: '12px',
                color: '#FFF',
                fontWeight: '600'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="watts" 
              stroke="#38BDF8" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#powerGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}