import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SettingsModal from './components/SettingsModal';
import { WeatherWidget } from './components/WeatherWidget';
import CarbonView from './components/CarbonView';

// Vistas / Páginas
import DashboardView from './pages/DashboardView';
import MonitoringView from './components/MonitoringView';
import IACostos from './pages/IACostos';
import OCRRecibos from './pages/OCRRecibos';
import Recomendaciones from './pages/Recomendaciones';

// Funciones auxiliares de datos
const generarTelemetriaEstable = () => ({
  power_w: Math.floor(Math.random() * (120 - 80 + 1)) + 80,
  voltage_v: 120.4,
  current_a: 0.85,
  frequency_hz: 60.0
});

const estadoCeroHardware = {
  power_w: 0,
  voltage_v: 0,
  current_a: 0,
  frequency_hz: 0
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Modo simulación desactivado por defecto para leer el ESP32 real
  const [isSimulation, setIsSimulation] = useState(false);
  const [threshold, setThreshold] = useState(950);
  
  // Coloca la IP asignada a tu ESP32 por la red Wi-Fi
  const [ipAddress, setIpAddress] = useState('10.188.100.236');

  const [telemetry, setTelemetry] = useState(estadoCeroHardware);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!isSimulation) {
      setTelemetry(estadoCeroHardware);
    }

    const interval = setInterval(async () => {
      let nuevaLectura = null;

      if (isSimulation) {
        nuevaLectura = generarTelemetriaEstable();
      } else {
        try {
          // Conexión al endpoint REST del ESP32
          const res = await fetch(`http://${ipAddress}/api/telemetry`, { signal: AbortSignal.timeout(1500) });
          if (res.ok) {
            const rawData = await res.json();
            
            // Mapeo dinámico de llaves desde C++
            nuevaLectura = {
              power_w: rawData.power ?? rawData.potencia ?? 0,
              voltage_v: rawData.voltage ?? rawData.voltaje ?? 0,
              current_a: rawData.current ?? rawData.corriente ?? 0,
              frequency_hz: 60.0
            };
          }
        } catch (error) {
          // Si el ESP32 no responde o hay micro-corte, se omite el reinicio a cero
          // para mantener el último valor válido retenido en el estado.
        }
      }

      // Solo actualiza el estado si hubo una lectura exitosa o si está en simulación
      if (nuevaLectura) {
        setTelemetry(nuevaLectura);

        setLogs((prevLogs) => {
          const nuevoLog = {
            ...nuevaLectura,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          };
          const updated = [nuevoLog, ...prevLogs];
          return updated.slice(0, 20);
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulation, ipAddress]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-[#181B20] text-slate-100 overflow-x-hidden md:overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative space-y-6 w-full">
        {/* Widget del Clima */}
        <WeatherWidget />

        {/* Renderizado condicional de vistas */}
        {activeTab === 'dashboard' && (
          <DashboardView telemetry={telemetry} threshold={threshold} />
        )}
        {activeTab === 'monitoring' && (
          <MonitoringView telemetry={telemetry} logs={logs} threshold={threshold} />
        )}
        {activeTab === 'carbon' && (
          <CarbonView telemetry={telemetry} />
        )}
        {activeTab === 'ocr' && (
          <OCRRecibos />
        )}
        {activeTab === 'ia-costos' && (
          <IACostos telemetry={telemetry} />
        )}
        {activeTab === 'recomendaciones' && (
          <Recomendaciones />
        )}
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        threshold={threshold}
        setThreshold={setThreshold}
        ipAddress={ipAddress}
        setIpAddress={setIpAddress}
        isSimulation={isSimulation}
        setIsSimulation={setIsSimulation}
      />
    </div>
  );
}