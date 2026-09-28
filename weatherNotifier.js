const cron = require('node-cron');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

// Configuración del transporte de correo (Gmail SMTP o SendGrid)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password de Gmail
  },
});

// Función para revisar el clima y notificar
async function checkWeatherAndNotify(lat, lon, userEmail) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);
    const weather = response.data;
    const condition = weather.weather[0].main.toLowerCase();

    const isStorm = condition.includes('thunderstorm');
    const isRain = condition.includes('rain');

    if (isStorm || isRain) {
      const subject = isStorm 
        ? '⚡ VoltAudit: ¡Alerta de Tormenta Eléctrica! Protege tus electrodomésticos' 
        : '🌧️ VoltAudit: Recomendación por Lluvia Local';

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: ${isStorm ? '#d9534f' : '#f0ad4e'};">
            ${isStorm ? '⚠️ Tormenta Eléctrica Detectada' : '🌧️ Lluvia Registrada en tu Zona'}
          </h2>
          <p>Se ha detectado <strong>${weather.weather[0].description}</strong> en <strong>${weather.name}</strong>.</p>
          
          <h3>Recomendaciones de Seguridad Eléctrica:</h3>
          <ul>
            ${isStorm ? `
              <li><strong>Desconecta equipos sensibles:</strong> Televisores, computadoras y electrodomésticos de alto valor.</li>
              <li><strong>Desconecta el cargador de vehículos/motos eléctricas.</strong></li>
              <li><strong>Evita picos de voltaje:</strong> Los rayos pueden generar variaciones bruscas en la red eléctrica residencial.</li>
            ` : `
              <li>Asegúrate de que los tomacorrientes exteriores estén secos y protegidos.</li>
            `}
          </ul>
          <p style="font-size: 12px; color: #777;">VoltAudit IoT - Cuidando tu consumo e infraestructura eléctrica.</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"VoltAudit Alertas" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: subject,
        html: htmlBody,
      });

      console.log(`Notificación de clima enviada a ${userEmail}`);
    }
  } catch (error) {
    console.error('Error al consultar o enviar correo:', error.message);
  }
}

// Ejecutar cada hora (Cron syntax: 0 * * * *)
cron.schedule('0 * * * *', () => {
  console.log('Revisando clima para alertas VoltAudit...');
  // Aquí puedes iterar sobre tu base de datos de usuarios
  checkWeatherAndNotify(13.6929, -89.2182, 'usuario@ejemplo.com');
});