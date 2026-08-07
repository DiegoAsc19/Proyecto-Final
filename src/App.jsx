// src/App.jsx (CÓDIGO COMPLETO CON LÓGICA Y DISEÑO EXACTO)
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
import IACostos from './pages/IACostos';
import Recomendaciones from './pages/Recomendaciones';
import OCRRecibos from './pages/OCRRecibos';

export default function App() {
  const [activeTab, setActiveTab] = useState('carbon'); // Pestaña inicial
  const [telemetry, setTelemetry] = useState(mockLiveTelemetry || {});
  const [logs, setLogs] = useState([]);
  
  // Estados configurables
  const [powerThreshold, setPowerThreshold] = useState(1500);
  const [ipAddress, setIpAddress] = useState('192.168.1.105');
  const [isSimulation, setIsSimulation] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Efecto de telemetría (Simulación + Lectura/Guardado en MariaDB)
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      if (isSimulation) {
        // --- MODO SIMULACIÓN ---
        // 1. Generar lectura instantánea
        const randomPower = +(940 + Math.random() * 30 - 10).toFixed(1);
        const randomVoltage = +(120 + Math.random() * 1.5 - 0.75).toFixed(1);
        const randomCurrent = +(randomPower / randomVoltage).toFixed(2);
        const powerKw = +(randomPower / 1000).toFixed(3); // Conversión a kW para MariaDB

        const updatedData = {
          ...mockLiveTelemetry,
          ...telemetry,
          ip_address: ipAddress,
          power_w: randomPower,
          voltage_v: randomVoltage,
          current_a: randomCurrent,
          last_update: 'Justo ahora',
        };

        // 2. Actualizar la interfaz visual y los logs
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

        // 3. Enviar la medición a MariaDB mediante el Backend
        try {
          await fetch('http://localhost:3001/api/telemetria', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              dispositivo_id: 1,
              potencia_kw: powerKw,
              voltaje: randomVoltage,
              corriente: randomCurrent,
              frecuencia: 60.0,
              factor_potencia: 0.96
            })
          });
        } catch (err) {
          console.error("Error guardando telemetría en BD:", err);
        }

      } else {
        // --- MODO REAL (Lectura desde MariaDB / ESP32) ---
        try {
          const response = await fetch('http://localhost:3001/api/telemetria/actual');
          const data = await response.json();

          if (data && data.potencia_kw !== undefined) {
            // Mapeo de campos de MariaDB al formato que espera el Dashboard
            const realPowerW = +(parseFloat(data.potencia_kw) * 1000).toFixed(1);
            const realVoltage = +parseFloat(data.voltaje).toFixed(1);
            const realCurrent = +parseFloat(data.corriente).toFixed(2);

            const updatedData = {
              ...mockLiveTelemetry,
              ip_address: ipAddress,
              power_w: realPowerW,
              voltage_v: realVoltage,
              current_a: realCurrent,
              frequency: parseFloat(data.frecuencia),
              pf: parseFloat(data.factor_potencia),
              last_update: new Date(data.fecha_hora).toLocaleTimeString(),
            };

            setTelemetry(updatedData);

            setLogs((prev) => [
              {
                time: timeStr,
                power_w: realPowerW,
                voltage_v: realVoltage,
                current_a: realCurrent,
              },
              ...prev.slice(0, 7),
            ]);
          }
        } catch (err) {
          console.error("Error leyendo telemetría en vivo desde BD:", err);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulation, ipAddress, telemetry]);

  return (
    // Color de fondo exacto de la interfaz de captura (#15181C)
    <div className="flex h-screen bg-[#15181C] text-slate-100 font-sans antialiased overflow-hidden">
      {/* Menú Lateral */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Ámbit de Contenido Principal */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* Botón flotante/superior de Ajustes */}
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold bg-[#22262B] border border-[#2D323A] hover:border-slate-600 px-3.5 py-2 rounded-xl text-slate-300 transition-all shadow-sm"
          >
            <Settings className="w-4 h-4 text-[#52C5E0]" />
            <span>Ajustes</span>
          </button>
        </div>

        {/* Banner de alerta */}
        {(activeTab === 'dashboard' || activeTab === 'monitoring') && (
          <div className="mb-6">
            <AlertBanner powerW={telemetry?.power_w || 0} threshold={powerThreshold} />
          </div>
        )}

        {/* Renderizado de Vistas */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Dashboard Principal</h1>
              <p className="text-xs text-slate-400 mt-1">
                Monitoreo general de potencia para {telemetry?.device_id || 'ESP32-S3'}.
              </p>
            </div>
            <KPICards telemetry={telemetry} />
            <PowerChart />
          </div>
        )}

        {activeTab === 'monitoring' && (
          <MonitoringView telemetry={telemetry} logs={logs} />
        )}

        {activeTab === 'carbon' && (
          <CarbonView telemetry={telemetry} />
        )}

        {/* Vistas adicionales */}
        {activeTab === 'costos' && <IACostos />}
        {activeTab === 'recomendaciones' && <Recomendaciones />}
        {activeTab === 'ocr' && <OCRRecibos />}

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