// src/components/AlertBanner.jsx
import React from 'react';
import { ShieldCheck, Settings } from 'lucide-react';

export default function AlertBanner() {
  return (
    <div className="flex items-center justify-between bg-[#151921] border border-[#262C36] rounded-2xl p-4 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <span className="text-xs font-semibold text-gray-200">
          Consumo dentro del rango nominal de operación.
        </span>
      </div>

      <button className="flex items-center gap-2 bg-[#1C222D] hover:bg-[#252D3C] text-gray-300 hover:text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#262C36] transition-all">
        <Settings className="w-3.5 h-3.5 text-gray-400" />
        <span>Ajustes</span>
      </button>
    </div>
  );
}