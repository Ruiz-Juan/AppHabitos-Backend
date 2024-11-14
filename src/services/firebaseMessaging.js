// src/services/firebaseMessaging.js
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { auth } from './firebase'; // Importa auth para obtener el usuario autenticado

export async function requestFCMPermissionAndToken() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    return await messaging().getToken();
  }
  return null;
}

export async function saveTokenToFirestore(userId, token) {
  try {
    if (userId) { // Verifica que userId no sea null
      await firestore().collection('userTokens').doc(userId).set({ token });
      console.log('Token guardado en Firestore:', token);
    } else {
      console.error('No se pudo guardar el token: el userId es nulo');
    }
  } catch (error) {
    console.error('Error guardando el token en Firestore:', error);
  }
}

// Escuchar actualizaciones del token FCM
messaging().onTokenRefresh(async (token) => {
  const userId = auth.currentUser ? auth.currentUser.uid : null; // Asegúrate de que obtienes el userId si el usuario está autenticado
  if (userId) {
    await saveTokenToFirestore(userId, token);
  } else {
    console.log('No hay usuario autenticado para guardar el token actualizado.');
  }
});

