// GraphModal.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Includes} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DataStorage from '../Datahandling/DataStorage';
import { AntDesign } from '@expo/vector-icons';

const GraphModal = ({ isVisible, onClose, selectedSubcategory }) => {
  const [content, setContent] = useState(null);



  useEffect(() => {
    fetchDataForSubcategory();
  }, [isVisible, selectedSubcategory]);

  const fetchDataForSubcategory = async () => {
    if (!isVisible) return;
    const data = await DataStorage.getDataForSubcategory(selectedSubcategory);
    
    if (!data || data.length === 0) {
      setContent(<Text style={styles.noDataText}>No Data Available</Text>);
      return;
    }

    const isNumeric = data.every(item => !isNaN(item.value));
    if (isNumeric) {
      prepareChartData(data);
    } else {
      prepareTextualData(data);
    }
  };

  const prepareChartData = (data) => {
    const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const labels = sortedData.map(item => {
      const date = new Date(item.timestamp);
      return `${date.getDate()} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    });
  
    const values = sortedData.map(item => parseFloat(item.value));
  
    const chartWidth = Math.max(labels.length * 80, Dimensions.get('window').width);
  
    const chartData = {
      labels,
      datasets: [{ data: values }],
    };
  
    setContent(
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0, width: '100%', height: 400 }}
      contentContainerStyle={{ alignItems: 'center' }}
    >
        <LineChart
          data={chartData}
          width={chartWidth} // Use the dynamic width
          height={400}
          // height={Dimensions.get('window').height * 0.4}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: () => `rgba(0, 0, 0, 1)`,
            labelColor: (opacity = 1, index) => index % 2 === 0 ? `rgba(255, 0, 0, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '1',
              stroke: 'blue',
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    );
  };
  
  
  

  const prepareTextualData = (data) => {
    const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setContent(
      <ScrollView style={{ maxHeight: 200 }}>
        {sortedData.map((item, index) => (
          <View key={index} style={styles.textItem}>
            <Text>Date: {new Date(item.timestamp).toLocaleDateString()}</Text>
            <Text>Data: {item.value}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1} // Maintain the overlay's visibility when pressed
      onPressOut={onClose} // Close the modal when the overlay is pressed
      >
      <View
      style={styles.modalView}
      onStartShouldSetResponder={() => true} // Prevents the overlay's onPress event from triggering when the modal view is interacted with
      >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Data for {selectedSubcategory}</Text>
          {content}
        </View>
    </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    minHeight: '50%', // Ensure the modal has a minimum height
    maxHeight: '80%', // Adjust the height as needed
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    marginTop: 5,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',

  },
  closeButtonText: {
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  textItem: {
    padding: 10,
    marginVertical: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
  },
});

export default GraphModal;