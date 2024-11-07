// Archivo: src/services/permissions.js
import * as Notifications from 'expo-notifications';

export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Los permisos para enviar notificaciones no fueron otorgados.');
  }
};