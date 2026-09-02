// src/components/MonitoringView.jsx (o src/pages/MonitoringView.jsx)
import React from 'react';
import { Activity, Zap, Radio, AlertTriangle } from 'lucide-react';
import PowerChart from '../components/PowerChart';

export default function MonitoringView({ telemetry = {}, logs = [] }) {
  // Mapeo de variables admitiendo ambos formatos (Español del backend e Inglés)
  const voltaje = telemetry.voltaje ?? telemetry.voltage_v ?? telemetry.voltage ?? 0;
  const corriente = telemetry.corriente ?? telemetry.current_a ?? telemetry.current ?? 0;
  
  // Convierte potencia_kw (kW) a Watts (W) si viene del backend
  const potenciaWatts = telemetry.potencia_kw !== undefined 
    ? (telemetry.potencia_kw * 1000).toFixed(1) 
    : (telemetry.power_w ?? telemetry.power ?? 0);

  const factorPotencia = telemetry.factor_potencia ?? telemetry.pf ?? 0.95;
  const frecuencia = telemetry.frecuencia ?? telemetry.frequency ?? 60;

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Monitoreo en Tiempo Real</h1>
          <p className="text-xs text-slate-400 mt-1">
            Telemetría eléctrica RMS e instantánea transmitida desde la ESP32-S3 via API REST.
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
            {voltaje} <span className="text-sm text-slate-400 font-sans">V</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Rango normal (110V - 125V)</div>
        </div>

        {/* Corriente RMS */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Corriente RMS</span>
          <div className="text-3xl font-bold text-white font-mono mt-1">
            {corriente} <span className="text-sm text-slate-400 font-sans">A</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Transformador de Corriente 100A</div>
        </div>

        {/* Potencia Activa */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Potencia Activa</span>
          <div className="text-3xl font-bold text-white font-mono mt-1 text-[#E5A93C]">
            {potenciaWatts} <span className="text-sm text-slate-400 font-sans">W</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Calculado V_rms × I_rms × FP</div>
        </div>

        {/* Factor de Potencia / Frecuencia */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl">
          <span className="text-xs font-medium text-slate-400">Factor de Potencia / Freq</span>
          <div className="text-3xl font-bold text-white font-mono mt-1">
            {factorPotencia} <span className="text-sm text-slate-400 font-sans">FP</span>
          </div>
          <div className="mt-2 text-[11px] text-[#34C759] font-mono">{frecuencia}.00 Hz (Red Estable)</div>
        </div>
      </div>

      {/* Gráfico en Tiempo Real de Potencia enviándole la telemetría e historial */}
      <PowerChart logs={logs} telemetry={telemetry} />

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
                logs.map((log, index) => {
                  const pW = log.power_w ?? log.power ?? (log.potencia_kw ? log.potencia_kw * 1000 : 0);
                  const vV = log.voltage_v ?? log.voltaje ?? 0;
                  const cA = log.current_a ?? log.corriente ?? 0;

                  return (
                    <tr key={index} className="hover:bg-[#181B20]/50 transition-colors">
                      <td className="p-3 text-slate-400">{log.time}</td>
                      <td className="p-3 text-amber-400 font-bold">{parseFloat(pW).toFixed(1)} W</td>
                      <td className="p-3 text-blue-400">{vV} V</td>
                      <td className="p-3 text-rose-400">{cA} A</td>
                      <td className="p-3">
                        <span className="bg-[#1E382B] text-[#34C759] px-2 py-0.5 rounded text-[10px]">OK</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="hover:bg-[#181B20]/50 transition-colors">
                  <td className="p-3 text-slate-400">En Vivo</td>
                  <td className="p-3 text-[#E5A93C] font-bold">{potenciaWatts} W</td>
                  <td className="p-3 text-[#4A8CE8]">{voltaje} V</td>
                  <td className="p-3 text-[#52C5E0]">{corriente} A</td>
                  <td className="p-3">
                    <span className="bg-[#1E382B] text-[#34C759] px-2 py-0.5 rounded text-[10px]">ONLINE</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}