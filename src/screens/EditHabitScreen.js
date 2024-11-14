// Archivo: src/screens/EditHabitScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HabitContext } from '../context/HabitContext';

export default function EditHabitScreen({ route, navigation }) {
  const { habit, index } = route.params;
  const { habitData, setHabitData } = useContext(HabitContext);

  const [habitName, setHabitName] = useState(habit.habitName);
  const [description, setDescription] = useState(habit.description);
  const [reminderTime, setReminderTime] = useState(new Date(habit.reminderTime || new Date()));
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setHabitData({
      habitName: habit.habitName,
      description: habit.description,
      reminderTime: habit.reminderTime,
      frequency: habit.frequency || '',
      selectedDays: habit.selectedDays || [],
      selectedDates: habit.selectedDates || [],
    });

    return () => {
      setHabitData({
        habitName: '',
        description: '',
        reminderTime: null,
        frequency: '',
        selectedDays: [],
        selectedDates: [],
      });
    };
  }, [habit, setHabitData]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || reminderTime;
    const adjustedDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    setShowPicker(Platform.OS === 'ios');
    setReminderTime(adjustedDate);
  };

  const handleSave = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('@habits');
      const parsedHabits = storedHabits ? JSON.parse(storedHabits) : [];

      parsedHabits[index] = {
        habitName: habitName.trim() || 'Hábito sin nombre',
        description: description.trim(),
        reminderTime: reminderTime || new Date(),
        frequency: habitData.frequency || '',
        selectedDays: habitData.selectedDays || [],
        selectedDates: habitData.selectedDates || [],
      };

      await AsyncStorage.setItem('@habits', JSON.stringify(parsedHabits));

      console.log('Hábito actualizado en AsyncStorage:', parsedHabits);
      navigation.navigate('Mis Hábitos');
    } catch (e) {
      console.error('Error al actualizar el hábito:', e);
    }
  };

  const handleDelete = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('@habits');
      const parsedHabits = storedHabits ? JSON.parse(storedHabits) : [];
      const updatedHabits = parsedHabits.filter((_, i) => i !== index);
      await AsyncStorage.setItem('@habits', JSON.stringify(updatedHabits));

      console.log('Hábito eliminado:', { habitName, description, reminderTime });
      navigation.navigate('Mis Hábitos');
    } catch (e) {
      console.error('Error al eliminar el hábito:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Hábito</Text>
      <TextInput
        placeholder="Nombre del Hábito"
        style={styles.input}
        value={habitName}
        onChangeText={(text) => setHabitName(text)}
      />
      <TextInput
        placeholder="Descripción (opcional)"
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity
        style={styles.frequencyButton}
        onPress={() => navigation.navigate('EditFrecuencia')}
      >
        <Text style={styles.buttonText}>
          {habitData.frequency ? `Frecuencia: ${habitData.frequency}` : 'Frecuencia'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.buttonText}>
          {`Hora y recordatorio: ${reminderTime.getHours()}:${reminderTime.getMinutes().toString().padStart(2, '0')}`}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Eliminar" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  frequencyButton: {
    padding: 15,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  timeButton: {
    padding: 15,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
