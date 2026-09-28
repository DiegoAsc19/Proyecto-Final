// src/data/mockTelemetry.js

export const mockLiveTelemetry = {
  device_id: "ESP32-S3-VOLTAUDIT",
  status: "connected",
  ip_address: "192.168.1.45",
  last_update: "Hace 2 segundos",
  
  // Datos simulados de una Sierra de Banco / Cortadora de Madera Industrial (2.5 - 3.5 HP)
  power_w: 2450.5,      // Potencia activa bajo carga de corte
  voltage_v: 118.2,      // Ligera caída de voltaje por alta demanda inductiva de la sierra
  current_a: 22.40,      // Corriente elevada típica de motor monofásico de banco bajo corte
  frequency_hz: 60.0,
  power_factor: 0.92,    // Factor de potencia mejorado por carga reactiva del motor
  
  kwh_accumulated: 38.45,
  projected_cost_usd: 42.80,
  co2_kg: 7.47,
  dgehm_factor: 0.1944   // Factor de emisión oficial promedio El Salvador (kg CO2 / kWh)
};

// Historial simulado para el gráfico: Refleja los ciclos de corte y ralentí del taller
export const mockHistoryData = [
  { time: "10:00", power: 480, voltage: 120.4 },  // Motor en ralentí (girando sin cortar)
  { time: "10:05", power: 2650, voltage: 118.0 }, // Corte profundo en madera dura
  { time: "10:10", power: 510, voltage: 120.2 },  // Pausa / Ajuste de pieza
  { time: "10:15", power: 2380, voltage: 118.5 }, // Corte continuo
  { time: "10:20", power: 2150, voltage: 118.8 }, // Corte en madera suave
  { time: "10:25", power: 2890, voltage: 117.6 }, // Pico de alta exigencia (Corte transversal)
  { time: "10:30", power: 2450.5, voltage: 118.2 },// Estado actual en vivo
];