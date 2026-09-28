import React from 'react';
import { 
  Tv, 
  Refrigerator, 
  Zap, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu 
} from 'lucide-react';

export default function DesgloseView({ telemetry }) {
  const potenciaActual = telemetry?.power_w || 0;
  const factorDGEHM = 0.38;

  // Clasificación por patrones de potencia
  const refrigeActiva = potenciaActual >= 120;
  const pcActiva = potenciaActual >= 180;
  const otrosActivo = potenciaActual > 0;

  const wRefri = refrigeActiva ? Math.min(150, Math.round(potenciaActual * 0.45)) : 0;
  const wPc = pcActiva ? Math.min(200, Math.round(potenciaActual * 0.40)) : 0;
  const wOtros = otrosActivo ? Math.max(0, Math.round(potenciaActual - wRefri - wPc)) : 0;

  const listaDispositivos = [
    {
      id: 'refri',
      nombre: 'Refrigeradora / Compresor',
      icon: Refrigerator,
      activo: refrigeActiva,
      watts: wRefri,
      costoMes: ((wRefri * 24 * 30 / 1000) * factorDGEHM).toFixed(2),
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
    },
    {
      id: 'pc',
      nombre: 'Estación de Trabajo / PC',
      icon: Tv,
      activo: pcActiva,
      watts: wPc,
      costoMes: ((wPc * 8 * 30 / 1000) * factorDGEHM).toFixed(2),
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'otros',
      nombre: 'Iluminación y Cargas Fantasma',
      icon: Zap,
      activo: otrosActivo && wOtros > 0,
      watts: wOtros,
      costoMes: ((wOtros * 6 * 30 / 1000) * factorDGEHM).toFixed(2),
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-[#111418] border border-[#1C2128] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-5 h-5 text-[#34D399]" />
            <h2 className="text-xl font-bold text-white">Desagregación de Carga (NILM)</h2>
          </div>
          <p className="text-xs text-slate-400">
            Identificación estimada de electrodomésticos según potencia instantánea.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#171B21] border border-[#2D333B] px-4 py-2.5 rounded-xl text-xs">
          <div>
            <span className="text-slate-400 block">Potencia Actual</span>
            <span className="text-lg font-bold text-[#38BDF8]">{potenciaActual} W</span>
          </div>
          <div className="h-8 w-[1px] bg-[#2D333B]" />
          <div>
            <span className="text-slate-400 block">Tarifa DGEHM</span>
            <span className="text-lg font-bold text-[#34D399]">${factorDGEHM}/kWh</span>
          </div>
        </div>
      </div>

      {/* Tarjetas de Dispositivos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listaDispositivos.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className={`bg-[#111418] border rounded-2xl p-5 flex flex-col justify-between ${
                item.activo ? item.color : 'border-[#1C2128] opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#171B21]">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1 ${
                    item.activo ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {item.activo ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {item.activo ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1">{item.nombre}</h3>
                <div className="text-2xl font-bold text-white mb-3">
                  {item.watts} <span className="text-xs text-slate-400 font-normal">Watts</span>
                </div>
              </div>

              <div className="border-t border-[#1C2128] pt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Est. Mensual</span>
                <span className="font-bold text-white">${item.costoMes}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de Distribución */}
      <div className="bg-[#111418] border border-[#1C2128] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#38BDF8]" />
            <h3 className="text-sm font-semibold text-white">Distribución en Tiempo Real</h3>
          </div>
        </div>

        <div className="w-full h-4 bg-[#171B21] rounded-full overflow-hidden flex border border-[#2D333B]">
          {potenciaActual > 0 ? (
            <>
              <div style={{ width: `${(wRefri / potenciaActual) * 100}%` }} className="bg-blue-500 h-full" />
              <div style={{ width: `${(wPc / potenciaActual) * 100}%` }} className="bg-emerald-500 h-full" />
              <div style={{ width: `${(wOtros / potenciaActual) * 100}%` }} className="bg-amber-500 h-full" />
            </>
          ) : (
            <div className="w-full text-center text-[10px] text-slate-500 my-auto">Sin carga activa</div>
          )}
        </div>
      </div>
    </div>
  );
}