import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import GraphModal from './GraphComp/Graph';

const SubcategoryDataModal = ({ visible, onClose, subcategoryName, subcategoryId }) => {


  console.log(`Subcategory Data Modal: ${subcategoryName}, ID: ${subcategoryId}`);
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{subcategoryName}</Text>
        
        {/* Render the custom GraphModal here */}
        <GraphModal
        isVisible={visible}
        onClose={onClose}
        selectedSubcategory={subcategoryName} // Assuming subcategoryName is the name of the subcategory
        />


        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

    

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center', // This line is duplicated; consider removing one
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default SubcategoryDataModal;
