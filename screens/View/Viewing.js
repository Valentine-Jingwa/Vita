// Viewing.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import GraphModal from '../../components/GraphComp/Graph';
import DataStorage from '../../components/Datahandling/DataStorage'; 
import { subcategories } from '../../components/DataList'; 
import { useTheme } from '../Settingsc/Theme';

export default function Viewing() {
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState(subcategories);

  const { theme, toggleTheme } = useTheme();

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
  };

  useEffect(() => {
    // Initial fetch or setup code if needed
  }, []);

  const handleSubcategorySelect = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    const data = await DataStorage.getDataForSubcategory(subcategory);
    if (data.length === 0) {
      // Handle empty data scenario
      console.log('No data available for this subcategory');
      // setIsGraphModalVisible(true);
    } else {
      setIsGraphModalVisible(true);
    }
  };

  const renderSubcategory = ({ item }) => (
    <TouchableOpacity
      style={styles.subcategoryItem}
      onPress={() => handleSubcategorySelect(item.subcategory)}>
      <Text style={styles.subcategoryText}>{item.subcategory}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    const filteredData = subcategories.filter(item =>
      item.subcategory.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSubcategories(filteredData);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeStyles.backgroundColor}]}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredSubcategories}
        renderItem={renderSubcategory}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Adjust based on your layout preference
      />
      <GraphModal
        isVisible={isGraphModalVisible}
        onClose={() => setIsGraphModalVisible(false)}
        selectedSubcategory={selectedSubcategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F8',
  },
  subcategoryItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  subcategoryText: {
    fontSize: 16,
  },
});
