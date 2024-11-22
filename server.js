// Archivo: fcm-backend/server.js
require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const schedule = require('node-schedule');
const admin = require('firebase-admin');
const cors = require('cors');

// Inicializar Firebase Admin con la cuenta de servicio desde variables de entorno
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Instancia de Firestore

const app = express();
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

// Clave del servidor de FCM desde variable de entorno
const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;

// Ruta para registrar el token FCM en Firestore
app.post('/register', async (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) {
    return res.status(400).send("Faltan el userId o el token");
  }

  try {
    await db.collection('userTokens').doc(userId).set({ token });
    console.log(`Token registrado para el usuario ${userId}`);
    res.status(200).send("Token registrado correctamente");
  } catch (error) {
    console.error("Error al registrar el token:", error);
    res.status(500).send("Error al registrar el token");
  }
});

// Ruta para programar una notificación
app.post('/schedule-notification', async (req, res) => {
  const { userId, habitName, message, scheduledTime } = req.body;

  if (!userId || !scheduledTime) {
    return res.status(400).send("Faltan userId o scheduledTime");
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

    schedule.scheduleJob(date, async () => {
      const userDoc = await db.collection('userTokens').doc(userId).get();
      if (userDoc.exists) {
        const userToken = userDoc.data().token;
        sendNotification(userToken, habitName, message);
      } else {
        console.error(`No se encontró el token FCM para el usuario ${userId}`);
      }
    });

    res.status(200).send("Notificación programada correctamente en Firestore y en el servidor");
  } catch (error) {
    console.error("Error al programar la notificación:", error);
    res.status(500).send("Error al programar la notificación");
  }
});

const sendNotification = async (token, habitName, message) => {
  try {
    await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: token,
        notification: {
          title: `¡Hora de tu hábito: ${habitName}!`,
          body: message,
          sound: 'default',
        },
      },
      {
        headers: {
          Authorization: `key=${FCM_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`Notificación enviada para el hábito: ${habitName}`);
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
  }
};

const PORT = process.env.PORT || 3000; // Usar el puerto de Railway o 3000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
