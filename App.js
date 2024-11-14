// Archivo: App.js
import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { requestFCMPermissionAndToken, saveTokenToFirestore } from './src/services/firebaseMessaging';
import { auth } from './src/services/firebase';

export default function App() {
  useEffect(() => {
    async function getFCMToken() {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        try {
          const token = await requestFCMPermissionAndToken();
          if (token) {
            console.log('Token de FCM obtenido:', token);
            await saveTokenToFirestore(userId, token);
          } else {
            Alert.alert('Permisos requeridos', 'Se necesitan permisos para enviar notificaciones.');
          }
        } catch (error) {
          console.error('Error al obtener el token de FCM:', error);
          Alert.alert('Error', 'Hubo un problema al obtener el token de notificación.');
        }
      } else {
        console.log('Usuario no autenticado');
      }
    }

    if (Platform.OS !== 'web') {
      getFCMToken();
    }
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
