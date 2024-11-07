// Archivo: src/screens/HabitListScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function HabitListScreen({ navigation }) {
  const habits = [
    { id: '1', name: 'Ejercicio Diario', streak: '3 días consecutivos' },
    { id: '2', name: 'Leer un Capítulo', streak: '3 días consecutivos' },
    { id: '3', name: 'Meditación', streak: '3 días consecutivos' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Hábitos</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitContainer}>
            <Text style={styles.habitName}>{item.name}</Text>
            <Text style={styles.habitStreak}>{item.streak}</Text>
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkButtonText}>✔</Text>
            </TouchableOpacity>
          </View>
        )}
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
  checkButton: {
    backgroundColor: '#d3d3d3',
    padding: 8,
    borderRadius: 8,
  },
  checkButtonText: {
    fontSize: 18,
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
