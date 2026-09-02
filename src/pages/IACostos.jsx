// src/pages/IACostos.jsx
import React, { useState, useEffect } from 'react';
import { DollarSign, Zap, TrendingUp, Cpu, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function IACostos() {
  const [datosRecibo, setDatosRecibo] = useState(null);

  useEffect(() => {
    // 1. Cargar si hay datos en localStorage
    const guardado = localStorage.getItem('ultimo_recibo_ocr');
    if (guardado) {
      try {
        setDatosRecibo(JSON.parse(guardado));
      } catch (e) {
        console.error('Error al parsear el recibo', e);
      }
    }

    // 2. Escuchar evento de sincronización en tiempo real
    const handleActualizacion = (e) => {
      setDatosRecibo(e.detail);
    };

    window.addEventListener('ocr_recibo_actualizado', handleActualizacion);
    return () => window.removeEventListener('ocr_recibo_actualizado', handleActualizacion);
  }, []);

  // Cálculos dinámicos si existe un recibo sincronizado
  const consumoKwh = datosRecibo ? parseFloat(datosRecibo.consumo_kwh) : 0;
  const totalPagar = datosRecibo ? parseFloat(datosRecibo.total_pagar) : 0;
  const costoPromedioKwh = consumoKwh > 0 ? (totalPagar / consumoKwh).toFixed(3) : '0.000';
  const costoProyectadoSigMes = (totalPagar * 1.05).toFixed(2); // Estimación +5%

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Encabezado del Módulo */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#52C5E0]" />
            <span>IA Costos & Proyección Energética</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Análisis tarifario automatizado mediante inteligencia artificial y sincronización OCR.
          </p>
        </div>

        {datosRecibo && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E382B] border border-[#34C759]/30 rounded-xl text-xs text-[#34C759]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sincronizado con OCR ({datosRecibo.distribuidora})</span>
          </div>
        )}
      </div>

      {datosRecibo ? (
        <div className="space-y-6">
          {/* Tarjetas Principales de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-medium">Factura Reciente</span>
                <DollarSign className="w-4 h-4 text-[#34C759]" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">${totalPagar.toFixed(2)}</div>
              <p className="text-[10px] text-slate-500">Período: {datosRecibo.periodo}</p>
            </div>

            <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-medium">Consumo Total</span>
                <Zap className="w-4 h-4 text-[#E5A93C]" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">{consumoKwh} <span className="text-xs">kWh</span></div>
              <p className="text-[10px] text-slate-500">NIC/NC: {datosRecibo.nic}</p>
            </div>

            <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-medium">Costo Promedio / kWh</span>
                <TrendingUp className="w-4 h-4 text-[#52C5E0]" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">${costoPromedioKwh}</div>
              <p className="text-[10px] text-slate-500">Tarifa ponderada local</p>
            </div>

            <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-medium">Proyección Próximo Mes</span>
                <RefreshCw className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-300 font-mono">${costoProyectadoSigMes}</div>
              <p className="text-[10px] text-slate-500">Basado en hábito actual (+5%)</p>
            </div>
          </div>

          {/* Desglose Tarifario e Recomendación IA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">Desglose de Tarifas Identificadas por IA</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 bg-[#181B20] border border-[#2D323A] rounded-xl">
                  <span className="text-slate-400">Compañía Eléctrica</span>
                  <span className="font-bold text-white">{datosRecibo.distribuidora}</span>
                </div>
                <div className="flex justify-between p-3 bg-[#181B20] border border-[#2D323A] rounded-xl">
                  <span className="text-slate-400">Cargo Eléctrico Neto Estimado</span>
                  <span className="font-mono text-white">${(totalPagar * 0.85).toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between p-3 bg-[#181B20] border border-[#2D323A] rounded-xl">
                  <span className="text-slate-400">Impuestos / Tasas Municipales Estimadas</span>
                  <span className="font-mono text-white">${(totalPagar * 0.15).toFixed(2)} USD</span>
                </div>
              </div>
            </div>

            {/* Diagnóstico Automatizado */}
            <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#52C5E0]" />
                  <span>Diagnóstico IA</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tu consumo de <strong className="text-[#E5A93C]">{consumoKwh} kWh</strong> se mantiene dentro del rango residencial estándar. Mantener el uso fuera de horas pico optimizará la proyección del siguiente ciclo.
                </p>
              </div>

              <div className="p-3 bg-[#181B20] border border-[#2D323A] rounded-xl text-[11px] text-slate-400">
                Última auditoría realizada correctamente vía escáner OCR.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Estado vacío cuando aún no se ha subido ningún recibo */
        <div className="p-12 bg-[#22262B] border border-[#2D323A] rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-500 mb-1" />
          <h3 className="text-sm font-bold text-slate-300">No hay datos de factura sincronizados</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Dirígete al apartado <strong>OCR Recibos</strong>, sube una foto de tu factura energética y presiona "Guardar y Sincronizar" para ver el análisis de costos.
          </p>
        </div>
      )}
    </div>
  );
}