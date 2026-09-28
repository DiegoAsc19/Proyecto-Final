import React, { useState, useEffect } from "react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Coordenadas exactas de San Miguel Tepezontes, La Paz
  const LATITUD = 13.6231;
  const LONGITUD = -89.0128;
  const NOMBRE_UBICACION = "San Miguel Tepezontes, SV";

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Error HTTP: ${res.status}`);
      }

      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener el clima:", err);
      setError("No se pudo cargar el clima.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!API_KEY) {
      setError("Falta la API Key en el archivo .env");
      setLoading(false);
      return;
    }

    fetchWeather(LATITUD, LONGITUD);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#161b22]/80 backdrop-blur-md border border-[#30363d] rounded-2xl p-6 text-gray-400 text-sm flex items-center justify-center gap-3 animate-pulse">
        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        <span>Monitoreando clima local en San Miguel Tepezontes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[#161b22] border border-red-500/30 rounded-2xl p-5 text-red-400 text-sm flex items-center justify-between">
        <span>⚠️ {error}</span>
      </div>
    );
  }

  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0].main.toLowerCase();

  // Evaluación de riesgo para la red eléctrica
  const isStorm = condition.includes("thunderstorm") || condition.includes("squall");
  const isRain = condition.includes("rain") || condition.includes("drizzle");

  return (
    <div className="relative w-full bg-gradient-to-r from-[#161b22] via-[#1c2128] to-[#161b22] border border-[#30363d] rounded-2xl p-6 text-white shadow-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/40">
      {/* Resplandor decorativo de fondo */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Bloque Izquierdo: Icono, Estado e Info Principal */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-shrink-0 bg-[#21262d]/60 p-2 rounded-2xl border border-[#30363d] shadow-inner">
            <img
              src={iconUrl}
              alt={weather.weather[0].description}
              className="w-16 h-16 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h4 className="font-semibold text-lg text-gray-100 tracking-wide">
                {NOMBRE_UBICACION}
              </h4>
            </div>

            <p className="text-sm font-medium text-emerald-400 capitalize flex items-center gap-1.5">
              {weather.weather[0].description}
            </p>

            {/* Insignia de alerta según el clima */}
            <div className="mt-2">
              {isStorm ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                  ⚡ Riesgo Eléctrico Alto
                </span>
              ) : isRain ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  🌧️ Precaución por Humedad
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  🛡️ Red Segura
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bloque Centro-Derecho: Temperatura Destacada y Métricas */}
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#30363d] pt-4 sm:pt-0">
          
          {/* Valor de Temperatura */}
          <div className="flex items-baseline">
            <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400">
              {temp}
            </span>
            <span className="text-2xl font-bold text-emerald-400 ml-1">°C</span>
          </div>

          {/* Tarjetas Pequeñas de Telemetría Ambiental */}
          <div className="flex gap-2 text-xs">
            <div className="bg-[#21262d]/80 border border-[#30363d] rounded-xl px-3 py-2 text-center min-w-[70px]">
              <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">Humedad</span>
              <span className="font-bold text-gray-200 text-sm">{weather.main.humidity}%</span>
            </div>

            <div className="bg-[#21262d]/80 border border-[#30363d] rounded-xl px-3 py-2 text-center min-w-[70px]">
              <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">Viento</span>
              <span className="font-bold text-gray-200 text-sm">{Math.round(weather.wind.speed * 3.6)} <span className="text-[10px] text-gray-400">km/h</span></span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WeatherWidget;