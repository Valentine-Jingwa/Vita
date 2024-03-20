import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import GraphModal from '../../components/GraphComp/Graph';
import DataStorage from '../../components/Datahandling/DataStorage';
import { subcategories as initialSubcategories } from '../../components/DataList';
import ColorId from '../../constants/ColorId';

export default function Viewing() {
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('categoryname');
  const [groupedSubcategories, setGroupedSubcategories] = useState({});

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedFilter]);

  const handleSubcategorySelect = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    const data = await DataStorage.getDataForSubcategory(subcategory.subcategory);
    setIsGraphModalVisible(data.length >= 0);

  };
  
  const applyFilters = async () => {
    let data = await Promise.all(initialSubcategories.map(async (sub) => {
      const entries = await DataStorage.getDataForSubcategory(sub.subcategory);
      return { ...sub, count: entries.length };
    }));

    if (searchQuery) {
      data = data.filter(item => item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const grouped = data.reduce((acc, item) => {
      (acc[item.categoryname] = acc[item.categoryname] || []).push(item);
      return acc;
    }, {});

    setGroupedSubcategories(grouped);
  };

  const sortData = (data, method) => {
    return [...data].sort((a, b) => {
      if (method === 'ascending') {
        return a.subcategory.localeCompare(b.subcategory);
      } else if (method === 'descending') {
        return b.subcategory.localeCompare(a.subcategory);
      }
      // No additional sort for 'categoryname', as grouping takes precedence
      return 0;
    });
  };

  const renderGroupedSubcategories = () => {
    return Object.entries(groupedSubcategories).map(([categoryName, subcategories], index) => (
      <View key={index} style={styles.categoryContainer}>
        <Text style={styles.categoryHeader}>{categoryName}</Text>
        {subcategories.map((sub, subIndex) => (
          <View key={subIndex} style={styles.subcategoryContainer}>
            <TouchableOpacity
              style={styles.subcategoryItem}
              onPress={() => handleSubcategorySelect(sub)}
            >
              <Text style={styles.subcategoryText}>{sub.subcategory}</Text>
            </TouchableOpacity>
            <View style={[styles.dot, { backgroundColor: ColorId.getColor(sub.id) }]}>
              <Text style={styles.dotText}>{sub.count > 999 ? "999+" : sub.count}</Text>
            </View>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchAndFilterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search subcategories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter(selectedFilter === 'categoryname' ? 'ascending' : 'categoryname')} // Toggle for demo
        >
          <Text>Toggle Filter</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>{renderGroupedSubcategories()}</ScrollView>
      {selectedSubcategory && (
        <GraphModal
          isVisible={isGraphModalVisible}
          onClose={() => setIsGraphModalVisible(false)}
          selectedSubcategory={selectedSubcategory.subcategory}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F8',
    paddingTop: '10%',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ddd',
    marginLeft: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#eee',
    padding: 10,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  subcategoryItem: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subcategoryText: {
    fontSize: 16,
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dotText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
