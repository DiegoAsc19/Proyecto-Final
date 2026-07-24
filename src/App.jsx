// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import KPICards from './components/KPICards';
import PowerChart from './components/PowerChart';
import { mockLiveTelemetry } from './data/mockTelemetry';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans antialiased overflow-hidden">
      {/* Menú Lateral */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Área Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">
            {activeTab === 'dashboard' && 'Dashboard Principal'}
            {activeTab === 'monitoring' && 'Monitoreo en Tiempo Real'}
            {activeTab === 'carbon' && 'Huella Ecológica'}
          </h1>
          <p className="text-sm text-slate-400">
            Sistema de telemetría y auditoría de potencia para {mockLiveTelemetry.device_id}
          </p>
        </header>

        {/* Vistas */}
        {activeTab === 'dashboard' && (
          <div>
            <KPICards data={mockLiveTelemetry} />
            <PowerChart />
          </div>
        )}
      </main>
    </div>
  );
}