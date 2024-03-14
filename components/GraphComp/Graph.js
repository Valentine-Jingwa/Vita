//Graph.js 
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Import LineChart from react-native-chart-kit
import DataStorage from '../Datahandling/DataStorage'; // Adjust this import according to your project structure
import ColorId from '../../constants/ColorId'; // Adjust the import path according to your project structure



const GraphModal = ({ isVisible, onClose, selectedSubcategory }) => {
  const [dataPoints, setDataPoints] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (isVisible && selectedSubcategory) {
      fetchDataForSubcategory(selectedSubcategory);
    }
  }, [isVisible, selectedSubcategory]);

  const fetchDataForSubcategory = async (subcategory) => {
    const data = await DataStorage.getDataForSubcategory(subcategory);
    // Assume subcategory or a derived ID here can be used with ColorId.getColor
    const dotColor = ColorId.getColor(subcategory.id); // Adjust this to get the correct ID
    if (data.length > 0) {
      const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const labels = sortedData.map(item => new Date(item.timestamp).toLocaleDateString());
      const datasets = [{ data: sortedData.map(item => Number(item.value) || 0) }];
      setDataPoints({ labels, datasets, dotColor }); // Store dotColor in state for access in LineChart config
    } else {
      setDataPoints({
        labels: [],
        datasets: [{ data: [] }],
        dotColor: '' // Default or fallback color could go here
      });
      console.log(dotColor); // Add this line after fetching the dotColor
    }
};

const numberOfDataPoints = dataPoints.labels.length;
const spacingBetweenPoints = 50; // This can be adjusted based on your design
const minimumChartWidth = Dimensions.get('window').width - 50; // Minimum width before scrolling is necessary
const calculatedChartWidth = Math.max(numberOfDataPoints * spacingBetweenPoints, minimumChartWidth);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Graph for {selectedSubcategory}</Text>
          {dataPoints.datasets[0].data.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={dataPoints}
              width={calculatedChartWidth}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#636373',
                backgroundGradientTo: '#636363',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: dataPoints.dotColor || '#636464', // Use the dotColor from state, with a fallback
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
          ) : (
            <View style={styles.placeholderGraph}>
              <Text>No Data Available</Text>
            </View>
          )}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closebtn}>Close</Text>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    padding: 0, // Remove padding for full-screen width and adjust as necessary for height
    alignItems: 'center',
    shadowColor: '#000',
  },
  placeholderGraph: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  closebtn: {
    backgroundColor: 'white',
    padding: 10,
    width: 100,
    marginTop: 15,
    marginBottom: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GraphModal;
