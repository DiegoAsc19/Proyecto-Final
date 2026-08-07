// src/components/PowerChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockChartData = [
  { time: '08:00', power: 820 },
  { time: '09:00', power: 910 },
  { time: '10:00', power: 955 },
  { time: '11:00', power: 940 },
  { time: '12:00', power: 980 },
  { time: '13:00', power: 948.7 },
];

export default function PowerChart({ data = mockChartData }) {
  return (
    <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Histórico de Potencia (W)</h3>
          <p className="text-xs text-slate-400">Consumo registrado en las últimas horas</p>
        </div>
        <span className="text-xs font-mono text-[#52C5E0] bg-[#1D333D] px-3 py-1 rounded-xl">
          En vivo
        </span>
      </div>

      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A8CE8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4A8CE8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D323A" vertical={false} />
            <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#181B20',
                borderColor: '#2D323A',
                borderRadius: '12px',
                color: '#F8FAFC',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#4A8CE8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPower)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}