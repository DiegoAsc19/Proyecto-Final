import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SettingsModal from './components/SettingsModal';
import { Settings } from 'lucide-react';

// Vistas / Páginas
import DashboardView from './pages/DashboardView';
import MonitoringView from './components/MonitoringView';
import IACostos from './pages/IACostos';
import OCRRecibos from './pages/OCRRecibos';
import Recomendaciones from './pages/Recomendaciones';
import OCRRecibos from './pages/OCRRecibos';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Estados vinculados con el modal de ajustes
  const [isSimulation, setIsSimulation] = useState(true);
  const [threshold, setThreshold] = useState(950);
  const [ipAddress, setIpAddress] = useState('192.168.1.105');

  const [telemetry, setTelemetry] = useState(generarTelemetriaEstable());
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Limpia o fuerza ceros si se cambia de golpe a modo Real
    if (!isSimulation) {
      setTelemetry(estadoCeroHardware);
    }

    const interval = setInterval(async () => {
      let nuevaLectura;

      if (isSimulation) {
        nuevaLectura = generarTelemetriaEstable();
      } else {
        try {
          // Intenta conectarse al ESP32 por API REST
          const res = await fetch(`http://${ipAddress}/api/telemetry`, { signal: AbortSignal.timeout(1500) });
          if (res.ok) {
            nuevaLectura = await res.json();
          } else {
            nuevaLectura = estadoCeroHardware;
          }
        } catch (error) {
          // Si falla o no responde la IP, mantiene los valores en cero
          nuevaLectura = estadoCeroHardware;
        }
      }

      setTelemetry(nuevaLectura);

      setLogs((prevLogs) => {
        const nuevoLog = {
          ...nuevaLectura,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        const updated = [nuevoLog, ...prevLogs];
        return updated.slice(0, 20);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulation, ipAddress]);

  return (
    <div className="flex h-screen bg-[#181B20] text-slate-100 overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="flex-1 p-8 overflow-y-auto relative">
        {(activeTab === 'dashboard' || activeTab === 'monitoring' || activeTab === 'monitoreo') && (
          <div className="mb-6">
            <AlertBanner 
              powerW={telemetry?.power_w || 0} 
              threshold={powerThreshold} 
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
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
      </div>

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

export default App;