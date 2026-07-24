// src/components/MonitoringView.jsx
import React from 'react';
import { Activity, Radio, Cpu, Zap, Clock, Download } from 'lucide-react';

export default function MonitoringView({ telemetry = {}, logs = [] }) {

  // Función para generar y descargar la bitácora en formato CSV
  const handleExportCSV = () => {
    if (!logs || logs.length === 0) {
      alert('No hay registros suficientes en la bitácora para exportar.');
      return;
    }

    // Cabeceras de la tabla CSV
    const headers = ['Hora', 'Potencia (W)', 'Voltaje (V)', 'Corriente (A)'];
    
    // Filas formateadas
    const rows = logs.map((log) => [
      log.time,
      log.power_w,
      log.voltage_v,
      log.current_a,
    ]);

    // Ensamblar contenido CSV
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    // Crear y activar enlace de descarga automática
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `reporte_voltaudit_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Estado del Hardware ESP32 */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100">{telemetry?.device_id || 'ESP32-S3'}</h3>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono">
                {(telemetry?.status || 'ONLINE').toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">IP: {telemetry?.ip_address || '192.168.1.105'}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <div>
            <span className="block text-slate-500">Última actualización</span>
            <span className="text-slate-200">{telemetry?.last_update || 'En vivo'}</span>
          </div>
          <div>
            <span className="block text-slate-500">Frecuencia de Red</span>
            <span className="text-cyan-400 font-bold">{telemetry?.frequency_hz || 60} Hz</span>
          </div>
        </div>
      </div>

      {/* Grid de variables eléctricas avanzadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>Factor de Potencia ($\cos \phi$)</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-100">
            {telemetry?.power_factor || 0.98}
          </div>
          <div className="text-[11px] text-emerald-400 mt-2">
            Eficiencia óptima (&gt; 0.90)
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>Energía Acumulada</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-amber-400">
            {telemetry?.kwh_accumulated || 14.2} <span className="text-sm text-slate-400">kWh</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Medición continua en sesión
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span>Frecuencia Nom.</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-cyan-400">
            {telemetry?.frequency_hz || 60} <span className="text-sm text-slate-400">Hz</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Red Eléctrica Local (60 Hz)
          </div>
        </div>
      </div>

      {/* Bitácora de Lecturas en Vivo y Botón de Exportación */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" /> Bitácora de Lecturas Recientes
          </h3>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-xs font-semibold bg-[#4FCFC6]/10 text-[#4FCFC6] border border-[#4FCFC6]/30 px-3 py-1.5 rounded-xl hover:bg-[#4FCFC6]/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-2">HORA</th>
                <th className="pb-2">POTENCIA (W)</th>
                <th className="pb-2">VOLTAJE (V)</th>
                <th className="pb-2">CORRIENTE (A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={index} className="text-slate-300">
                    <td className="py-2.5 text-slate-500">{log.time}</td>
                    <td className="py-2.5 text-amber-400 font-bold">{log.power_w} W</td>
                    <td className="py-2.5 text-cyan-400">{log.voltage_v} V</td>
                    <td className="py-2.5 text-rose-400">{log.current_a} A</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-slate-500">
                    Esperando primeros datos en tiempo real...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}