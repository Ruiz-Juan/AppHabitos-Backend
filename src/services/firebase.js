import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase obtenida de google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyDdSV3Swsk_486cai15qTOmZBzqXj-8yuc",
  authDomain: "apphabitos-b24ef.firebaseapp.com",
  projectId: "apphabitos-b24ef",
  storageBucket: "apphabitos-b24ef.appspot.com",
  messagingSenderId: "941298597520",
  appId: "1:941298597520:android:a1d1fa40a5e8f55ef36215"
};

// Inicializar Firebase solo si no ha sido inicializado previamente
let app;
if (!initializeApp.apps || !initializeApp.apps.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = initializeApp.apps[0];
}

// Inicializar autenticación con persistencia
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
