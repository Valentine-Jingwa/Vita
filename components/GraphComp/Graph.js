// GraphModal.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DataStorage from '../Datahandling/DataStorage';

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
    const labels = sortedData.map(item => new Date(item.timestamp).toLocaleDateString());
    const chartData = {
      labels,
      datasets: [{ data: sortedData.map(item => parseFloat(item.value)) }],
    };
    setContent(
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width * 0.9}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Data for {selectedSubcategory}</Text>
          {content}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: 'auto',
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
    marginTop: 15,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
