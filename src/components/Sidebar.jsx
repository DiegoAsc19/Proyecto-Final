// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Receipt, 
  Bot, 
  Lightbulb, 
  Zap 
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Monitoreo', path: '/monitoreo', icon: Activity },
    { name: 'OCR Recibos', path: '/ocr-recibos', icon: Receipt },
    { name: 'IA Costos', path: '/ia-costos', icon: Bot },
    { name: 'Recomendaciones', path: '/recomendaciones', icon: Lightbulb },
  ];

  return (
    <aside className="w-64 bg-[#181B20] border-r border-[#2D323A] flex flex-col justify-between min-h-screen p-4 select-none shrink-0">
      {/* Encabezado del Sidebar / Logo */}
      <div>
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-[#2D323A]">
          <div className="p-2 bg-[#1E2B3C] text-[#4A8CE8] rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-none">VoltAudit</h1>
            <span className="text-[10px] text-slate-400 font-mono">IoT Energy Monitor</span>
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#22262B] text-white border border-[#2D323A]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#22262B]/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#4A8CE8]" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Pie del Sidebar - Estado */}
      <div className="pt-4 border-t border-[#2D323A]">
        <div className="px-3 py-2.5 bg-[#22262B] border border-[#2D323A] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]"></span>
            </span>
            <span className="text-xs text-slate-300 font-mono">ESP32 Online</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">v1.0</span>
        </div>
      </div>
    </aside>
  );
}