export const TELEMETRY_INTERVAL_MS = 2000;
export const MAX_TELEMETRY_LOGS = 30;

export const DEFAULT_ENERGY_RATE = 0.1689;
export const DEFAULT_CO2_FACTOR = 0.1944;

const hasNumericValue = (value) => value !== null && value !== undefined && value !== '';

export function toFiniteNumber(value, fallback = 0) {
  if (!hasNumericValue(value)) return fallback;

  const parsedValue = typeof value === 'number' ? value : Number.parseFloat(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function firstFiniteValue(values) {
  for (const value of values) {
    if (!hasNumericValue(value)) continue;

    const parsedValue = typeof value === 'number' ? value : Number.parseFloat(value);
    if (Number.isFinite(parsedValue)) return parsedValue;
  }

  return null;
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function formatTelemetryTime(value, fallbackDate = new Date()) {
  if (typeof value === 'string' && /^\d{1,2}:\d{2}(?::\d{2})?/.test(value)) {
    return value;
  }

  if (value) {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  }

  return fallbackDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Normaliza las variantes ya admitidas por el frontend a un único modelo finito.
 * La potencia reportada en kW conserva prioridad y se convierte a W sin redondear.
 * La fórmula RMS se utiliza únicamente cuando la fuente no reporta potencia.
 */
export function normalizeTelemetry(rawTelemetry = {}, options = {}) {
  const receivedDate = options.receivedAt instanceof Date ? options.receivedAt : new Date();
  const voltageV = firstFiniteValue([
    rawTelemetry.voltaje,
    rawTelemetry.voltage_v,
    rawTelemetry.voltage,
  ]) ?? 0;
  const currentA = firstFiniteValue([
    rawTelemetry.corriente,
    rawTelemetry.current_a,
    rawTelemetry.current,
  ]) ?? 0;
  const powerFactor = clamp(
    firstFiniteValue([
      rawTelemetry.factor_potencia,
      rawTelemetry.pf,
      rawTelemetry.power_factor,
    ]) ?? 0.95,
    0,
    1,
  );
  const frequencyHz = firstFiniteValue([
    rawTelemetry.frecuencia,
    rawTelemetry.frequency,
    rawTelemetry.frequency_hz,
  ]) ?? 60;

  const reportedPowerKw = firstFiniteValue([
    rawTelemetry.potencia_kw,
    rawTelemetry.power_kw,
  ]);
  const reportedPowerW = firstFiniteValue([
    rawTelemetry.power_w,
    rawTelemetry.power,
  ]);
  const rmsCalculatedPowerW = voltageV * currentA * powerFactor;
  const powerW = reportedPowerKw !== null
    ? reportedPowerKw * 1000
    : reportedPowerW ?? rmsCalculatedPowerW;
  const differenceW = powerW - rmsCalculatedPowerW;
  const differencePercent = rmsCalculatedPowerW > 0
    ? Math.abs(differenceW) / rmsCalculatedPowerW * 100
    : 0;

  const sourceTimestamp = rawTelemetry.fecha_hora
    ?? rawTelemetry.timestamp
    ?? rawTelemetry.last_update
    ?? rawTelemetry.time;
  const time = formatTelemetryTime(sourceTimestamp, receivedDate);
  const dispositivoId = rawTelemetry.dispositivo_id ?? rawTelemetry.device_id ?? 1;

  return {
    ...rawTelemetry,
    dispositivo_id: dispositivoId,
    device_id: rawTelemetry.device_id ?? `ESP32-S3-${dispositivoId}`,
    ip_address: options.ipAddress ?? rawTelemetry.ip_address ?? '',
    potencia_kw: powerW / 1000,
    power_w: powerW,
    power: powerW,
    voltaje: voltageV,
    voltage_v: voltageV,
    voltage: voltageV,
    corriente: currentA,
    current_a: currentA,
    current: currentA,
    factor_potencia: powerFactor,
    pf: powerFactor,
    frecuencia: frequencyHz,
    frequency: frequencyHz,
    rms_calculated_power_w: rmsCalculatedPowerW,
    power_difference_w: differenceW,
    power_difference_percent: differencePercent,
    power_source: reportedPowerKw !== null
      ? 'potencia_kw'
      : reportedPowerW !== null
        ? 'power_w'
        : 'rms_formula',
    is_power_consistent: differencePercent <= 2,
    is_connected: options.isConnected ?? rawTelemetry.is_connected ?? true,
    source: options.source ?? rawTelemetry.source ?? 'unknown',
    timestamp: receivedDate.toISOString(),
    source_timestamp: sourceTimestamp ?? null,
    time,
    last_update: time,
  };
}

export function createTelemetryLog(telemetry, sequence) {
  return {
    id: `${telemetry.timestamp}-${sequence}`,
    ...telemetry,
  };
}

export function appendTelemetryLog(previousLogs, log) {
  return [...previousLogs.slice(-(MAX_TELEMETRY_LOGS - 1)), log];
}

export function formatMeasurement(value, decimals) {
  return toFiniteNumber(value).toFixed(decimals);
}

export function getPowerWatts(telemetry = {}) {
  const directPower = firstFiniteValue([telemetry.power_w, telemetry.power]);
  if (directPower !== null) return directPower;

  const powerKw = firstFiniteValue([telemetry.potencia_kw, telemetry.power_kw]);
  return powerKw !== null ? powerKw * 1000 : 0;
}

export function calculateSessionEnergyKwh(logs = []) {
  if (logs.length < 2) return 0;

  return logs.slice(1).reduce((energyKwh, reading, index) => {
    const previousReading = logs[index];
    const startTime = new Date(previousReading.timestamp).getTime();
    const endTime = new Date(reading.timestamp).getTime();
    const elapsedHours = (endTime - startTime) / 3_600_000;

    if (!Number.isFinite(elapsedHours) || elapsedHours <= 0 || elapsedHours > 1) {
      return energyKwh;
    }

    const averagePowerKw = (
      getPowerWatts(previousReading) + getPowerWatts(reading)
    ) / 2 / 1000;

    return energyKwh + averagePowerKw * elapsedHours;
  }, 0);
}
