# VoltAudit IoT - Dashboard de Telemetría y Auditoría Energética

Sistema de monitoreo energético en tiempo real desarrollado para dispositivos ESP32-S3. Permite visualizar consumo de potencia, estimación de costos, impacto de huella de carbono y planes de recomendaciones de ahorro.

---

## 🛠️ Tecnologías y Bibliotecas Instaladas (Evidencia de Desarrollo)

Para la creación y maquetación de la aplicación web se instalaron y utilizaron las siguientes dependencias principales:

### 1. Núcleo y Arquitectura (Core)
* **`react`** (`^18.x`): Biblioteca principal basada en componentes para la creación de la interfaz de usuario.
* **`react-dom`** (`^18.x`): Renderizado dinámico del árbol de componentes en el DOM del navegador.

### 2. Estilos y Diseño Visual
* **`tailwindcss`** (`^3.x`): Framework de CSS utilitario utilizado para todo el maquetado responsive, tema oscuro (Dark Mode) y diseño de la interfaz.
* **`postcss` / `autoprefixer`**: Procesadores CSS para asegurar la compatibilidad de estilos entre diferentes navegadores.

### 3. Iconografía y Componentes Gráficos
* **`lucide-react`**: Colección de iconos en formato SVG (`Zap`, `Leaf`, `Lightbulb`, `Wifi`, `Calculator`, etc.) utilizados en los botones, métricas y badges de estado.
* **`recharts`**: Biblioteca de visualización de datos utilizada para generar los gráficos de telemetría y consumo energético en tiempo real.

### 4. Entorno de Desarrollo y Compilación
* **`vite`**: Herramienta de compilación rápida y servidor de desarrollo local para React.

---

## 🚀 Instrucciones de Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. Abrir en el navegador la dirección generada en la consola (por defecto `http://localhost:5173`).
