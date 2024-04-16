import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import GraphModal from '../../components/GraphComp/Graph';
import DataStorage from '../../components/Datahandling/DataStorage';
import { readData } from '../../components/DataList';
import { useTheme } from '../Settingsc/Theme';


export default function Viewing() {
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('categoryname');
  const [groupedSubcategories, setGroupedSubcategories] = useState({});

  const { themeStyles } = useTheme();


  useEffect(() => {
    const fetchSubcategories = async () => {
      const data = await readData();
      if (data) {
        applyFilters(data);
      }
    };

    fetchSubcategories();
  }, [searchQuery, selectedFilter]); // Depend on external changes

  const handleSubcategorySelect = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    const data = await DataStorage.getDataForSubcategory(subcategory.subcategory);
    setIsGraphModalVisible(data.length >= 0);

  };
  
  const applyFilters = (initialSubcategories) => {
    let data = initialSubcategories.map((sub) => {
      const entries = DataStorage.getDataForSubcategory(sub.subcategory); // This should ideally be awaited
      return { ...sub, count: entries.length };
    });

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
      <View key={index} style={[styles.categoryContainer, { backgroundColor: themeStyles.background, shadowColor: themeStyles.text }]}>
        <Text style={[styles.categoryHeader, { color: themeStyles.text, borderBottomColor: themeStyles.secondary }]}>
          {categoryName}
        </Text>
        {subcategories.map((sub, subIndex) => (
          <View key={subIndex} style={[styles.subcategoryContainer, { backgroundColor: themeStyles.background }]}>
            <TouchableOpacity
              style={styles.subcategoryItem}
              onPress={() => handleSubcategorySelect(sub)}
            >
              <Text style={[styles.subcategoryText, { color: themeStyles.text }]}>{sub.subcategory}</Text>
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
          onPress={() => setSelectedFilter(selectedFilter === 'categoryname' ? 'ascending' : 'categoryname')}
        >
          <Text style={{ color: themeStyles.text }}>Toggle Filter</Text>
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
    backgroundColor: '#F5F6FA',
    paddingTop: '5%',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    padding: 16,
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
  },
  dotText: {
    color: 'white',
    fontWeight: 'bold',
  },
});