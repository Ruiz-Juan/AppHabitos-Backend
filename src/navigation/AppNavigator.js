// Archivo: src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HabitProvider } from '../context/HabitContext';

// Importar las pantallas necesarias
import LoginScreen from '../screens/LoginScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';
import HabitListScreen from '../screens/HabitListScreen';
import RegisterHabitScreen from '../screens/RegisterHabitScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FrequencyScreen from '../screens/FrequencyScreen';
import EditFrequencyScreen from '../screens/EditFrequencyScreen';
import ReminderScreen from '../screens/ReminderScreen';
import EditHabitScreen from '../screens/EditHabitScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis Hábitos" component={HabitListScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <HabitProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registrar Usuario" component={RegisterUserScreen} />
        <Stack.Screen name="Registrar Hábito" component={RegisterHabitScreen} />
        <Stack.Screen name="Frecuencia" component={FrequencyScreen} />
        <Stack.Screen name="EditFrecuencia" component={EditFrequencyScreen} />
        <Stack.Screen name="Recordatorio" component={ReminderScreen} />
        <Stack.Screen name="Editar Hábito" component={EditHabitScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </HabitProvider>
  );
}
