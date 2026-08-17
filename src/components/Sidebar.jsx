// src/components/Sidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Receipt, 
  Bot, 
  Lightbulb,
  Footprints
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard Principal', icon: LayoutDashboard },
    { id: 'monitoring', name: 'Monitoreo', icon: Activity },
    { id: 'carbon', name: 'Huella de Carbono', icon: Footprints },
    { id: 'ocr', name: 'OCR Recibos', icon: Receipt },
    { id: 'costos', name: 'IA Costos', icon: Bot },
    { id: 'recomendaciones', name: 'Recomendaciones', icon: Lightbulb },
  ];

  return (
    <aside className="w-64 bg-[#111418] border-r border-[#1C2128] flex flex-col justify-between min-h-screen p-4 select-none shrink-0 font-sans">
      <div>
        {/* Logo VoltAudit IoT */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-[#1C2128]">
          <svg 
            viewBox="0 0 100 100" 
            className="w-8 h-8 flex-shrink-0" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="12,18 28,18 46,82 30,82" fill="#3B82F6" />
            <polygon points="68,18 44,52 56,52 46,82 78,44 60,44" fill="#38BDF8" />
          </svg>

          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold tracking-tight text-white">VoltAudit</span>
            <span className="text-xl font-medium text-gray-300">IoT</span>
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1C2A29] text-[#34D399] border border-[#27493E]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#161A20]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#34D399]' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tarjeta DGEHM (Inferior) */}
      <div className="bg-[#171B21] border border-[#2D333B] rounded-2xl p-4 mt-auto">
        <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">DGEHM</h4>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Factor DGEHM</span>
          <span className="text-sm font-bold text-[#38BDF8]">$0.38</span>
        </div>
      </div>
    </aside>
  );
}