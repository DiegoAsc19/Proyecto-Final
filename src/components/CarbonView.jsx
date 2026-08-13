// src/components/CarbonView.jsx
import React from 'react';
import { Leaf, Zap, TreePine, Car, ShieldCheck, TrendingDown, Target, Lightbulb, Clock } from 'lucide-react';

export default function CarbonView({ telemetry }) {
  // Potencia actual desde la telemetría
  const currentPowerW = telemetry?.power_w || 948.7;
  
  // Cálculos dinámicos
  const monthlyKwh = +(148.5 + (currentPowerW - 940) * 0.05).toFixed(1);
  const CO2_FACTOR = 0.385; // Factor DGEHM El Salvador
  
  const co2EmittedKg = +(monthlyKwh * CO2_FACTOR).toFixed(1);
  const treesNeeded = Math.ceil(co2EmittedKg / 1.64);
  const carKmEquivalent = Math.round(co2EmittedKg * 4.1);

  // Datos simulados del histórico semanal de CO2 (kg/día)
  const weeklyData = [
    { day: 'Lun', co2: 1.8, target: 2.0 },
    { day: 'Mar', co2: 2.1, target: 2.0 },
    { day: 'Mié', co2: 2.4, target: 2.0 },
    { day: 'Jue', co2: 2.3, target: 2.0 },
    { day: 'Vie', co2: 2.9, target: 2.0 },
    { day: 'Sáb', co2: 3.2, target: 2.0 },
    { day: 'Dom', co2: 2.6, target: 2.0 },
  ];

  const maxCo2 = Math.max(...weeklyData.map(d => d.co2));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Leaf className="w-6 h-6" />
            </div>
            Huella de Carbono e Impacto Ambiental
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Cálculo de emisiones de CO₂ a partir del consumo energético en tiempo real.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1C2026] border border-[#2D323A] rounded-xl text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Factor DGEHM (0.385 kg CO₂/kWh)</span>
        </div>
      </div>

      {/* TARJETA SUPERIOR: Cálculo con Hoja Grande */}
      <div className="bg-[#1C2026] border border-[#2D323A] rounded-2xl p-6 sm:p-8 flex items-center justify-between relative overflow-hidden shadow-lg">
        <div className="space-y-3 z-10 max-w-xl">
          <h2 className="text-slate-300 font-semibold text-lg">
            Cálculo de Huella de Carbono
          </h2>
          
          <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">
            {co2EmittedKg} <span className="text-3xl sm:text-4xl font-bold text-emerald-500">kg CO₂</span>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Emisiones estimadas acumuladas basándose en el consumo actual y el factor DGEHM regional.
          </p>
        </div>

        <div className="text-emerald-500/80 shrink-0 ml-4">
          <Leaf className="w-24 h-24 sm:w-32 sm:h-32 stroke-[1.5]" />
        </div>
      </div>

      {/* 4 TARJETAS KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Consumo Total */}
        <div className="bg-[#1C2026] p-5 rounded-2xl border border-[#2D323A] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Consumo Total</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {monthlyKwh} <span className="text-sm font-normal text-slate-400">kWh</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Acumulado estimado del mes</p>
        </div>

        {/* Emisiones CO2 */}
        <div className="bg-[#1C2026] p-5 rounded-2xl border border-[#2D323A] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Emisiones CO₂</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {co2EmittedKg} <span className="text-sm font-normal text-slate-400">kg</span>
          </div>
          <p className="text-xs text-emerald-500/80 mt-2 flex items-center gap-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5" /> Generados este mes
          </p>
        </div>

        {/* Compensación */}
        <div className="bg-[#1C2026] p-5 rounded-2xl border border-[#2D323A] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Compensación</span>
            <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl">
              <TreePine className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {treesNeeded} <span className="text-sm font-normal text-slate-400">árboles</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Para absorber el CO₂ generado</p>
        </div>

        {/* Equivalencia Auto */}
        <div className="bg-[#1C2026] p-5 rounded-2xl border border-[#2D323A] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Equivalencia Auto</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {carKmEquivalent} <span className="text-sm font-normal text-slate-400">km</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Equivalente en km recorridos</p>
        </div>
      </div>

      {/* SECCIÓN NUEVA: Gráfica de Emisiones Semanales vs Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfica de Barras Semanal */}
        <div className="lg:col-span-2 bg-[#1C2026] p-6 rounded-2xl border border-[#2D323A]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Histórico Diario de CO₂ (kg/día)</h3>
              <p className="text-xs text-slate-400">Generación de emisiones durante la semana actual</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded bg-emerald-500"></span> Emisión Real
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 bg-slate-500"></span> Meta (2.0 kg)
              </span>
            </div>
          </div>

          {/* Barras de la gráfica */}
          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-[#2D323A] relative">
            {/* Línea de meta horizontal */}
            <div className="absolute w-full border-t border-dashed border-slate-600 top-[35%] z-0"></div>

            {weeklyData.map((item) => {
              const heightPercent = Math.min(100, (item.co2 / (maxCo2 * 1.2)) * 100);
              const isOverTarget = item.co2 > item.target;

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                  <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {item.co2} kg
                  </span>
                  <div className="w-full max-w-[36px] bg-[#15181C] rounded-t-lg h-full flex items-end p-0.5">
                    <div 
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        isOverTarget ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tarjeta de Eco-Tips y Meta Mensual */}
        <div className="bg-[#1C2026] p-6 rounded-2xl border border-[#2D323A] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Acciones de Reducción Recomendadas</span>
            </div>
            
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="p-2.5 bg-[#15181C] rounded-xl border border-[#2D323A] flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Desconectar cargas vampiro nocturnas ahorraría <strong>~3.2 kg CO₂/mes</strong>.</span>
              </li>
              <li className="p-2.5 bg-[#15181C] rounded-xl border border-[#2D323A] flex items-start gap-2.5">
                <Target className="w-4 h-4 text-[#52C5E0] shrink-0 mt-0.5" />
                <span>Reducir la potencia pico en un 10% lograría la meta de impacto bajo en El Salvador.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-[#2D323A]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Progreso de Meta Verde</span>
              <span className="text-emerald-400 font-bold">78% Cumplido</span>
            </div>
            <div className="w-full bg-[#15181C] h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE NIVEL DE IMPACTO ECOLÓGICO */}
      <div className="bg-[#1C2026] p-6 rounded-2xl border border-[#2D323A]">
        <h3 className="text-base font-semibold text-white mb-1">Nivel de Impacto Ecológico</h3>
        <p className="text-xs text-slate-400 mb-4">
          Estado del nodo según los límites de emisión sustentables.
        </p>

        <div className="w-full bg-[#15181C] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#2D323A] flex gap-1">
          <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '45%' }}></div>
          <div className="h-full bg-amber-500" style={{ width: '35%' }}></div>
          <div className="h-full bg-red-500 rounded-r-full" style={{ width: '20%' }}></div>
        </div>

        <div className="flex justify-between text-xs mt-3 font-medium">
          <span className="text-emerald-400">Eficiente (&lt; 150 kWh)</span>
          <span className="text-amber-400">Moderado (150 - 300 kWh)</span>
          <span className="text-red-400">Alto (&gt; 300 kWh)</span>
        </div>
      </div>
    </div>
  );
}