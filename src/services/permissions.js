// Archivo: src/services/permissions.js
import * as Notifications from 'expo-notifications';

export const requestNotificationPermission = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('Permisos para notificaciones otorgados.');
      return true; // Retornar true si se otorgan los permisos
    } else {
      console.warn('Los permisos para notificaciones no fueron otorgados.');
      return false; // Retornar false si los permisos no se otorgan
    }
  } catch (error) {
    console.error('Error al solicitar permisos de notificaciones:', error);
    return false; // Retornar false si hay un error en la solicitud
  }
};
