// src/pages/MonitoringView.jsx
import React from 'react';
import { Activity, Zap, Radio, AlertTriangle } from 'lucide-react';
import PowerChart from '../components/PowerChart'; // Gráfico de área temporal en vivo

export default function MonitoringView({ telemetry = {}, logs = [] }) {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Monitoreo en Tiempo Real</h1>
          <p className="text-xs text-slate-400 mt-1">
            Telemetría eléctrica RMS e instantánea transmitida desde la ESP32-S3 via MQTT/WebSockets.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#181B20] border border-[#2D323A] px-3 py-1.5 rounded-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">STREAMING ACTIVO</span>
        </div>
      </div>

      {/* Tarjetas de Medición Eléctrica Directa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Voltaje RMS */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Voltaje RMS</span>
          <div className="text-3xl font-bold text-white font-mono mt-1">
            {telemetry.voltage || '119.9'} <span className="text-sm text-slate-400 font-sans">V</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Rango normal (110V - 125V)</div>
        </div>

        {/* Corriente RMS */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Corriente RMS</span>
          <div className="text-3xl font-bold text-white font-mono mt-1">
            {telemetry.current || '7.91'} <span className="text-sm text-slate-400 font-sans">A</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Transformador de Corriente 100A</div>
        </div>

        {/* Potencia Activa */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Potencia Activa</span>
          <div className="text-3xl font-bold text-white font-mono mt-1 text-[#E5A93C]">
            {telemetry.power || '948.7'} <span className="text-sm text-slate-400 font-sans">W</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Calculado V_rms × I_rms × FP</div>
        </div>

        {/* Factor de Potencia / Frecuencia */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Factor de Potencia / Freq</span>
          <div className="text-3xl font-bold text-white font-mono mt-1">
            0.96 <span className="text-sm text-slate-400 font-sans">FP</span>
          </div>
          <div className="mt-2 text-[11px] text-[#34C759] font-mono">60.00 Hz (Red Estable)</div>
        </div>
      </div>

      {/* Gráfico en Tiempo Real de Potencia */}
      <PowerChart />

      {/* Tabla de Logs de Telemetría en Vivo */}
      <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#52C5E0]" />
            <h3 className="text-base font-semibold text-slate-200">Trazabilidad de Lecturas Instantáneas</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Intervalo: 2000ms</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#181B20] text-slate-400 uppercase tracking-wider font-semibold border-b border-[#2D323A]">
              <tr>
                <th className="p-3 rounded-l-xl">Marca de Tiempo</th>
                <th className="p-3">Potencia (W)</th>
                <th className="p-3">Voltaje (V)</th>
                <th className="p-3">Corriente (A)</th>
                <th className="p-3 rounded-r-xl">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D323A]/50 font-mono">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={index} className="hover:bg-[#181B20]/50 transition-colors">
                    <td className="p-3 text-slate-400">{log.time}</td>
                    <td className="p-3 text-amber-400 font-bold">{log.power_w} W</td>
                    <td className="p-3 text-blue-400">{log.voltage_v} V</td>
                    <td className="p-3 text-rose-400">{log.current_a} A</td>
                    <td className="p-3">
                      <span className="bg-[#1E382B] text-[#34C759] px-2 py-0.5 rounded text-[10px]">OK</span>
                    </td>
                  </tr>
                ))
              ) : (
                // Datos estáticos de ejemplo si no hay WebSocket conectado aún
                [
                  { t: '08:36:02', p: '948.7', v: '119.9', a: '7.91' },
                  { t: '08:36:00', p: '946.2', v: '119.8', a: '7.90' },
                  { t: '08:35:58', p: '951.0', v: '120.1', a: '7.92' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#181B20]/50 transition-colors">
                    <td className="p-3 text-slate-400">{item.t}</td>
                    <td className="p-3 text-[#E5A93C] font-bold">{item.p} W</td>
                    <td className="p-3 text-[#4A8CE8]">{item.v} V</td>
                    <td className="p-3 text-[#52C5E0]">{item.a} A</td>
                    <td className="p-3">
                      <span className="bg-[#1E382B] text-[#34C759] px-2 py-0.5 rounded text-[10px]">NORMAL</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}