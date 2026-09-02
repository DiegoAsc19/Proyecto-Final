// src/components/CarbonView.jsx
import React, { useState, useEffect } from 'react';
import { Leaf, Car, Trees, Zap } from 'lucide-react';

export default function CarbonView({ telemetry = {} }) {
  const [consumoDiario, setConsumoDiario] = useState([]);
  
  // Factor DGEHM El Salvador: 0.1944 kg CO2 por kWh
  const FACTOR_CO2 = 0.1944;

  useEffect(() => {
    const obtenerConsumo = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/consumo/diario');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setConsumoDiario(data);
        }
      } catch (error) {
        console.error("Error al obtener consumo diario:", error);
      }
    };
    obtenerConsumo();
  }, []);

  // Días por defecto para la gráfica si aún no hay lecturas suficientes en BD
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  // Potencia actual en kW (reacciona a 0 si la simulación se apaga o backend no responde)
  const potenciaKwActual = parseFloat(telemetry?.potencia_kw || 0) || (parseFloat(telemetry?.power_w || 0) / 1000);

  // Acumulados reales o calculados dinámicamente con la telemetría actual
  const totalKwh = consumoDiario.length > 0 
    ? consumoDiario.reduce((acc, item) => acc + parseFloat(item.kwh || 0), 0)
    : parseFloat((potenciaKwActual * 24).toFixed(2)); // Estimado día basado en el estado actual

  const totalCo2 = (totalKwh * FACTOR_CO2).toFixed(2);
  const arbolesEquiv = totalCo2 > 0 ? Math.max(1, Math.round(totalCo2 / 1.63)) : 0;
  const kmAutoEquiv = Math.round(totalCo2 / 0.24);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Título de la sección */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Huella de Carbono e Impacto Ambiental</h1>
        <p className="text-xs text-slate-400 mt-1">
          Emisiones estimadas acumuladas basándose en el consumo actual y el factor DGEHM regional.
        </p>
      </div>

      {/* Hero Card con la Hoja Verde Gigante */}
      <div className="relative p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl overflow-hidden flex items-center justify-between shadow-sm">
        <div className="z-10">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Cálculo de Huella de Carbono
          </span>
          <div className="text-5xl font-extrabold text-[#34C759] font-mono mt-2">
            {totalCo2} <span className="text-2xl text-slate-300 font-sans">kg CO₂</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 max-w-md">
            Emisiones estimadas acumuladas basándose en el consumo actual y el factor DGEHM regional.
          </p>
        </div>
        <Leaf className="w-36 h-36 text-[#34C759] opacity-80 absolute -right-4 -bottom-4 pointer-events-none" />
      </div>

      {/* Tarjetas Principales con Iconos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Consumo Total */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase">Consumo Total</span>
            <div className="p-1.5 bg-[#1D333D] text-[#52C5E0] rounded-lg">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-mono mt-3">
            {totalKwh.toFixed(2)} <span className="text-sm text-slate-400 font-sans">kWh</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Acumulado estimado del mes</div>
        </div>

        {/* Emisiones CO2 */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase">Emisiones CO₂</span>
            <div className="p-1.5 bg-[#1E382B] text-[#34C759] rounded-lg">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#34C759] font-mono mt-3">
            {totalCo2} <span className="text-sm text-slate-400 font-sans">kg</span>
          </div>
          <div className="mt-2 text-[11px] text-[#34C759]">Generados este mes</div>
        </div>

        {/* Compensación Árboles */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase">Compensación</span>
            <div className="p-1.5 bg-[#1E382B] text-[#34C759] rounded-lg">
              <Trees className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-mono mt-3">
            {arbolesEquiv} <span className="text-sm text-slate-400 font-sans">árboles</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Para absorber el CO₂ generado</div>
        </div>

        {/* Equivalencia Auto */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase">Equivalencia Auto</span>
            <div className="p-1.5 bg-[#3B2D1D] text-[#E5A93C] rounded-lg">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-mono mt-3">
            {kmAutoEquiv} <span className="text-sm text-slate-400 font-sans">km</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Equivalente en km recorridos</div>
        </div>
      </div>

      {/* Gráfica Diaria de Barras & Acciones Recomendadas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Histórico Diario (2 Columnas) */}
        <div className="lg:col-span-2 p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Histórico Diario de CO₂ (kg/día)</h3>
              <p className="text-xs text-slate-400">Generación de emisiones durante la semana actual</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]"></span> Emisión Real
              </span>
              <span className="text-slate-500">— Meta (2.0 kg)</span>
            </div>
          </div>

          {/* Barras Visuales de la Semana */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 border-b border-[#2D323A]">
            {diasSemana.map((dia, idx) => {
              const item = consumoDiario[idx];
              const kwhDia = item ? parseFloat(item.kwh) : (potenciaKwActual > 0 ? (potenciaKwActual * 3) : 0);
              const co2Dia = kwhDia * FACTOR_CO2;
              const alturaPct = Math.min(Math.max((co2Dia / 3.0) * 100, 10), 90);

              return (
                <div key={dia} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full max-w-[36px] bg-[#181B20] rounded-t-lg relative flex items-end h-full">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        co2Dia < 1.5 ? 'bg-[#34C759]' : 'bg-[#E5A93C]'
                      }`}
                      style={{ height: `${kwhDia > 0 ? alturaPct : 5}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{dia}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel Lateral: Acciones Recomendadas y Meta Verde */}
        <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#E5A93C]" />
              <h3 className="text-base font-semibold text-slate-100">Acciones de Reducción Recomendadas</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#181B20] border border-[#2D323A] rounded-xl text-xs space-y-1">
                <p className="text-slate-300 font-medium">Desconectar cargas vampiro nocturnas</p>
                <p className="text-slate-500 text-[11px]">Ahorraría ~3.2 kg CO₂/mes.</p>
              </div>

              <div className="p-3 bg-[#181B20] border border-[#2D323A] rounded-xl text-xs space-y-1">
                <p className="text-slate-300 font-medium">Reducir la potencia pico en un 10%</p>
                <p className="text-slate-500 text-[11px]">Lograría la meta de impacto bajo en El Salvador.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400 font-medium">Progreso de Meta Verde</span>
              <span className="text-[#34C759] font-mono font-bold">
                {potenciaKwActual > 0 ? '78% Cumplido' : '100% Sin Consumo'}
              </span>
            </div>
            <div className="w-full bg-[#181B20] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#34C759] h-full rounded-full transition-all duration-500" 
                style={{ width: potenciaKwActual > 0 ? '78%' : '100%' }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Escala de Nivel de Impacto Ecológico */}
      <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-3">
        <h3 className="text-base font-semibold text-slate-100">Nivel de Impacto Ecológico</h3>
        <p className="text-xs text-slate-400">Estado del nodo según los límites de emisión sustentables.</p>

        <div className="w-full h-3 bg-[#181B20] rounded-full flex overflow-hidden">
          <div className="bg-[#34C759] h-full" style={{ width: '33%' }} />
          <div className="bg-[#E5A93C] h-full" style={{ width: '33%' }} />
          <div className="bg-[#E5484D] h-full" style={{ width: '34%' }} />
        </div>

        <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
          <span className="text-[#34C759]">Eficiente (&lt; 150 kWh)</span>
          <span className="text-[#E5A93C]">Moderado (150 - 300 kWh)</span>
          <span className="text-[#E5484D]">Alto (&gt; 300 kWh)</span>
        </div>
      </div>
    </div>
  );
}