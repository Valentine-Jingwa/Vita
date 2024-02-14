import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';
import CalendarComponent from '../../components/CalendarComponent';
import DataStorage from '../../components/DataStorage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import ColorId from '../../constants/ColorId';
import TimeCalculator from '../../components/TimeCalculator';
import DataModal from '../../components/DataModal';
import DataCard from '../../components/Home/DataCard';

const Home = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [dayData, setDayData] = useState([]);


  const fetchData = async () => {
    const storedData = await DataStorage.Retrieve();
    if (storedData) {
      // Make sure each item in storedData has a 'date' property
      const formattedData = storedData.map(item => ({
        ...item,
        date: item.date || '', // Provide an empty string if date is undefined
      }));
      setData(Array.isArray(formattedData) ? formattedData : [formattedData]);
    }
  };
  
  const handleDayPress = (dateString) => {
    // Format the date to 'YYYY-MM-DD' if it's not already in that format
    const formattedDateString = dateString.includes('T') ? dateString.split('T')[0] : dateString;
  
    // Filter the data to match the selected day
    const filteredDayData = data.filter((item) => item.date && typeof item.date === 'string' && item.date.startsWith(formattedDateString));
    
    setDayData(filteredDayData);
    setSelectedDay(formattedDateString);
    setModalVisible(true);
  };
  
  
  

  // Function to format the day information
  const getDayInfo = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
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
      <View style={styles.calendarContainer}>

        <CalendarComponent data={data} onDayPress={handleDayPress} />
      </View>
      <View style={styles.ListContainer}>
        <Text style={styles.summaryTitle}>Recent Data</Text>
        <ScrollView style={styles.homescroll}>
          {data.map((item, index) => (

            <DataCard key={index} item={item} />
          ))}
          <DataModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            dayData={dayData}
            dayInfo={getDayInfo(selectedDay)}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    marginVertical: 5,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff0000', // This should come from your ColorId component
    marginRight: 10,
  },
  contentBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subcatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueunit: {
    fontSize: 14,
    color: '#333',
  },
  dataText: {
    fontSize: 14,
    color: '#333',
  },
  calendarContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 20,
    height: 300,
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
    height: '40%',
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
