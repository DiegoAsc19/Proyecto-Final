// src/pages/OCRRecibos.jsx
import React from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function OCRRecibos() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Escáner OCR Recibos</h1>
        <p className="text-xs text-slate-400 mt-1">
          Carga tus facturas de energía para extraer automáticamente el consumo, tarifa y cargos fijos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zona de Drop/Carga */}
        <div className="p-8 bg-[#22262B] border-2 border-dashed border-[#2D323A] hover:border-slate-500 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors space-y-3">
          <div className="w-12 h-12 bg-[#1E2B3C] text-[#4A8CE8] rounded-xl flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Arrastra tu factura aquí o haz clic para subir</p>
            <p className="text-xs text-slate-400 mt-1">Formatos soportados: PDF, PNG, JPG (Max 5MB)</p>
          </div>
        </div>

        {/* Muestra de Resultado Escaneado */}
        <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D323A]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#52C5E0]" />
              <h3 className="text-sm font-semibold text-slate-200">Factura Procesada Reciente</h3>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#34C759] bg-[#1E382B] px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Verificado
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-[#2D323A]/50">
              <span className="text-slate-400">Distribuidora:</span>
              <span className="font-semibold text-slate-200">CAESS / DGEHM</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#2D323A]/50">
              <span className="text-slate-400">Consumo Registrado:</span>
              <span className="font-mono font-bold text-white">210 kWh</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#2D323A]/50">
              <span className="text-slate-400">Total a Pagar:</span>
              <span className="font-mono font-bold text-[#34C759]">$79.80</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}