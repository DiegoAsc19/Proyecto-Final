// src/components/AlertBanner.jsx
import React from 'react';
import { ShieldCheck, Settings } from 'lucide-react';

export default function AlertBanner({ powerW, threshold, onOpenSettings }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1a1d24] border border-[#2a2e37] rounded-2xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <p className="text-xs font-medium text-slate-200">
          Consumo dentro del rango nominal de operación.
        </p>
      </div>

      <button
        onClick={onOpenSettings}
        className="flex items-center gap-2 px-3.5 py-1.5 bg-[#22262B] hover:bg-[#2A2F36] border border-[#2D323A] rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
      >
        <Settings className="w-4 h-4 text-[#52C5E0]" />
        <span>Ajustes</span>
      </button>
    </div>
  );
}