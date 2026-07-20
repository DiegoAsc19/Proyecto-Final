import React from 'react';
import { Scan, FileText, UploadCloud } from 'lucide-react';

export default function OCRRecibos() {
  return (
    <div className="p-6 space-y-6 bg-darkBg text-gray-100 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Scan className="text-sky-400" /> OCR · Digitalización de Recibos
        </h1>
        <p className="text-sm text-gray-400">
          Motor Tesseract — extrae historial de consumo desde foto del recibo físico
        </p>
      </div>

      <div className="bg-cardBg border-2 border-dashed border-gray-800 rounded-xl p-12 text-center hover:border-sky-500/50 transition cursor-pointer space-y-3">
        <div className="flex justify-center">
          <UploadCloud className="w-12 h-12 text-gray-500" />
        </div>
        <h2 className="text-base font-semibold text-gray-300">Haz clic para escanear recibo</h2>
        <p className="text-xs text-gray-500 font-mono">Formatos soportados: JPG, PNG, PDF · Tesseract v5</p>
      </div>

      <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-800 flex items-start gap-3">
        <FileText className="text-sky-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400 leading-relaxed">
          El motor OCR basado en Tesseract v5 extrae automáticamente: número de cuenta, período de facturación, consumo en kWh, monto total e historial de hasta 12 meses.
        </p>
      </div>
    </div>
  );
}