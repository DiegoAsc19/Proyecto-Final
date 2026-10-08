import React, { useState, useEffect } from 'react';

export function WeatherWidget() {
  const [cityName, setCityName] = useState('Obteniendo ubicación...');
  const [weatherData, setWeatherData] = useState({
    temp: 21,
    humidity: 95,
    wind: 2,
    condition: 'Nubes'
  });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const fetchWeatherByCoords = (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;
      
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.main) {
            setCityName(`${data.name}, ${data.sys?.country || 'SV'}`);
            setWeatherData({
              temp: Math.round(data.main.temp),
              humidity: data.main.humidity,
              wind: Math.round(data.wind.speed * 3.6), // Convertir m/s a km/h
              condition: data.weather[0]?.main || 'Nubes'
            });
          }
        })
        .catch((err) => {
          console.error("Error cargando clima por coordenadas:", err);
          fetchFallbackWeather();
        });
    };

    const fetchFallbackWeather = () => {
      // Ubicación de respaldo si el usuario niega los permisos o falla el GPS
      const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?q=San%20Salvador,SV&units=metric&lang=es&appid=${apiKey}`;
      
      fetch(fallbackUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.main) {
            setCityName("San Salvador, SV");
            setWeatherData({
              temp: Math.round(data.main.temp),
              humidity: data.main.humidity,
              wind: Math.round(data.wind.speed * 3.6),
              condition: data.weather[0]?.main || 'Nubes'
            });
          }
        })
        .catch((err) => console.error("Error cargando clima de respaldo:", err));
    };

    if (apiKey) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          (error) => {
            console.warn("Geolocalización no denegada o no disponible, usando respaldo:", error);
            fetchFallbackWeather();
          }
        );
      } else {
        fetchFallbackWeather();
      }
    } else {
      setCityName("San Miguel Tepezontes, SV");
    }
  }, []);

  return (
    <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-5 flex items-center justify-between text-white shadow-lg">
      {/* Lado Izquierdo: Icono, Ubicación y Badges */}
      <div className="flex items-center gap-4">
        <div className="text-4xl text-gray-300">
          ☁️
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h2 className="text-lg font-bold tracking-wide">{cityName}</h2>
          </div>
          <p className="text-xs text-emerald-400 font-medium ml-4 mt-0.5">{weatherData.condition}</p>
          
          <div className="flex gap-2 mt-2 ml-4">
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
              🛡️ Red Segura
            </span>
            <span className="text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
              📧 Alerta ya enviada hoy
            </span>
          </div>
        </div>
      </div>

      {/* Lado Derecho: Temperatura, Humedad y Viento */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <span className="text-5xl font-extrabold tracking-tight">{weatherData.temp}</span>
          <span className="text-xl font-bold text-emerald-400 ml-1">°C</span>
        </div>

        <div className="flex gap-2">
          <div className="bg-[#0D1117] border border-[#21262D] rounded-xl px-3 py-2 text-center min-w-[70px]">
            <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Humedad</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{weatherData.humidity}%</span>
          </div>

          <div className="bg-[#0D1117] border border-[#21262D] rounded-xl px-3 py-2 text-center min-w-[70px]">
            <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Viento</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{weatherData.wind} <span className="text-[10px] font-normal text-gray-400">km/h</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;