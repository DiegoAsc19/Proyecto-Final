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
import CarbonView from './components/CarbonView';

// Estado cero/desconectado para hardware real
const estadoCeroHardware = {
  dispositivo_id: 1,
  potencia_kw: 0.0,
  power_w: 0.0,
  voltaje: 0.0,
  corriente: 0.0,
  factor_potencia: 0.0,
  frecuencia: 0.0,
  timestamp: new Date().toISOString()
};

const generarTelemetriaEstable = () => {
  const voltajeBase = 120.0;
  const variacionVoltaje = (Math.random() * 0.8 - 0.4);

  const corriente = parseFloat((3.10 + (Math.random() * 0.2 - 0.1)).toFixed(2));
  const factorPotencia = 0.92;
  const voltaje = parseFloat((voltajeBase + variacionVoltaje).toFixed(1));

  const power_w = parseFloat((voltaje * corriente * factorPotencia).toFixed(1));
  const potencia_kw = parseFloat((power_w / 1000.0).toFixed(4));

  return {
    dispositivo_id: 1,
    potencia_kw: potencia_kw,
    power_w: power_w,
    voltaje: voltaje,
    corriente: corriente,
    factor_potencia: factorPotencia,
    frecuencia: 60.0,
    timestamp: new Date().toISOString()
  };
};

export function App() {
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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-4 right-6 z-10">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-xl bg-[#111418] border border-[#2D323A] text-slate-400 hover:text-white hover:bg-[#1E232B] transition-all shadow-md flex items-center gap-2 text-xs font-medium"
            title="Ajustes"
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes</span>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-6 pt-14">
          {activeTab === 'dashboard' && (
            <DashboardView 
              telemetry={telemetry} 
              logs={logs} 
              threshold={threshold}
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