// Viewing.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar';
import GraphModal from '../../components/GraphComp/Graph'; // Adjust the import path for GraphModal

export default function Viewing() {
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsGraphModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSubcategorySelect={handleSubcategorySelect} />
      <GraphModal
        isVisible={isGraphModalVisible}
        onClose={() => setIsGraphModalVisible(false)}
        selectedSubcategory={selectedSubcategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
