// src/components/AlertBanner.jsx
import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AlertBanner({ powerW, threshold = 950 }) {
  const isOverloaded = powerW > threshold;

  if (!isOverloaded) {
    return (
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-slate-400 mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#4FCF86]" />
          <span>Consumo dentro del rango nominal de operación.</span>
        </div>
        <span className="font-mono text-slate-500">Límite seguro: {threshold} W</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-between text-xs text-rose-300 mb-6 animate-pulse">
      <div className="flex items-center gap-2 font-medium">
        <AlertTriangle className="w-5 h-5 text-rose-400" />
        <span>¡ADVERTENCIA DE SOBRECARGA! La lectura actual ({powerW} W) supera el límite configurado ({threshold} W).</span>
      </div>
      <span className="font-mono text-rose-400 font-bold bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/30">
        ALERTA ACTIVA
      </span>
    </div>
  );
}