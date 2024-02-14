import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo icons or another icon library
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subcategories } from './DataList'; // Adjust the import path as necessary

const GraphModal = ({ isVisible, onClose, selectedSubcategory }) => {
  const [dataPoints, setDataPoints] = useState([]);

  // Dummy dimensions, replace with your own
  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('localData'); // Assume data is stored under 'localData'
      const dataList = result ? JSON.parse(result) : [];
      const filteredData = dataList.filter(item => item.subcategory === selectedSubcategory);

      // Process data for chart
      // This is an example, adjust based on how your data is structured
      const chartData = {
        labels: filteredData.map((_, index) => String(index)), // Example labels
        datasets: [
          {
            data: filteredData.map(item => item.value),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Optional
            strokeWidth: 2 // Optional
          }
        ]
      };
      setDataPoints(chartData);
    };

    fetchData();
  }, [selectedSubcategory]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Units against Time</Text>
          <LineChart
            data={dataPoints}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier // for smooth curves
          />
        </View>
        <FlatList
          data={dataPoints.datasets ? dataPoints.datasets[0].data : []} // Adjust based on your data structure
          renderItem={({ item, index }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>Value: {item}</Text> {/* Adjust rendering as needed */}
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default GraphModal;





const styles = StyleSheet.create({
    backButton: {
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 20,
    },
    chartContainer: {
      marginVertical: 20,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    dataListItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eaeaea',
    },
    dataListItemText: {
      fontSize: 16,
      color: '#333',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Additional styles for other elements can be added here
    });