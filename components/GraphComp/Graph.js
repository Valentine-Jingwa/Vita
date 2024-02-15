// GraphModal.js
import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import DataStorage from '../Datahandling/DataStorage'; // Adjust this path as necessary

const GraphModal = ({ isVisible, onClose, selectedSubcategory }) => {
  const [dataPoints, setDataPoints] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming DataStorage has a method to fetch data for a subcategory
        const rawData = await DataStorage.getDataForSubcategory(selectedSubcategory);
        console.log("Raw data fetched:", rawData);
  
        // Assuming rawData needs to be processed to fit into filteredData's structure
        const filteredData = rawData.map(/* your data processing logic here */);
  
        const chartData = {
          labels: filteredData.map((_, index) => `Point ${index + 1}`),
          datasets: [{
            data: filteredData.map(item => parseFloat(item.value)),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }]
        };
  
        if (!chartData.datasets[0].data.every(value => value !== undefined && !isNaN(value))) {
          console.error("Data array contains non-numeric or undefined values.");
          // Handle the error appropriately, maybe set an error state to show a message to the user
        } else {
          setDataPoints(chartData);
        }
      } catch (error) {
        console.error("Failed to fetch or process data:", error);
        // Handle the error appropriately, maybe set an error state to show a message to the user
      }
    };
  
    if (selectedSubcategory) fetchData();
  }, [selectedSubcategory]);
  
  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundColor: '#000',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Units against Time</Text>
        <LineChart
          data={dataPoints}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 40,
    padding: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Additional styles
});

export default GraphModal;
