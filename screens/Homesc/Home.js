// Home.js
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import CalendarComponent from '../../components/CalenderComponent';

const Home = ({ data = [], healthSummary }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Header Menu</Text>
      </View>
      <View style={styles.calendarContainer}>
        <CalendarComponent data={data} />
      </View>
      <View style={styles.ListContainer}>
        <Text style={styles.summaryTitle}>Recent Data</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 50,
  },
  calendarContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  headerText: {
    fontSize: 26,
    color: '#4a4a4a',
    fontWeight: 'bold',
  },
  ListContainer: {
    marginVertical: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 350,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
    alignSelf: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#e1a3a6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
