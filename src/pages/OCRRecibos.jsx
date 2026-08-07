import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Zap, DollarSign, Calendar, Tag, ShieldCheck } from 'lucide-react';

export default function OCRRecibos() {
  const [archivo, setArchivo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [escaneando, setEscaneando] = useState(false);
  const [datosExtraidos, setDatosExtraidos] = useState(null);

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDatosExtraidos(null);
    }
  };

  // Simular proceso de escaneo OCR inteligente
  const procesarEscaneo = () => {
    if (!archivo) return;
    setEscaneando(true);
    setDatosExtraidos(null);

    setTimeout(() => {
      setEscaneando(false);
      // Datos extraídos simulados con valores razonables de auditoría
      setDatosExtraidos({
        numNIC: '3049281-2',
        empresaDistribuidora: 'AES CLESA / CAESS',
        periodoFacturacion: 'Junio - Julio 2026',
        consumoKwh: 184,
        montoTotalUsd: 31.28,
        tarifaAplicada: 'Residencial General (0.17 USD/kWh)',
        confianzaOcr: '98.5%'
      });
    }, 2500);
  };

  // Limpiar y subir otro recibo
  const reiniciar = () => {
    setArchivo(null);
    setPreviewUrl(null);
    setDatosExtraidos(null);
    setEscaneando(false);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-900 text-gray-100 min-h-screen">
      {/* Encabezado */}
      <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-cyan-400" /> Auditoría Inteligente por OCR
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Digitaliza tus facturas de energía. Sube la imagen o PDF de tu recibo para extraer los datos automáticamente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zona de Carga de Recibo */}
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-200 flex items-center gap-2">
            <Upload size={20} className="text-cyan-400" /> Cargar Factura / Recibo
          </h2>

          {!previewUrl ? (
            <label className="border-2 border-dashed border-slate-600 hover:border-cyan-400 bg-slate-900/50 hover:bg-slate-900 p-8 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-3 min-h-[280px]">
              <div className="p-4 bg-slate-800 text-cyan-400 rounded-full">
                <Upload size={32} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">Haz clic o arrastra aquí tu factura</p>
                <p className="text-xs text-gray-400 mt-1">Formatos soportados: JPG, PNG, PDF</p>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center min-h-[280px] max-h-[350px]">
              <img
                src={previewUrl}
                alt="Vista previa del recibo"
                className="max-h-[340px] w-auto object-contain p-2"
              />
              
              {/* Animación de láser escaneando */}
              {escaneando && (
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-cyan-400/40 to-transparent animate-pulse border-b-2 border-cyan-400" />
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {previewUrl && (
              <>
                <button
                  onClick={procesarEscaneo}
                  disabled={escaneando}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950"
                >
                  {escaneando ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} /> Procesando visión OCR...
                    </>
                  ) : (
                    <>
                      <Zap size={18} /> Procesar con OCR
                    </>
                  )}
                </button>
                <button
                  onClick={reiniciar}
                  className="bg-slate-700 hover:bg-slate-600 text-gray-300 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all"
                >
                  Cambiar
                </button>
              </>
            )}
          </div>
        </div>

        {/* Zona de Resultados Extraídos */}
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-5 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-200 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-400" /> Datos Extraídos del Recibo
          </h2>

          {!datosExtraidos && !escaneando && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 rounded-xl border border-slate-800 text-gray-400 space-y-2">
              <AlertCircle size={36} className="text-slate-600" />
              <p className="text-sm font-medium">No se han extraído datos todavía.</p>
              <p className="text-xs text-slate-500">Sube la foto de tu recibo y presiona "Procesar con OCR".</p>
            </div>
          )}

          {escaneando && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 rounded-xl border border-slate-800 space-y-3">
              <RefreshCw size={36} className="text-cyan-400 animate-spin" />
              <p className="text-sm font-semibold text-gray-200">Analizando documento con OCR...</p>
              <p className="text-xs text-gray-400">Identificando lecturas de medidor, tarifa y montos finales.</p>
            </div>
          )}

          {datosExtraidos && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={16} /> Extracción completada
                </span>
                <span className="bg-emerald-900/60 px-2 py-0.5 rounded font-mono">Precision: {datosExtraidos.confianzaOcr}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
                    <Tag size={13} /> Distribuidora / NIS
                  </span>
                  <span className="text-sm font-bold text-gray-100 block">{datosExtraidos.empresaDistribuidora}</span>
                  <span className="text-xs text-gray-400 font-mono">NIC: {datosExtraidos.numNIC}</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
                    <Calendar size={13} /> Período
                  </span>
                  <span className="text-sm font-bold text-gray-100 block">{datosExtraidos.periodoFacturacion}</span>
                  <span className="text-xs text-cyan-400">30 días de consumo</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
                    <Zap size={13} className="text-amber-400" /> Consumo Registrado
                  </span>
                  <span className="text-xl font-bold text-amber-400 font-mono">{datosExtraidos.consumoKwh} kWh</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
                    <DollarSign size={13} className="text-emerald-400" /> Total a Pagar
                  </span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">${datosExtraidos.montoTotalUsd.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-xs text-gray-400 block mb-1">Esquema Tarifario Detectado</span>
                <span className="text-xs font-semibold text-gray-200">{datosExtraidos.tarifaAplicada}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}