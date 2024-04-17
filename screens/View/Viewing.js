import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import GraphModal from '../../components/GraphComp/Graph';
import DataStorage from '../../components/Datahandling/DataStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../Settingsc/Theme';
import ColorId from '../../constants/ColorId';
import { useUser } from '../../UserContext';


const FILTER_OPTIONS = {
  SHOW_ALL: 'Show All',
  ALPHABETICAL_ASC: 'A-Z',
  ALPHABETICAL_DESC: 'Z-A',
  MOST_DATA: 'Most Data',
  RECENT_DATA: 'Recent Data'
};

export default function Viewing() {
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS.SHOW_ALL);
  const [groupedSubcategories, setGroupedSubcategories] = useState({});

  const { themeStyles } = useTheme();
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchSubcategories = async () => {
      const jsonValue = await AsyncStorage.getItem('localData');
      const data = jsonValue ? JSON.parse(jsonValue) : [];
      applyFilters(data);
    };
    fetchSubcategories();
  }, [searchQuery, selectedFilter, currentUser]);
  
  const applyFilters = (initialSubcategories) => {
    let filteredData = initialSubcategories.filter(item =>
      item.dataOwner === currentUser.username &&
      item.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (selectedFilter) {
      case FILTER_OPTIONS.ALPHABETICAL_ASC:
        filteredData.sort((a, b) => a.subcategory.localeCompare(b.subcategory));
        break;
      case FILTER_OPTIONS.ALPHABETICAL_DESC:
        filteredData.sort((a, b) => b.subcategory.localeCompare(a.subcategory));
        break;
      case FILTER_OPTIONS.MOST_DATA:
        filteredData.sort((a, b) => b.count - a.count);
        break;
      case FILTER_OPTIONS.RECENT_DATA:
        filteredData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
    }

    const grouped = filteredData.reduce((acc, item) => {
      const categoryKey = item.categoryname;
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push({
        ...item,
        count: 1 // Initialize or adjust based on actual data structure
      });
      return acc;
    }, {});

    setGroupedSubcategories(grouped);
  };

   
  const toggleFilter = () => {
    const filters = Object.values(FILTER_OPTIONS);
    const currentIndex = filters.indexOf(selectedFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    setSelectedFilter(filters[nextIndex]);
  };
   
  const handleSubcategorySelect = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    const data = await DataStorage.getDataForSubcategory(subcategory.subcategory);
    const filteredData = data.filter(d => d.dataOwner === currentUser.username);
    setUserData(filteredData);
    setIsGraphModalVisible(true);
  };
  
  const renderGroupedSubcategories = () => {
    if (Object.keys(groupedSubcategories).length === 0) {
      return <Text style={styles.noDataText}>No data here yet.</Text>;
    }
    return Object.entries(groupedSubcategories).map(([categoryName, subcategories], index) => (
      <View key={index} style={[styles.categoryContainer, { backgroundColor: themeStyles.background }]}>
        <Text style={[styles.categoryHeader, { color: themeStyles.text }]}>{categoryName}</Text>
        {subcategories.map((sub, subIndex) => (
          <TouchableOpacity key={subIndex} style={[styles.subcategoryContainer, { backgroundColor: themeStyles.background }]}
            onPress={() => handleSubcategorySelect(sub)}>
            <Text style={[styles.subcategoryText, { color: themeStyles.text }]}>{sub.subcategory}</Text>
            <View style={[styles.dot, { backgroundColor: ColorId.getColor(sub.id) }]}>
              <Text style={styles.dotText}>{sub.count > 999 ? "999+" : sub.count || 'No Data'}</Text>
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
          style={[styles.filterButton, { backgroundColor: themeStyles.background }]}
          onPress={toggleFilter}>
          <Text style={{ color: themeStyles.text }}>{selectedFilter}</Text>
        </TouchableOpacity>

      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 55, 
        }}
        >
        {renderGroupedSubcategories()}
      </ScrollView>
      {selectedSubcategory && (
        <GraphModal
          isVisible={isGraphModalVisible}
          onClose={() => setIsGraphModalVisible(false)}
          userData={userData}
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
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 200,
    color: '#666',
  },
});