import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as d3 from 'd3';
import { Svg, Path, G, Rect, Circle, Line, Text } from 'react-native-svg';
import DataStorage from '../Datahandling/DataStorage';
import ColorId from '../../constants/ColorId';







const GraphModal = ({ isVisible, onClose, selectedSubcategory }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [dotColor, setDotColor] = useState('#000'); // Default color

  useEffect(() => {
    if (isVisible && selectedSubcategory) {
      fetchDataForSubcategory(selectedSubcategory);
    }
  }, [isVisible, selectedSubcategory]);

  const fetchDataForSubcategory = async (subcategoryName) => {
    try {
      console.log("fetchDataForSubcategory called with:", subcategoryName);

      const fetchedDotColor = subcategoryName ? ColorId.getColor(subcategoryName) : '#000'; // Default to black if no ID
      const data = await DataStorage.getDataForSubcategory(subcategoryName);
      if (data && data.length > 0) {
        // Step 1: Fetch the data for the subcategory
        const formattedData = data.map(d => ({
          date: new Date(d.timestamp),
          value: Number(d.value)
        })).sort((a, b) => a.date - b.date);

        // Step 2: Process the fetched data with aggregateDataByDay
        const aggregatedData = aggregateDataByDay(formattedData);

        if (aggregatedData.length > 0) {
          // Step 3: Use the processed data to set your scales and axes in your D3 graph
          setDataPoints(aggregatedData);
          setDotColor(fetchedDotColor);
          console.log(aggregatedData);
        } else {
          console.log("No data found for subcategory:", subcategoryName);
        }
      } else {
        console.log("No data found for subcategory:", subcategoryName);
      }
    } catch (error) {
      console.error("Error fetching data for subcategory:", error);
    }
  };

  const aggregateDataByDay = (data) => {
    const validData = data.filter(d => d.timestamp);
    const contributionsByDay = validData.reduce((acc, {timestamp, value}) => {
      if (!timestamp) {
        console.warn('Encountered an entry without a timestamp:', timestamp, value);
        return acc;
      }
      
      const dateKey = timestamp.split('T')[0];
      if (!acc[dateKey]){ 
        acc[dateKey] = 0;
      }
      acc[dateKey] += Number(value);
      return acc;
    }, {});
  
    return Object.entries(contributionsByDay).map(([date, sum]) => ({
      date: new Date(date),
      value: sum
    }));
  };



  const margins = { top: 0, right: 0, bottom: 5, left: 60 };
  const fullWidth = 300;
  const fullHeight = 300;

  const svgWidth = fullWidth;
  const svgHeight = fullHeight;
  const graphWidth = fullWidth - margins.left - margins.right;
  const graphHeight = fullHeight - margins.top - margins.bottom;


  let xScale, yScale, yAxisTicks, xAxisTicks;

  if (dataPoints.length > 0) {

    xScale = d3.scaleBand() // Use scaleBand for discrete domain
    .domain(dataPoints.map(d => d.date)) // Use dataPoints here
    .rangeRound([0, graphWidth])
    .padding(0.1);

      yScale = d3.scaleLinear()
      .domain([0, d3.max(dataPoints, d => d.value)])
      .range([graphHeight, 0]);

      const lineGenerator = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

        // Generate ticks for the axes
        yAxisTicks = yScale.ticks(5).reverse();
        xAxisTicks = xScale.ticks(5);


    lineData = lineGenerator(dataPoints);


    console.log(`SVG Path Data: `, lineData); // Check the path data
    console.log(`X Scale domain: `, xScale.domain(), `Range: `, xScale.range()); // Debug scale setup
    console.log(`Y Scale domain: `, yScale.domain(), `Range: `, yScale.range()); // Debug scale setup
  }

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        {dataPoints.length > 0 ? (
          <Svg width={svgWidth} height={svgHeight} style={{ backgroundColor: 'lightgrey' }}>
            <G translate={`translate(${margins.left},${margins.top})`}>
              {/* Draw Y-axis Line */}
              <Line x1={1} y1={1} x2={1} y2={graphHeight} stroke={"#000"} />
              {/* Draw X-axis Line */}
              <Line x1={0} y1={graphHeight} x2={graphWidth} y2={graphHeight} stroke={"#000"} />
  
              {/* Y-axis Ticks and Labels */}
              {yAxisTicks && yAxisTicks.map((tickValue, index) => (
                <G key={index} translate={`translate(0, ${yScale(tickValue)})`}>
                  <Line x1={-5} y1={0} x2={0} y2={0} stroke={"#000"} />
                  <Text x={-10} y={5} fontSize="10" textAnchor="end">
                    {tickValue}
                  </Text>
                </G>
              ))}
  
              {/* X-axis Ticks and Labels */}
              {xAxisTicks && xAxisTicks.map((tickValue, index) => (
                <G key={index} translate={`translate(${xScale(tickValue)}, ${graphHeight})`}>
                  <Line x1={0} y1={0} x2={0} y2={5} stroke={"#000"} />
                  <Text y={20} fontSize="10" textAnchor="middle">
                    {d3.timeFormat("%m/%d")(tickValue)}
                  </Text>
                </G>
              ))}
  
              {dataPoints.map((point, index) => (
                <Rect
                  key={index}
                  x={xScale(point.date)}
                  y={yScale(point.value)}
                  width={xScale.bandwidth()} // Provided by scaleBand
                  height={graphHeight - yScale(point.value)}
                  fill={dotColor}
                />
              ))}
            </G>
          </Svg>
        ) : (
          <Text>No data available</Text>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default GraphModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 50, // Adjust this value to place it below the graph
    right: 20,
    backgroundColor: 'red', // or any color that stands out from the graph background
    padding: 10, // Add padding for better touch area
    borderRadius: 5, // Optional for rounded corners
    elevation: 3, // Optional for Android to give it some shadow
  },
});