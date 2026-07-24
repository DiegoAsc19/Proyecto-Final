// src/components/SettingsModal.jsx
import React from 'react';
import { X, Sliders, Cpu, Bell, Globe } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  threshold,
  setThreshold,
  ipAddress,
  setIpAddress,
  isSimulation,
  setIsSimulation,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-150">
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <Sliders className="w-5 h-5 text-[#4FCFC6]" />
            <span>Ajustes de Telemetría</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario de Configuración */}
        <div className="space-y-5 my-6 text-xs">
          {/* Umbral de Sobrecarga */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-rose-400" />
              Límite de Alerta de Sobrecarga (Watts)
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-mono focus:outline-none focus:border-[#4FCFC6]"
              placeholder="Ej. 950"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Si la lectura de potencia excede este valor, se disparará el aviso de peligro.
            </span>
          </div>

          {/* Dirección IP del ESP32 */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#4F98CF]" />
              Dirección IP del ESP32-S3
            </label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 font-mono focus:outline-none focus:border-[#4F98CF]"
              placeholder="192.168.1.105"
            />
          </div>

          {/* Modo de Operación: Simulación vs Hardware */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-[#4FCF86]" />
              <div>
                <span className="block font-semibold text-slate-200">Modo de Fuente de Datos</span>
                <span className="text-[10px] text-slate-500">
                  {isSimulation ? 'Simulador Interno Activo' : 'Conexión Directa por API REST'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSimulation(!isSimulation)}
              className={`px-3 py-1.5 rounded-lg font-bold font-mono text-[11px] transition-all ${
                isSimulation
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-[#4FCF86]/20 text-[#4FCF86] border border-[#4FCF86]/30'
              }`}
            >
              {isSimulation ? 'SIMULACIÓN' : 'ESP32 REAL'}
            </button>
          </div>
        </div>

        {/* Botón de Confirmación */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#4FCFC6] hover:bg-[#3dbbb3] text-slate-950 font-bold text-xs rounded-xl transition-colors"
        >
          Guardar y Aplicar Cambios
        </button>
      </div>
    </div>
  );
}