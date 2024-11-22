// Archivo: server.js
require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const schedule = require('node-schedule');
const admin = require('firebase-admin');
const cors = require('cors');

// Inicializar Firebase Admin con la cuenta de servicio desde variables de entorno
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Instancia de Firestore

const app = express();
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

// Ruta para registrar el token FCM en Firestore
app.post('/register', async (req, res) => {
  const { userId, token } = req.body;
  console.log('Recibido para registro:', { userId, token });

  if (!userId || !token) {
    console.error('Faltan parámetros: userId o token');
    return res.status(400).send('Faltan el userId o el token');
  }

  try {
    await db.collection('userTokens').doc(userId).set({ token });
    console.log(`Token registrado para el usuario ${userId}`);
    res.status(200).send('Token registrado correctamente');
  } catch (error) {
    console.error('Error al registrar el token:', error);
    res.status(500).send('Error al registrar el token');
  }
});

// Ruta para programar una notificación
app.post('/schedule-notification', async (req, res) => {
  const { userId, habitName, message, scheduledTime } = req.body;
  console.log('Programando notificación:', { userId, habitName, message, scheduledTime });

  if (!userId || !scheduledTime) {
    console.error('Faltan parámetros: userId o scheduledTime');
    return res.status(400).send('Faltan userId o scheduledTime');
  }

  const date = new Date(scheduledTime);

  try {
    const notificationRef = db.collection('notifications').doc();
    await notificationRef.set({
      userId,
      habitName,
      message,
      scheduledTime: date,
    });

    console.log('Notificación almacenada en Firestore:', { userId, habitName, message, scheduledTime });

    schedule.scheduleJob(date, async () => {
      console.log('Ejecutando tarea programada para enviar notificación:', { userId, habitName });

      const userDoc = await db.collection('userTokens').doc(userId).get();
      if (userDoc.exists) {
        const userToken = userDoc.data().token;
        console.log('Token del usuario encontrado:', userToken);
        sendNotification(userToken, habitName, message);
      } else {
        console.error(`No se encontró el token FCM para el usuario ${userId}`);
      }
    });

    res.status(200).send('Notificación programada correctamente en Firestore y en el servidor');
  } catch (error) {
    console.error('Error al programar la notificación:', error);
    res.status(500).send('Error al programar la notificación');
  }
});

// Función para enviar notificaciones usando la API HTTP v1
const sendNotification = async (token, habitName, message) => {
  console.log('Enviando notificación:', { token, habitName, message });

  try {
    // URL para la API HTTP v1
    const url = `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`;

    // Cuerpo de la solicitud
    const body = {
      message: {
        token: token,
        notification: {
          title: `¡Hora de tu hábito: ${habitName}!`,
          body: message,
        },
      },
    };

    // Headers para la solicitud
    const headers = {
      Authorization: `key=${process.env.FIREBASE_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Enviar la solicitud
    const response = await axios.post(url, body, { headers });
    console.log('Notificación enviada correctamente:', response.data);
  } catch (error) {
    console.error(
      'Error al enviar la notificación con API HTTP v1:',
      error.response ? error.response.data : error.message
    );
  }
};

// Ruta de prueba para verificar el servidor
app.get('/', (req, res) => {
  res.status(200).send('El servidor está funcionando correctamente.');
});

const PORT = process.env.PORT || 3000; // Usar el puerto de Railway o 3000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

