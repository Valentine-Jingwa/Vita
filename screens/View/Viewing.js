import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import GraphModal from '../../components/GraphComp/Graph';
import DataStorage from '../../components/Datahandling/DataStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../Settingsc/Theme';
import ColorId from '../../constants/ColorId';

export default function Viewing() {
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('categoryname');
  const [groupedSubcategories, setGroupedSubcategories] = useState({});

  const { themeStyles } = useTheme();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('subcategories');
        const data = jsonValue != null ? JSON.parse(jsonValue) : [];
        applyFilters(data);
      } catch (e) {
        console.error('Failed to fetch the data from storage', e);
      }
    };

    fetchSubcategories();
  }, [searchQuery, selectedFilter]);

  const applyFilters = async (initialSubcategories) => {
    const dataWithCounts = await Promise.all(initialSubcategories.map(async (sub) => {
      const entries = await DataStorage.getDataForSubcategory(sub.subcategory);
      return { ...sub, count: entries.length };
    }));

    const filteredData = searchQuery
      ? dataWithCounts.filter(item => item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
      : dataWithCounts;

    const grouped = filteredData.reduce((acc, item) => {
      (acc[item.categoryname] = acc[item.categoryname] || []).push(item);
      return acc;
    }, {});

    setGroupedSubcategories(grouped);
  };

  const handleSubcategorySelect = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    const data = await DataStorage.getDataForSubcategory(subcategory.subcategory);
    setIsGraphModalVisible(data.length > 0);
  };

  const renderGroupedSubcategories = () => {
    return Object.entries(groupedSubcategories).map(([categoryName, subcategories], index) => (
      <View key={index} style={[styles.categoryContainer, { backgroundColor: themeStyles.background, shadowColor: themeStyles.text }]}>
        <Text style={[styles.categoryHeader, { color: themeStyles.text, borderBottomColor: themeStyles.secondary }]}>
          {categoryName}
        </Text>
        {subcategories.map((sub, subIndex) => (
          <TouchableOpacity key={subIndex} style={[styles.subcategoryContainer, { backgroundColor: themeStyles.background }]}
            onPress={() => handleSubcategorySelect(sub)}>
            <Text style={[styles.subcategoryText, { color: themeStyles.text }]}>{sub.subcategory}</Text>
            <View style={[styles.dot, { backgroundColor: ColorId.getColor(sub.id) }]}>
              <Text style={styles.dotText}>{sub.count > 999 ? "999+" : sub.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={styles.searchAndFilterContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.secondary, color: themeStyles.text }]}
          placeholder="Search..."
          placeholderTextColor={themeStyles.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: themeStyles.background, shadowColor: themeStyles.text }]}
          onPress={() => setSelectedFilter(selectedFilter === 'categoryname' ? 'ascending' : 'categoryname')}>
          <Text style={{ color: themeStyles.text }}>Toggle Filter</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {renderGroupedSubcategories()}
      </ScrollView>
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
    backgroundColor: '#F5F6FA',
    paddingTop: '5%',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingVertical: 30,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryContainer: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryHeader: {
    fontWeight: '700',
    fontSize: 20,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E9ED',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  subcategoryItem: {
    flex: 1,
  },
  subcategoryText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#333',
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    left:11,
  },
  dotText: {
    color: 'white',
    fontWeight: 'bold',
  },
});