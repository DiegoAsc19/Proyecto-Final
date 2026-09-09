// src/components/PowerChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function PowerChart({ data, logs = [], telemetry = {} }) {
  // Acepta 'data' (usado en Dashboard) o 'logs' (usado en Monitoreo)
  const sourceLogs = data || logs;

  // Si no hay arreglo de lecturas pero sí telemetría activa, crea un punto en tiempo real
  const rawData = sourceLogs.length > 0 
    ? sourceLogs 
    : (telemetry.power_w !== undefined || telemetry.potencia_kw !== undefined ? [telemetry] : []);

  // Mapea los datos reales o simulados para formatear Watts y Hora
  const chartData = rawData.map((item) => {
    let powerInWatts = 0;

    if (item.power_w !== undefined && item.power_w !== null) {
      powerInWatts = item.power_w;
    } else if (item.potencia_kw !== undefined && item.potencia_kw !== null) {
      powerInWatts = item.potencia_kw * 1000;
    } else if (item.power !== undefined && item.power !== null) {
      powerInWatts = item.power;
    }

    const timeLabel = item.time 
      || item.last_update
      || (item.fecha ? new Date(item.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'En Vivo');

    return {
      time: timeLabel,
      power: Number(parseFloat(powerInWatts).toFixed(1)),
    };
  });

  return (
    <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Histórico de Potencia (W)</h3>
          <p className="text-xs text-slate-400">Consumo registrado en las últimas lecturas</p>
        </div>
        <span className="text-xs font-mono text-[#52C5E0] bg-[#1D333D] px-3 py-1 rounded-xl">
          En vivo
        </span>
      </div>

      <div className="h-64 w-full pt-4">
        {chartData.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
            <span>Sin historial acumulado de lecturas</span>
            <span className="text-[10px] mt-1 text-slate-600">Conecta una carga al ESP32 para graficar en tiempo real</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E5A93C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#E5A93C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D323A" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              
              {/* Eje Y dinámico con escala mínima adaptada a motores industriales (2500W mínimo) */}
              <YAxis 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                domain={[0, (dataMax) => Math.max(Math.ceil(dataMax * 1.15), 2500)]}
                unit=" W"
              />
              
              <Tooltip
                contentStyle={{
                  backgroundColor: '#181B20',
                  borderColor: '#2D323A',
                  borderRadius: '12px',
                  color: '#F8FAFC',
                  fontSize: '12px'
                }}
                formatter={(value) => [`${value} W`, 'Potencia Activa']}
              />
              
              <Area
                type="monotone"
                dataKey="power"
                stroke="#E5A93C"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorPower)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}