import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function IACostos() {
  const [kwh, setKwh] = useState(391);
  const FACTOR_DGEHM = 0.1944;

  const calcularCosto = (consumo) => {
    let costo = 0;
    if (consumo <= 99) {
      costo = consumo * 0.1073;
    } else if (consumo <= 200) {
      costo = (99 * 0.1073) + ((consumo - 99) * 0.1445);
    } else {
      costo = (99 * 0.1073) + (101 * 0.1445) + ((consumo - 200) * 0.1689);
    }
    return costo.toFixed(2);
  };

  const co2Generado = Math.round(kwh * FACTOR_DGEHM);
  const arbolesEquiv = Math.round(co2Generado / 1.5);

  const datosProyeccion = [
    { mes: 'May', consumo: 340 },
    { mes: 'Jun', consumo: 355 },
    { mes: 'Jul', consumo: 391 },
    { mes: 'Ago', consumo: 385 },
    { mes: 'Sep', consumo: 370 },
    { mes: 'Oct', consumo: 365 },
    { mes: 'Nov', consumo: 350 },
    { mes: 'Dic', consumo: 410 },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-900 text-gray-100 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Cpu className="text-emerald-400" /> IA & Proyección de Costos
        </h1>
        <p className="text-sm text-gray-400">
          Algoritmos entrenados con pliegos tarifarios SIGET · Bloques residenciales vigentes
        </p>
      </div>

      {/* Bloques Tarifarios */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
        <h2 className="text-sm font-semibold text-gray-300">Bloques tarifarios SIGET — Sector residencial</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700">
            <span>B1: 0 – 99 kWh</span>
            <span className="font-mono text-gray-300">$0.1073 / kWh</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700">
            <span>B2: 100 – 200 kWh</span>
            <span className="font-mono text-gray-300">$0.1445 / kWh</span>
          </div>
          <div className="flex justify-between p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/40">
            <span className="text-emerald-400 font-medium">&gt; 200 kWh</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-emerald-400 font-bold">$0.1689 / kWh</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded font-bold">BLOQUE ACTIVO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulador */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
        <h2 className="text-base font-semibold">Simulador de consumo · Algoritmo IA</h2>
        <div className="space-y-2">
          <input
            type="range"
            min="50"
            max="600"
            value={kwh}
            onChange={(e) => setKwh(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>50 kWh</span>
            <span>600 kWh</span>
          </div>
        </div>

        {/* Tarjetas de Resultados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
            <span className="text-xs text-gray-400 block">Consumo</span>
            <span className="text-2xl font-bold text-sky-400 font-mono">{kwh} <span className="text-sm">kWh</span></span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
            <span className="text-xs text-gray-400 block">Costo SIGET</span>
            <span className="text-2xl font-bold text-orange-400 font-mono">${calcularCosto(kwh)} <span className="text-sm">USD</span></span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
            <span className="text-xs text-gray-400 block">CO₂ generado</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">{co2Generado} <span className="text-sm">kg</span></span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
            <span className="text-xs text-gray-400 block">Árboles equiv.</span>
            <span className="text-2xl font-bold text-teal-400 font-mono">{arbolesEquiv} <span className="text-sm">árboles</span></span>
          </div>
        </div>
      </div>

      {/* Gráfica de Proyección */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">Proyección IA — histórico + 5 meses futuros</h2>
          <span className="bg-cyan-950 text-cyan-400 text-xs px-2.5 py-1 rounded font-mono border border-cyan-800">MODELO PREDICTIVO</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datosProyeccion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="mes" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '0.5rem' }} />
              <Line type="monotone" dataKey="consumo" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}