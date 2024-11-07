// Archivo: src/screens/FrequencyScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function FrequencyScreen({ navigation }) {
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);

  const handleNext = () => {
    if (selectedFrequency === 'Días específicos de la semana') {
      navigation.navigate('Recordatorio', { frequency: selectedFrequency, selectDays: true });
    } else {
      navigation.navigate('Recordatorio', { frequency: selectedFrequency });
    }
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const toggleDateSelection = (date) => {
    setSelectedDates((prevDates) =>
      prevDates.includes(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Con qué frecuencia quieres realizarlo?</Text>
      <View style={styles.optionsContainer}>
        {['Todos los días', 'Días específicos de la semana', 'Días específicos del mes'].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedFrequency === option && styles.selectedOption,
            ]}
            onPress={() => {
              setSelectedFrequency(option);
              if (option === 'Días específicos de la semana') {
                setIsModalVisible(true);
              } else if (option === 'Días específicos del mes') {
                setIsMonthModalVisible(true);
              }
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Anterior" onPress={() => navigation.navigate('Mis Hábitos')} />
        <Button title="Siguiente" onPress={handleNext} disabled={!selectedFrequency} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona los días de la semana</Text>
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
              <View key={index} style={styles.checkboxContainerAligned}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    selectedDays.includes(day) && styles.checkedCheckbox,
                  ]}
                  onPress={() => toggleDaySelection(day)}
                />
                <Text style={styles.checkboxLabel}>{day}</Text>
              </View>
            ))}
            <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMonthModalVisible}
        onRequestClose={() => setIsMonthModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona los días del mes</Text>
            <View style={styles.datesContainer}>
              {[...Array(31).keys()].map((date) => (
                <TouchableOpacity
                  key={date}
                  style={[
                    styles.dateButton,
                    selectedDates.includes(date + 1) && styles.selectedDateButton,
                  ]}
                  onPress={() => toggleDateSelection(date + 1)}
                >
                  <Text style={styles.dayButtonText}>{date + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button title="Cerrar" onPress={() => setIsMonthModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  option: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#d3d3d3',
  },
  optionText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  checkboxContainerAligned: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 3,
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#d3d3d3',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  dayButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#d3d3d3',
  },
  dayButtonText: {
    fontSize: 16,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  dateButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedDateButton: {
    backgroundColor: '#d3d3d3',
  },
});
