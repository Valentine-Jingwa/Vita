//Graph.js 
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Import LineChart from react-native-chart-kit
import DataStorage from '../Datahandling/DataStorage'; // Adjust this import according to your project structure

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
    if (data.length > 0) {
      // Assuming data is an array of objects with properties `value` and `timestamp`
      const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const labels = sortedData.map(item => new Date(item.timestamp).toLocaleDateString());
      const datasets = [{ data: sortedData.map(item => Number(item.value) || 0) }];
      setDataPoints({ labels, datasets });
    } else {
      setDataPoints({
        labels: [],
        datasets: [{ data: [] }],
      });
    }
  };

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
            <LineChart
              data={dataPoints}
              width={Dimensions.get('window').width - 50} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#636373',
                backgroundGradientTo: '#636363',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
          ) : (
            <View style={styles.placeholderGraph}>
              <Text>No Data Available</Text>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
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
