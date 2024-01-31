
import { SafeAreaView, Text, View, StyleSheet, Dimensions, Button, TouchableOpacity  } from 'react-native';
import {React, useState} from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useData } from '../../components/DataContext';
import SubcategoryDataModal from '../../components/SubcategoryDataModal';
import { subcategories } from '../../components/DataList'; 


const Viewing = () => {
  const { data } = useData();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState([]);
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState('');
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSubcategoryModalVisible(true); // Show subcategory selection modal
  };


  const handleSubcategorySelect = (subcategory) => {
    // Find the subcategory data
    const subcategoryData = subcategories.find(sub => sub.id === subcategory.id);
    setSelectedSubcategoryData(subcategoryData?.data || []);
    setSelectedSubcategoryName(subcategoryData?.name || '');
    setModalVisible(true); // Show data modal
    setSubcategoryModalVisible(false); // Hide subcategory selection modal
  };

  return (
    <SafeAreaView style={styles.container}>
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
});

export default Viewing;
