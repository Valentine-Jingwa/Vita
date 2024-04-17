import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../../screens/Settingsc/Theme';

const GraphModal = ({ isVisible, onClose, userData }) => {
  const { themeStyles } = useTheme();

  const prepareChartData = (data) => {
    const labels = data.map(item => {
      const date = new Date(item.timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });
    const values = data.map(item => parseFloat(item.value));
    const chartWidth = Dimensions.get('window').width * 0.9;  // Dynamic width based on screen size

    const chartData = {
      labels,
      datasets: [{ data: values }]
    };

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: themeStyles.background,
            backgroundGradientFrom: themeStyles.background,
            backgroundGradientTo: themeStyles.background,
            decimalPlaces: 2,
            color: () => themeStyles.text.color,
            labelColor: () => themeStyles.text.color,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: themeStyles.accent.color,
            }
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>
    );
  };

  const prepareTextualData = (data) => {
    return (
      <ScrollView style={styles.dataList}>
        {data.map((item, index) => (
          <View key={index} style={styles.textItem}>
            <Text>Date: {new Date(item.timestamp).toLocaleDateString()}</Text>
            <Text>Data: {item.value}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const content = userData.every(item => !isNaN(item.value)) ? prepareChartData(userData) : prepareTextualData(userData);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={onClose}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={themeStyles.text.color} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: themeStyles.text.color }]}>Graph for {userData[0]?.subcategory}</Text>
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
  modalView: {
    width: '90%',
    minHeight: '50%',
    maxHeight: '80%',
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
    alignSelf: 'flex-end',
    marginTop: 5,
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  scrollView: {
    flexGrow: 0,
    width: '100%',
    height: 400
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  dataList: {
    maxHeight: 200
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
  }
});

export default GraphModal;
