// Archivo: src/services/notifications.js
import * as Notifications from 'expo-notifications';

export const scheduleHabitReminder = async (habitName, reminderTime) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio de Hábito',
      body: `¡Es hora de completar tu hábito: ${habitName}!`,
    },
    trigger: {
      hour: reminderTime.hour,
      minute: reminderTime.minute,
      repeats: true, // Configura el recordatorio para que se repita cada día
    },
  });
};