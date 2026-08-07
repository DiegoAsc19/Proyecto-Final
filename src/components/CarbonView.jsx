// src/pages/DashboardView.jsx
import React from 'react';
import { 
  Zap, 
  DollarSign, 
  Activity, 
  Cpu, 
  TrendingUp, 
  Wifi, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const weeklyData = [
  { day: 'Lun', kwh: 4.8 },
  { day: 'Mar', kwh: 5.2 },
  { day: 'Mié', kwh: 6.1 },
  { day: 'Jue', kwh: 5.9 },
  { day: 'Vie', kwh: 7.3 },
  { day: 'Sáb', kwh: 8.0 },
  { day: 'Dom', kwh: 6.5 },
];

export default function DashboardView() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Dashboard Principal</h1>
        <p className="text-xs text-slate-400 mt-1">
          Resumen acumulado del mes, estado del nodo IoT y comportamiento semanal.
        </p>
      </div>

      {/* KPI Cards Ejecutivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Consumo Mensual */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Consumo del Mes</span>
            <div className="text-2xl font-bold text-white font-mono">148.5 <span className="text-sm font-sans text-slate-400">kWh</span></div>
            <span className="text-[11px] text-[#34C759] flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> -4.2% vs mes anterior
            </span>
          </div>
          <div className="p-3 bg-[#1E2B3C] text-[#4A8CE8] rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Costo Acumulado */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Gasto Estimado</span>
            <div className="text-2xl font-bold text-white font-mono">$56.43 <span className="text-xs text-slate-400 font-sans">USD</span></div>
            <span className="text-[11px] text-slate-400">Tarifa DGEHM: $0.38/kWh</span>
          </div>
          <div className="p-3 bg-[#1E382B] text-[#34C759] rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Carga Activa */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Potencia Actual</span>
            <div className="text-2xl font-bold text-white font-mono">948.7 <span className="text-sm font-sans text-slate-400">W</span></div>
            <span className="text-[11px] text-[#E5A93C]">Carga Media-Alta</span>
          </div>
          <div className="p-3 bg-[#3D321D] text-[#E5A93C] rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Estado Dispositivo */}
        <div className="p-5 bg-[#22262B] border border-[#2D323A] rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Nodo Principal</span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              ESP32-S3
              <span className="text-[10px] bg-[#1E382B] text-[#34C759] font-mono px-2 py-0.5 rounded-full">ONLINE</span>
            </div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-[#34C759]" /> RSSI: -62 dBm
            </span>
          </div>
          <div className="p-3 bg-[#1D333D] text-[#52C5E0] rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Gráfico Semanal + Panel Hardware */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Barras por Día */}
        <div className="lg:col-span-2 p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Consumo Diario de la Semana (kWh)</h3>
              <p className="text-xs text-slate-400">Total acumulado por jornada</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Meta: 8.0 kWh/día</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D323A" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#181B20' }}
                  contentStyle={{
                    backgroundColor: '#181B20',
                    borderColor: '#2D323A',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="kwh" fill="#4A8CE8" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumen del Dispositivo Hardware */}
        <div className="p-6 bg-[#22262B] border border-[#2D323A] rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100 mb-1">Detalles del Hardware</h3>
            <p className="text-xs text-slate-400 mb-4">Parámetros operativos del microcontrolador</p>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#2D323A]">
                <span className="text-slate-400">Sensor SCT-013:</span>
                <span className="font-mono text-slate-200">100A / 50mA</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#2D323A]">
                <span className="text-slate-400">Módulo AC Voltaje:</span>
                <span className="font-mono text-slate-200">ZMPT101B</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#2D323A]">
                <span className="text-slate-400">Tiempo de Actividad:</span>
                <span className="font-mono text-slate-200">14 días, 6 hrs</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#2D323A]">
                <span className="text-slate-400">Frecuencia Muestreo:</span>
                <span className="font-mono text-slate-200">1000 Hz</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#181B20] border border-[#2D323A] rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#34C759] shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-slate-200">Calibración Correcta</span>
              <p className="text-slate-400 text-[11px]">Cero absoluto y offset estables.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}