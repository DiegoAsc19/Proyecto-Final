import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, onOpenSettings }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Principal' },
    { id: 'monitoring', label: 'Monitoreo' },
    { id: 'carbon', label: 'Huella de Carbono' },
    { id: 'ocr', label: 'OCR Recibos' },
    { id: 'ia-costos', label: 'IA Costos' },
    { id: 'recomendaciones', label: 'Recomendaciones' },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#161B22] border-r border-[#21262D] p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Logo del proyecto VoltAudit IoT */}
        <div className="flex items-center gap-3 px-2">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="font-bold text-lg text-white tracking-wide">VoltAudit <span className="text-xs text-slate-400 font-normal">IoT</span></h1>
        </div>

        {/* Menú de Navegación */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#21262D] text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C2128]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sección Inferior: Indicador DGEHM y Botón de Ajustes */}
      <div className="space-y-3 pt-6 border-t border-[#21262D] mt-6">
        <div className="bg-[#0D1117] border border-[#21262D] rounded-xl p-3">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">DGEHM</span>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-300">Factor DGEHM</span>
            <span className="text-xs font-bold text-cyan-400">$0.38</span>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-[#21262D] border border-transparent hover:border-[#30363D] transition-all"
        >
          <span>Ajustes de Red</span>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}