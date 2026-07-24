// src/components/PowerChart.jsx
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { mockHistoryData } from '../data/mockTelemetry';

export default function PowerChart() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-100">
            Consumo de Potencia Activa (Watts)
          </h2>
          <p className="text-xs text-slate-400">
            Historial continuo procesado por el ESP32
          </p>
        </div>
        <span className="text-xs font-mono bg-[#4FCFC6]/10 text-[#4FCFC6] px-3 py-1 rounded-full border border-[#4FCFC6]/30">
          En Vivo
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockHistoryData}>
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FCFC6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#4FCFC6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} unit="W" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#334155', 
                borderRadius: '0.75rem', 
                color: '#f8fafc' 
              }}
              itemStyle={{ color: '#4FCFC6' }}
            />
            <Area 
              type="monotone" 
              dataKey="power" 
              stroke="#4FCFC6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#powerGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}