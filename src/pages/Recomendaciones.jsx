import React, { useState, useMemo } from 'react';
import { Lightbulb, Zap, DollarSign, Filter, CheckCircle2, AlertTriangle, ArrowDownRight, Layers } from 'lucide-react';

export default function Recomendaciones() {
  const [categoriaSel, setCategoriaSel] = useState('todas');
  const [aplicadas, setAplicadas] = useState([]);

  // Base de datos de recomendaciones auditoras avanzadas
  const listaRecomendaciones = [
    {
      id: 1,
      titulo: 'Optimización de Climatización (Aire Acondicionado)',
      categoria: 'electrodomesticos',
      impacto: 'Alto',
      ahorroKwh: 45,
      ahorroUsd: 7.60,
      dificultad: 'Fácil',
      descripcion: 'Ajustar la temperatura a 24°C en lugar de 18°C. Cada grado menos incrementa un 7% el consumo del compresor.',
      badgeColor: 'bg-orange-950/60 text-orange-400 border-orange-800'
    },
    {
      id: 2,
      titulo: 'Eliminación de Cargas Fantasma (Standby)',
      categoria: 'habitos',
      impacto: 'Medio',
      ahorroKwh: 22,
      ahorroUsd: 3.70,
      dificultad: 'Inmediata',
      descripcion: 'Desconectar televisores, consolas y cargadores sin uso o utilizar regletas inteligentes con switch maestro.',
      badgeColor: 'bg-amber-950/60 text-amber-400 border-amber-800'
    },
    {
      id: 3,
      titulo: 'Sustitución a Iluminación LED de Alta Eficiencia',
      categoria: 'hardware',
      impacto: 'Alto',
      ahorroKwh: 35,
      ahorroUsd: 5.90,
      dificultad: 'Media',
      descripcion: 'Reemplazar bombillos incandescentes o ahorradores antiguos por tecnología LED de 9W (misma luminancia, 80% menos consumo).',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
    },
    {
      id: 4,
      titulo: 'Gestión Eficiente de Refrigeración',
      categoria: 'electrodomesticos',
      impacto: 'Alto',
      ahorroKwh: 30,
      ahorroUsd: 5.05,
      dificultad: 'Fácil',
      descripcion: 'Verificar el empaque magnético de la puerta del refrigerador y evitar ingresar alimentos calientes directamente.',
      badgeColor: 'bg-sky-950/60 text-sky-400 border-sky-800'
    },
    {
      id: 5,
      titulo: 'Uso Horario de Lavadora y Calentador',
      categoria: 'habitos',
      impacto: 'Medio',
      ahorroKwh: 18,
      ahorroUsd: 3.00,
      dificultad: 'Fácil',
      descripcion: 'Lavar con cargas completas y agua fría. Apagar el calentador eléctrico de agua cuando no esté en uso.',
      badgeColor: 'bg-indigo-950/60 text-indigo-400 border-indigo-800'
    }
  ];

  // Alternar selección de recomendación aplicada
  const toggleAplicar = (id) => {
    if (aplicadas.includes(id)) {
      setAplicadas(aplicadas.filter(item => item !== id));
    } else {
      setAplicadas([...aplicadas, id]);
    }
  };

  // Filtrado dinámico
  const recomendacionesFiltradas = useMemo(() => {
    if (categoriaSel === 'todas') return listaRecomendaciones;
    return listaRecomendaciones.filter(r => r.categoria === categoriaSel);
  }, [categoriaSel]);

  // Cálculos acumulados de las medidas aplicadas
  const totalAhorroKwh = useMemo(() => {
    return aplicadas.reduce((acc, id) => {
      const rec = listaRecomendaciones.find(r => r.id === id);
      return acc + (rec ? rec.ahorroKwh : 0);
    }, 0);
  }, [aplicadas]);

  const totalAhorroUsd = useMemo(() => {
    return aplicadas.reduce((acc, id) => {
      const rec = listaRecomendaciones.find(r => r.id === id);
      return acc + (rec ? rec.ahorroUsd : 0);
    }, 0).toFixed(2);
  }, [aplicadas]);

  return (
    <div className="p-6 space-y-6 bg-slate-900 text-gray-100 min-h-screen">
      {/* Encabezado */}
      <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="text-amber-400" /> Plan de Medidas & Recomendaciones
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Recomendaciones personalizadas basadas en el análisis de hábitos y perfiles de carga.
          </p>
        </div>
      </div>

      {/* Resumen de Impacto Estimado Dinámico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-950/60 to-slate-800 p-5 rounded-xl border border-emerald-500/30 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <DollarSign size={28} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Ahorro Mensual Proyectado</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">${totalAhorroUsd} USD</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-950/60 to-slate-800 p-5 rounded-xl border border-sky-500/30 flex items-center gap-4">
          <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl">
            <Zap size={28} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Reducción de Consumo</span>
            <span className="text-2xl font-bold text-sky-400 font-mono">{totalAhorroKwh} kWh/mes</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-800 p-5 rounded-xl border border-indigo-500/30 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Medidas Seleccionadas</span>
            <span className="text-2xl font-bold text-indigo-300 font-mono">{aplicadas.length} de {listaRecomendaciones.length}</span>
          </div>
        </div>
      </div>

      {/* Filtros de Categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-700/60">
        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mr-2">
          <Filter size={14} /> Filtrar:
        </span>
        {[
          { key: 'todas', label: 'Todas las medidas' },
          { key: 'electrodomesticos', label: 'Electrodomésticos' },
          { key: 'habitos', label: 'Hábitos de Consumo' },
          { key: 'hardware', label: 'Hardware e Iluminación' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCategoriaSel(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              categoriaSel === tab.key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de Recomendaciones */}
      <div className="space-y-4">
        {recomendacionesFiltradas.map((item) => {
          const estaAplicada = aplicadas.includes(item.id);
          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                estaAplicada
                  ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-800 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${item.badgeColor}`}>
                    {item.impacto} Impacto
                  </span>
                  <span className="text-xs text-gray-400 bg-slate-900 px-2 py-0.5 rounded font-mono">
                    Dificultad: {item.dificultad}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-100">{item.titulo}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{item.descripcion}</p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-700">
                <div className="text-left md:text-right">
                  <span className="text-xs text-gray-400 block">Ahorro Estimado</span>
                  <span className="text-base font-bold text-emerald-400 font-mono flex items-center gap-1">
                    <ArrowDownRight size={16} /> -${item.ahorroUsd.toFixed(2)} USD <span className="text-xs text-gray-400 font-normal">({item.ahorroKwh} kWh)</span>
                  </span>
                </div>

                <button
                  onClick={() => toggleAplicar(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    estaAplicada
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                      : 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {estaAplicada ? 'Medida Aplicada' : 'Aplicar Medida'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}