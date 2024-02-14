//SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GraphModal from './GraphComp/GraphModal';
import { subcategories } from './DataList'; // Import subcategories from DataList.js

const SearchBar = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setIsLoading(true);
    const newData = subcategories.filter((item) => {
      const itemData = item.subcategory ? item.subcategory.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="ios-search" size={20} color="gray" />
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setSelectedSubcategory(item.subcategory);
                setIsGraphModalVisible(true);
              }}
            >
              <Text style={styles.itemText}>{item.subcategory}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <GraphModal
        isVisible={isGraphModalVisible}
        onClose={() => setIsGraphModalVisible(false)}
        selectedSubcategory={selectedSubcategory}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
