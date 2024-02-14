
import { SafeAreaView, Text, View, StyleSheet, Dimensions, Button, TouchableOpacity  } from 'react-native';
import {React, useState, useEffect} from 'react';
import { LineChart } from 'react-native-chart-kit';
import SubcategoryDataModal from '../../components/SubcategoryDataModal';
import { subcategories } from '../../components/DataList'; 
import { useDataContext } from '../../components/DataContext';

const Viewing = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState([]);
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState('');
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
  const { dataPoints } = useDataContext();
  const [graphData, setGraphData] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);




  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSubcategoryModalVisible(true); // Show subcategory selection modal
  };


  const handleSubcategorySelect = (subcategory) => {
    // Find the subcategory data
    const subcategoryData = subcategories.find(sub => sub.id === subcategory.id);
    setSelectedSubcategoryId(subcategory.id);
    setSelectedSubcategoryData(subcategoryData?.data || []);
    setSelectedSubcategoryName(subcategoryData?.name || '');
    setModalVisible(true); // Show data modal
    setSubcategoryModalVisible(false); // Hide subcategory selection modal
  };

  useEffect(() => {
    // Check if there are data points for the selected subcategory
    if (dataPoints[selectedSubcategoryId]) {
      const values = dataPoints[selectedSubcategoryId];
      const labels = values.map((_, index) => String(index + 1)); // Simple 1-based index for labels
      const datasets = [{ data: values }];
      
      setGraphData({ labels, datasets });
    }
  }, [dataPoints, selectedSubcategoryId]); // React to changes in data or selected subcategory

  useEffect(() => {
    if (selectedSubcategoryId && dataPoints[selectedSubcategoryId]) {
      const subcategoryDataPoints = dataPoints[selectedSubcategoryId];
      const labels = subcategoryDataPoints.map((_, index) => `Point ${index + 1}`);
      const data = subcategoryDataPoints.map(point => point.value);
      
      setGraphData({
        labels,
        datasets: [
          {
            data,
            strokeWidth: 2, // Example strokeWidth
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Example color
          }
        ]
      });
    }
  }, [selectedSubcategoryId, dataPoints]);




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartContainer}>

      </View>

      <View style={styles.buttonContainer}>
        <Button title="Vitals" onPress={() => handleCategorySelect('Vitals')} />
        <Button title="Medication" onPress={() => handleCategorySelect('Medication')} />
        <Button title="Nutrition" onPress={() => handleCategorySelect('Nutrition')} />
        <Button title="Others" onPress={() => handleCategorySelect('Others')} />
      </View>


      {/* Subcategory Selection Modal */}
      {subcategoryModalVisible && (
        <View style={styles.modalView}>
          {subcategories.filter(subcat => subcat.categoryname === selectedCategory).map(subcat => (
            <TouchableOpacity key={subcat.id} onPress={() => handleSubcategorySelect(subcat)}>
              <Text style={styles.subcategoryButton}>{subcat.subcategory}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}



      <SubcategoryDataModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        subcategoryData={selectedSubcategoryData}
        subcategoryName={selectedSubcategoryName}
        graphData={graphData} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalView: {
    // Style for your subcategory selection modal
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  subcategoryButton: {
    // Style for your subcategory buttons within the modal
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  chartContainer: {
    marginVertical: 20, // Adjust spacing as needed
    alignItems: 'center',
    width: '95%', // Adjust width as needed
  },
});

export default Viewing;
