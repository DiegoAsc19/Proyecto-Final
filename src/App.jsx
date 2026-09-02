// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CarbonView from './components/CarbonView';
import MonitoringView from './components/MonitoringView';
import DashboardView from './pages/DashboardView';
import AlertBanner from './components/AlertBanner';
import SettingsModal from './components/SettingsModal';
import IACostos from './pages/IACostos';
import Recomendaciones from './pages/Recomendaciones';
import OCRRecibos from './pages/OCRRecibos';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [telemetry, setTelemetry] = useState({
    potencia_kw: 0,
    power_w: 0,
    power: 0,
    voltaje: 120,
    voltage_v: 120,
    voltage: 120,
    corriente: 0,
    current_a: 0,
    current: 0,
    factor_potencia: 0.95,
    pf: 0.95,
    frecuencia: 60,
    frequency: 60,
    ip_address: '192.168.1.105',
    last_update: 'Iniciando...',
  });

  const [logs, setLogs] = useState([]);
  const [powerThreshold, setPowerThreshold] = useState(1500);
  const [ipAddress, setIpAddress] = useState('192.168.1.105');
  const [isSimulation, setIsSimulation] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchTelemetry = async () => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      if (isSimulation) {
        const randomPower = +(Math.random() * 4 + 1.5).toFixed(1);
        const randomVoltage = +(120 + Math.random() * 1.5 - 0.75).toFixed(1);
        const randomCurrent = +(randomPower / randomVoltage).toFixed(2);
        const powerKw = +(randomPower / 1000).toFixed(4);

        const simTelemetry = {
          dispositivo_id: 1,
          device_id: 'ESP32-S3-SIM',
          ip_address: ipAddress,
          potencia_kw: powerKw,
          power_w: randomPower,
          power: randomPower,
          voltaje: randomVoltage,
          voltage_v: randomVoltage,
          voltage: randomVoltage,
          corriente: randomCurrent,
          current_a: randomCurrent,
          current: randomCurrent,
          factor_potencia: 0.96,
          pf: 0.96,
          frecuencia: 60,
          frequency: 60,
          last_update: timeStr,
        };

        setTelemetry(simTelemetry);

        // Agrega un nuevo registro al historial
        setLogs((prev) => [
          ...prev.slice(-14),
          {
            time: timeStr,
            power_w: randomPower,
            power: randomPower,
            voltage_v: randomVoltage,
            voltaje: randomVoltage,
            current_a: randomCurrent,
            corriente: randomCurrent,
            potencia_kw: powerKw,
          },
        ]);
        return;
      }

      // MODO REAL
      try {
        const response = await fetch('http://localhost:3001/api/telemetria/actual');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();

        if (data) {
          const realPowerKw = parseFloat(data.potencia_kw ?? data.power_kw ?? 0);
          const rawPowerW = parseFloat(data.power ?? data.power_w ?? 0);
          const realPowerW = realPowerKw > 0 ? +(realPowerKw * 1000).toFixed(1) : rawPowerW;
          const realVoltage = parseFloat(data.voltaje ?? data.voltage ?? 0);
          const realCurrent = parseFloat(data.corriente ?? data.current ?? 0);

          const newTelemetry = {
            dispositivo_id: data.dispositivo_id || 1,
            device_id: `ESP32-S3-${data.dispositivo_id || 1}`,
            ip_address: ipAddress,
            potencia_kw: realPowerKw > 0 ? realPowerKw : +(realPowerW / 1000).toFixed(4),
            power_w: realPowerW,
            power: realPowerW,
            voltaje: realVoltage,
            voltage_v: realVoltage,
            voltage: realVoltage,
            corriente: realCurrent,
            current_a: realCurrent,
            current: realCurrent,
            factor_potencia: parseFloat(data.factor_potencia ?? 0.95),
            pf: parseFloat(data.factor_potencia ?? 0.95),
            frecuencia: parseFloat(data.frecuencia ?? 60),
            frequency: parseFloat(data.frecuencia ?? 60),
            last_update: data.fecha_hora ? new Date(data.fecha_hora).toLocaleTimeString() : timeStr,
          };

          setTelemetry(newTelemetry);
          setLogs((prev) => [
            ...prev.slice(-14),
            {
              time: timeStr,
              power_w: realPowerW,
              power: realPowerW,
              voltage_v: realVoltage,
              voltaje: realVoltage,
              current_a: realCurrent,
              corriente: realCurrent,
              potencia_kw: newTelemetry.potencia_kw,
            },
          ]);
        }
      } catch (err) {
        // En modo real sin conexión, vaciamos el historial para mostrar 0
        setTelemetry({
          potencia_kw: 0,
          power_w: 0,
          power: 0,
          voltaje: 0,
          voltage_v: 0,
          voltage: 0,
          corriente: 0,
          current_a: 0,
          current: 0,
          factor_potencia: 0,
          pf: 0,
          frecuencia: 0,
          frequency: 0,
          ip_address: ipAddress,
          last_update: 'Sin Conexión Real',
        });
        setLogs([]);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, [isSimulation, ipAddress]);

  return (
    <div className="flex h-screen bg-[#15181C] text-slate-100 font-sans antialiased overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto relative">
        {(activeTab === 'dashboard' || activeTab === 'monitoring' || activeTab === 'monitoreo') && (
          <div className="mb-6">
            <AlertBanner 
              powerW={telemetry?.power_w || 0} 
              threshold={powerThreshold} 
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>
        )}

        {activeTab === 'dashboard' && <DashboardView telemetry={telemetry} logs={logs} />}
        {(activeTab === 'monitoring' || activeTab === 'monitoreo') && (
          <MonitoringView telemetry={telemetry} logs={logs} />
        )}
        {activeTab === 'carbon' && <CarbonView telemetry={telemetry} logs={logs} />}
        {activeTab === 'costos' && <IACostos />}
        {activeTab === 'ocr' && <OCRRecibos />}
        {activeTab === 'recomendaciones' && <Recomendaciones />}

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