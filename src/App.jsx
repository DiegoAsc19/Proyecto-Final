// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import KPICards from './components/KPICards';
import PowerChart from './components/PowerChart';
import CarbonView from './components/CarbonView';
import MonitoringView from './components/MonitoringView';
import AlertBanner from './components/AlertBanner';
import SettingsModal from './components/SettingsModal';
import { mockLiveTelemetry } from './data/mockTelemetry';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [telemetry, setTelemetry] = useState(mockLiveTelemetry || {});
  const [logs, setLogs] = useState([]);
  
  // Estados configurables
  const [powerThreshold, setPowerThreshold] = useState(950);
  const [ipAddress, setIpAddress] = useState('192.168.1.105');
  const [isSimulation, setIsSimulation] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Efecto de telemetría (Simulación vs Petición Real)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      if (isSimulation) {
        // Datos simulados
        const randomPower = +(940 + Math.random() * 30 - 10).toFixed(1);
        const randomVoltage = +(120 + Math.random() * 1.5 - 0.75).toFixed(1);
        const randomCurrent = +(randomPower / randomVoltage).toFixed(2);

        const updatedData = {
          ...mockLiveTelemetry,
          ...telemetry,
          ip_address: ipAddress,
          power_w: randomPower,
          voltage_v: randomVoltage,
          current_a: randomCurrent,
          last_update: 'Justo ahora',
        };

        setTelemetry(updatedData);

        setLogs((prev) => [
          {
            time: timeStr,
            power_w: randomPower,
            voltage_v: randomVoltage,
            current_a: randomCurrent,
          },
          ...prev.slice(0, 7),
        ]);
      } else {
        // Estructura lista para llamadas a tu Backend o ESP32 real:
        // fetch(`http://${ipAddress}/api/data`).then(res => res.json()).then(...)
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [telemetry, isSimulation, ipAddress]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Encabezado con Botón de Ajustes */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">
              {activeTab === 'dashboard' && 'Dashboard Principal'}
              {activeTab === 'monitoring' && 'Monitoreo en Tiempo Real'}
              {activeTab === 'carbon' && 'Huella Ecológica'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sistema de telemetría y auditoría de potencia para {telemetry?.device_id || 'ESP32-S3'}
            </p>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl text-slate-300 transition-colors"
          >
            <Settings className="w-4 h-4 text-[#4FCFC6]" /> Ajustes
          </button>
        </header>

        {/* Banner de alerta dinámico */}
        <AlertBanner powerW={telemetry?.power_w || 0} threshold={powerThreshold} />

        {/* Vistas */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <KPICards data={telemetry} />
            <PowerChart />
          </div>
        )}

        {activeTab === 'monitoring' && (
          <MonitoringView telemetry={telemetry} logs={logs} />
        )}

        {activeTab === 'carbon' && <CarbonView telemetry={telemetry} />}

        {/* Modal de Configuración */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          threshold={powerThreshold}
          setThreshold={setPowerThreshold}
          ipAddress={ipAddress}
          setIpAddress={setIpAddress}
          isSimulation={isSimulation}
          setIsSimulation={setIsSimulation}
        />
      </main>
    </div>
  );
}