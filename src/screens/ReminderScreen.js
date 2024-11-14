// Archivo: src/screens/ReminderScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HabitContext } from '../context/HabitContext';
import axios from 'axios';
import { auth } from '../services/firebase'; // Importamos auth para obtener el usuario autenticado

const SERVER_URL = 'http://192.168.15.178:3000'; // Cambiado a tu IP local

export default function ReminderScreen({ navigation }) {
  const { habitData } = useContext(HabitContext);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(false);
    setTime(currentDate);
  };

  const handleFinalize = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null; // Obtenemos el ID del usuario autenticado
    const habitName = habitData.habitName;
    const message = "Es momento de realizar tu hábito";

    if (!userId) {
      console.error('No se encontró un usuario autenticado.');
      return;
    }

    try {
      // Envía los datos de la notificación programada al backend
      await axios.post(`${SERVER_URL}/schedule-notification`, {
        userId,
        habitName,
        message,
        scheduledTime: time.toISOString(),
      });
      console.log('Notificación programada en el backend');
      navigation.navigate('Mis Hábitos');
    } catch (error) {
      console.error('Error al programar la notificación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuándo quieres hacerlo?</Text>

      <View style={styles.pickerContainer}>
        <Button title="Seleccionar hora" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Finalizar" onPress={handleFinalize} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  pickerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
