// src/data/mockTelemetry.js

export const mockLiveTelemetry = {
  device_id: "ESP32-S3-VOLTAUDIT",
  status: "connected",
  ip_address: "192.168.1.45",
  last_update: "Hace 2 segundos",
  
  power_w: 945.8,
  voltage_v: 120.4,
  current_a: 7.85,
  frequency_hz: 60.0,
  power_factor: 0.96,
  
  kwh_accumulated: 14.85,
  projected_cost_usd: 18.25,
  co2_kg: 5.64,
  dgehm_factor: 0.38
};

// Historial simulado para el gráfico
export const mockHistoryData = [
  { time: "10:00", power: 720, voltage: 120.1 },
  { time: "10:05", power: 850, voltage: 120.2 },
  { time: "10:10", power: 910, voltage: 119.8 },
  { time: "10:15", power: 945, voltage: 120.4 },
  { time: "10:20", power: 890, voltage: 120.0 },
  { time: "10:25", power: 980, voltage: 120.3 },
  { time: "10:30", power: 945.8, voltage: 120.4 },
];