// Archivo principal: App.js
import React from 'react';
import { Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { LogBox } from 'react-native';

// Ignorar ciertos warnings innecesarios
LogBox.ignoreLogs(['Setting a timer']);

// Importar configuraciones específicas para Android
import { requestNotificationPermission } from './src/services/permissions';

export default function App() {
  // Si la plataforma es Android, solicitar permisos para notificaciones
  if (Platform.OS === 'android') {
    requestNotificationPermission();
  }

  return <AppNavigator />;
}