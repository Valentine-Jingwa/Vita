import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SubcategoryDataModal = ({ visible, onClose, subcategoryName, graphData }) => {


  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{subcategoryName}</Text>
        
        {/* Conditional rendering based on graphData */}
        {graphData && graphData.datasets && graphData.datasets[0].data.length > 0 ? (
          <LineChart
            data={graphData}
            width={Dimensions.get('window').width - 32} // Adjusted for modal padding
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // Adjust as necessary
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Adjusted for better visibility
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
          <Text>No data available</Text>
        )}

        <Text style={styles.closeButton} onPress={onClose}>Close</Text>
      </View>
    </Modal>
  );
};
    

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center', // This line is duplicated; consider removing one
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
});

export default SubcategoryDataModal;
