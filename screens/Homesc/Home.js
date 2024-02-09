import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';
import CalendarComponent from '../../components/CalendarComponent';
import DataStorage from '../../components/DataStorage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const storedData = await DataStorage.Retrieve();
    if (storedData) {
      setData(Array.isArray(storedData) ? storedData : [storedData]);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

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
        <ScrollView style={styles.homescroll}>
          {data.map((item, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>ID: {item.id}</Text>
              <Text style={styles.dataText}>Value: {item.value}</Text>
              <Text style={styles.dataText}>Unit: {item.unit}</Text>
              <Text style={styles.dataText}>Category: {item.subcategory}</Text>
              <Text style={styles.dataText}>Timestamp: {item.timestamp}</Text>
            </View>
          ))}
        </ScrollView>
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
  dataBox: {
    backgroundColor: '#eaeaea',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dataText: {
    fontSize: 14,
    color: '#333',
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
  homescroll: {
    width: '100%',
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
  summaryTextContainer: {
    marginBottom: 10,
  },
  // Add or adjust styles as needed
});

export default Home;
