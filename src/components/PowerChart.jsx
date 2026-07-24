// src/components/PowerChart.jsx
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, TrendingUp, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Generador de datos simulados para los diferentes rangos temporales
const timeRangesData = {
  '1h': [
    { time: '10:00', power: 890, voltage: 120.1 },
    { time: '10:10', power: 910, voltage: 119.8 },
    { time: '10:20', power: 945, voltage: 120.3 },
    { time: '10:30', power: 920, voltage: 120.0 },
    { time: '10:40', power: 965, voltage: 119.5 },
    { time: '10:50', power: 940, voltage: 120.2 },
    { time: '11:00', power: 955, voltage: 120.1 },
  ],
  '24h': [
    { time: '00:00', power: 420, voltage: 121.2 },
    { time: '04:00', power: 310, voltage: 121.8 },
    { time: '08:00', power: 850, voltage: 120.0 },
    { time: '12:00', power: 980, voltage: 119.2 },
    { time: '16:00', power: 920, voltage: 119.7 },
    { time: '20:00', power: 760, voltage: 120.5 },
    { time: '23:59', power: 510, voltage: 121.0 },
  ],
  '7d': [
    { time: 'Lun', power: 780, voltage: 120.1 },
    { time: 'Mar', power: 820, voltage: 120.0 },
    { time: 'Mié', power: 910, voltage: 119.8 },
    { time: 'Jue', power: 870, voltage: 120.2 },
    { time: 'Vie', power: 950, voltage: 119.4 },
    { time: 'Sáb', power: 620, voltage: 121.1 },
    { time: 'Dom', power: 540, voltage: 121.3 },
  ],
  '30d': [
    { time: 'Sem 1', power: 740, voltage: 120.2 },
    { time: 'Sem 2', power: 810, voltage: 120.0 },
    { time: 'Sem 3', power: 890, voltage: 119.6 },
    { time: 'Sem 4', power: 830, voltage: 120.1 },
  ],
};

export default function PowerChart() {
  const [selectedRange, setSelectedRange] = useState('1h');
  const currentData = timeRangesData[selectedRange];

  // Cálculo de métricas del rango activo
  const powers = currentData.map((d) => d.power);
  const maxPower = Math.max(...powers);
  const minPower = Math.min(...powers);
  const avgPower = (powers.reduce((a, b) => a + b, 0) / powers.length).toFixed(1);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
      {/* Encabezado y Selector de Rangos */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" /> Perfil de Potencia Activa
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tendencia de consumo eléctrico registrado por el sensor
          </p>
        </div>

        {/* Botones de Rango */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
          {[
            { id: '1h', label: '1 Horas' },
            { id: '24h', label: '24 Horas' },
            { id: '7d', label: '7 Días' },
            { id: '30d', label: '30 Días' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedRange === range.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resumen rápido de métricas del rango */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-950 border border-slate-800/60 rounded-xl text-xs font-mono">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Promedio:</span>
          <span className="text-cyan-400 font-bold text-sm">{avgPower} W</span>
        </div>
        <div className="flex items-center justify-between border-x border-slate-800 px-4">
          <span className="text-slate-500 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" /> Pico Máx:
          </span>
          <span className="text-rose-400 font-bold text-sm">{maxPower} W</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" /> Mínimo:
          </span>
          <span className="text-emerald-400 font-bold text-sm">{minPower} W</span>
        </div>
      </div>

      {/* Gráfico Recharts */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: '#f8fafc',
              }}
              formatter={(value) => [`${value} W`, 'Potencia']}
            />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#powerGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}