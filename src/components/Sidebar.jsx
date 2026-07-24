// src/components/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, Activity, Leaf, Cpu, Zap } from 'lucide-react';
import { mockLiveTelemetry } from '../data/mockTelemetry';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Monitoreo en Tiempo Real', icon: Activity },
    { id: 'carbon', label: 'Huella Ecológica', icon: Leaf },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-5">
      <div>
        {/* Logo corporativo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-[#4FCFC6]/10 border border-[#4FCFC6]/20">
            <Zap className="w-6 h-6 text-[#4FCFC6]" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-100 leading-none">
              VoltAudit <span className="text-[#4FCFC6]">IoT</span>
            </h1>
            <span className="text-[10px] text-slate-500 font-mono">v2.4.1</span>
          </div>
        </div>

        {/* Estado del dispositivo ESP32 */}
        <div className="mb-6 p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Cpu className="w-4 h-4 text-slate-400" />
            <span>ESP32-S3</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4FCF86] bg-[#4FCF86]/10 px-2 py-0.5 rounded-md border border-[#4FCF86]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FCF86]"></span>
            ONLINE
          </span>
        </div>

        {/* Menú de Navegación */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#4FCFC6]/15 text-[#4FCFC6] border border-[#4FCFC6]/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#4FCFC6]' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pie del Sidebar - Factor DGEHM */}
      <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="text-[11px] text-slate-400">Factor DGEHM</div>
        <div className="text-sm font-bold text-[#4F98CF] font-mono mt-0.5">
          ${mockLiveTelemetry.dgehm_factor} <span className="text-[10px] font-normal text-slate-500">/ kWh</span>
        </div>
      </div>
    </aside>
  );
}