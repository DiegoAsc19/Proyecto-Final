// src/pages/DashboardView.jsx
import React from 'react';
import KPICards from '../components/KPICards';
import PowerChart from '../components/PowerChart';
import CarbonView from '../components/CarbonView';

export default function DashboardView({ telemetry }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
          Dashboard Principal
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitoreo general de potencia para {telemetry?.device_id || 'ESP32-S3'}.
        </p>
      </div>

      {/* Tarjetas KPI de Resumen */}
      <KPICards telemetry={telemetry} />

      {/* Gráfico en Tiempo Real */}
      <PowerChart />

      {/* Indicadores de Huella de Carbono */}
      <CarbonView telemetry={telemetry} />
    </div>
  );
}