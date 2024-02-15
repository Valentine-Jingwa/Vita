// SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { subcategories } from './DataList'; // Adjust this path as necessary

const SearchBar = ({ onSubcategorySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(subcategories);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setIsLoading(true);

    // Filter subcategories based on the search query
    const newData = subcategories.filter(item => {
      const itemData = `${item.subcategory}`.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilteredData(newData);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="ios-search" size={20} color="#000" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSubcategorySelect(item.subcategory)}
            >
              <Text style={styles.itemText}>{item.subcategory}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchBar;
