// Archivo: src/screens/HabitListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HabitListScreen({ navigation }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const storedHabits = await AsyncStorage.getItem('@habits');
        const parsedHabits = storedHabits ? JSON.parse(storedHabits) : [];

        const validHabits = parsedHabits.filter(habit => habit.habitName && habit.habitName.trim() !== "");
        setHabits(validHabits);
        console.log('Hábitos cargados:', validHabits);
      } catch (e) {
        console.error('Error al cargar los hábitos:', e);
      }
    };

    loadHabits();
    const unsubscribe = navigation.addListener('focus', loadHabits);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Hábitos</Text>
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.habitContainer}
            onPress={() => navigation.navigate('Editar Hábito', { habit: item, index })}
          >
            <Text style={styles.habitName}>{item.habitName}</Text>
            <Text style={styles.habitStreak}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes hábitos registrados aún.</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Registrar Hábito')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  habitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 12,
  },
  habitName: {
    fontSize: 18,
  },
  habitStreak: {
    fontSize: 14,
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
