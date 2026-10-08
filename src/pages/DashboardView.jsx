import React from 'react';
import { Zap, Activity, AlertTriangle, Cpu } from 'lucide-react';

export default function DashboardView({ telemetry, threshold = 950 }) {
  const power = telemetry?.power_w || 0;
  const isAlert = power > threshold;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Panel Principal (Dashboard)</h1>
          <p className="text-sm text-slate-400">Resumen y monitoreo de consumo energético en tiempo real</p>
        </div>
        
        {isAlert && (
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-xl text-sm animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Alerta: ¡Consumo por encima del umbral ({threshold} W)!</span>
          </div>
        )}
      </div>

      {/* Tarjetas de métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#21252B] p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Potencia Actual</p>
            <p className="text-3xl font-bold text-slate-100 mt-1">{power} <span className="text-sm font-normal text-slate-400">W</span></p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#21252B] p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Voltaje</p>
            <p className="text-3xl font-bold text-slate-100 mt-1">{telemetry?.voltage_v || 0} <span className="text-sm font-normal text-slate-400">V</span></p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#21252B] p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Corriente</p>
            <p className="text-3xl font-bold text-slate-100 mt-1">{telemetry?.current_a || 0} <span className="text-sm font-normal text-slate-400">A</span></p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#21252B] p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Frecuencia</p>
            <p className="text-3xl font-bold text-slate-100 mt-1">{telemetry?.frequency_hz || 0} <span className="text-sm font-normal text-slate-400">Hz</span></p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}