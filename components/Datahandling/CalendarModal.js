// // Importing necessary modules from React and React Native for UI rendering.
// import React from 'react';
// import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// // Import custom components and utilities
// import DataStorage from './DataStorage'; // Utility for handling data storage operations
// import ColorId from '../../constants/ColorId'; // Component to display color based on an identifier
// import TimeCalculator from '../Home/TimeCalculator'; // Component to compute time-related values

// /**
//  * CalendarModal component displays a modal with details for a specific day.
//  * It shows items like tasks or events using a scrollable layout.
//  *
//  * @param {boolean} isVisible - Controls the visibility of the modal.
//  * @param {function} onClose - Function to call when closing the modal.
//  * @param {Array} dayData - Array containing the day's data to display.
//  * @param {string} dayInfo - Information about the day, displayed as the modal's title.
//  */
// const CalendarModal = ({ isVisible, onClose, dayData, dayInfo }) => {
//   return (
//     <Modal
//       visible={isVisible}
//       animationType="slide"
//       onRequestClose={onClose}
//       transparent={true}
//     >
//       <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>{dayInfo}</Text>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeButtonText}>Exit</Text>
//           </TouchableOpacity>
//           <ScrollView style={styles.scrollView}>
//             {dayData.map((item, index) => (
//               <View key={index} style={styles.dataBox}>
//                 <ColorId id={item.id} />
//                 <View style={styles.contentBox}>
//                   <Text style={styles.subcatName}>{item.subcategory}</Text>
//                   <Text style={styles.valueunit}>{item.value} {item.unit}</Text>
//                   <TimeCalculator timestamp={item.timestamp} />
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// // Styles for the CalendarModal component
// const styles = StyleSheet.create({
//     modalOverlay: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background for overlay
//     },
//     modalContent: {
//       width: '90%', // Modal width as a percentage of screen width
//       backgroundColor: 'white', // Background color for the modal content
//       borderRadius: 10, // Rounded corners for aesthetic appeal
//       padding: 20, // Padding around the content inside the modal
//       alignItems: 'center', // Center-align items within the modal
//       shadowColor: '#000', // Shadow color for depth effect
//       shadowOffset: { width: 0, height: 2 }, // Direction and distance of shadow
//       shadowOpacity: 0.25, // Opacity of shadow
//       shadowRadius: 3.84, // Blur radius of shadow
//       elevation: 5, // Elevation for Android to lift the element
//     },
//     modalTitle: {
//       fontSize: 20,
//       fontWeight: 'bold', // Bold font weight for the title
//       color: '#333', // Color of the title text
//       marginBottom: 20, // Space below the title
//     },
//     closeButton: {
//       position: 'absolute', // Positioning the button absolutely within the parent
//       right: 10, // Position from the right
//       top: 10, // Position from the top
//       padding: 10, // Padding around the button for tappable area
//     },
//     closeButtonText: {
//       fontSize: 18,
//       fontWeight: 'bold', // Bold text for better visibility
//       color: 'black', // Text color
//     },
//     scrollView: {
//       width: '100%', // Full width to ensure it occupies all space available horizontally
//     },
//     dataBox: {
//       flexDirection: 'row', // Layout children in a row
//       alignItems: 'center', // Align children in the center vertically
//       padding: 15, // Padding inside each data box
//       borderBottomWidth: 1, // Border at the bottom of each box
//       borderBottomColor: '#eaeaea', // Color of the border line
//       marginBottom: 10, // Margin below each box for spacing
//     },
//     contentBox: {
//       marginLeft: 10, // Margin to the left of the content box
//       flex: 1, // Flex property to take up remaining space
//     },
//     subcatName: {
//       fontSize: 18,
//       fontWeight: 'bold', // Bold text for subcategory names
//       color: '#333', // Color for text
//       marginBottom: 5, // Space below the subcategory name
//     },
//     valueunit: {
//       fontSize: 16,
//       color: '#666', // Lighter color for value and unit text
//       marginBottom: 5, // Space below the value and unit
//     },
//   });

// // Exporting CalendarModal as a default export for use in other parts of the application.
// export default CalendarModal;
