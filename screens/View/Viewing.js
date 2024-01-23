
import { SafeAreaView, Text, View, StyleSheet, Dimensions, Button  } from 'react-native';


import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useData } from '../../components/DataContext';

const Viewing = () => {
  const { data } = useData();
  const [selectedCategory, setSelectedCategory] = React.useState('vitals');

  const chartData = {
    labels: ["70", "90", "110", "130", "150", "170"],
    datasets: [
      {
        data: data[selectedCategory]?.data || [], // Fallback to an empty array if data is undefined
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}> 
        <Button title="Vitals" onPress={() => setSelectedCategory('vitals')} />
        <Button title="Medication" onPress={() => setSelectedCategory('medication')} />
        <Button title="Nutrition" onPress={() => setSelectedCategory('nutrition')} />
        <Button title="Others" onPress={() => setSelectedCategory('others')} />
      </View>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 16} // Width of the screen minus some margin
        height={220}
        chartConfig={{
          backgroundColor: '#',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8, // Add padding for some spacing around the chart
  }
});

export default Viewing;