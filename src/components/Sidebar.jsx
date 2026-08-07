// src/components/Sidebar.jsx
import React from 'react';
import { 
  LayoutGrid, 
  TrendingUp, 
  Footprints, 
  Calculator, 
  FileText, 
  Lightbulb, 
  Cpu 
} from 'lucide-react';

// Logo oficial VoltAudit IoT: "V" estilizada con corte de rayo
const VoltLogo = () => (
  <svg className="w-7 h-7 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Brazo izquierdo de la V en forma de rayo */}
    <path d="M4 4H11L8 13H13L6 28L18 14H12L15 4H4Z" fill="#3B82F6" />
    {/* Brazo derecho de la V */}
    <path d="M16 28L28 4H22.5L13.5 22L16 28Z" fill="#60A5FA" />
  </svg>
);

export default function Sidebar({ activeTab, setActiveTab }) {
  // Mantenemos TODAS las secciones originales del proyecto
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutGrid },
    { id: 'monitoring', label: 'Monitoreo', icon: TrendingUp },
    { id: 'carbon', label: 'Huella Ecológica', icon: Footprints },
    { id: 'costos', label: 'Simulador IA Costos', icon: Calculator },
    { id: 'ocr', label: 'Escáner OCR Recibos', icon: FileText },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: Lightbulb },
  ];

  return (
    <aside className="w-64 bg-[#181B20] border-r border-[#22262C] flex flex-col justify-between p-5 select-none shrink-0">
      <div>
        {/* Logo Oficial VoltAudit IoT */}
        <div className="flex items-center gap-2.5 mb-8 px-1">
          <VoltLogo />
          <h2 className="font-semibold text-slate-200 text-lg tracking-tight">VoltAudit IoT</h2>
        </div>

        {/* Badge de Estado del Dispositivo */}
        <div className="mb-6 p-2.5 bg-[#22262B] border border-[#2D323A] rounded-2xl flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2 text-slate-300">
            <Cpu className="w-4 h-4 text-slate-400" />
            <span>ESP32-S3</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ONLINE</span>
          </div>
        </div>

        {/* Navegación con TODAS las opciones estilizadas */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1D333D] text-[#52C5E0] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#22262B]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#52C5E0]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tarjeta DGEHM Inferior */}
      <div className="p-4 bg-[#22262B] border border-[#2D323A] rounded-2xl space-y-3 mt-4">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">DGEHM</h4>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Factor DGEHM</span>
          <span className="font-mono font-bold text-[#4B92E5] text-sm">$0.38</span>
        </div>
      </div>
    </aside>
  );
}