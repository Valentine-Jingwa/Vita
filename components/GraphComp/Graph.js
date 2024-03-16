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
      const data = await DataStorage.getDataForSubcategory(subcategoryName);
      // Ensure you have a valid ID before fetching the color
      const fetchedDotColor = subcategoryName ? ColorId.getColor(subcategoryName) : '#000'; // Default to black if no ID
  
      if (data && data.length > 0) {
        const formattedData = data.map(d => ({
          date: new Date(d.timestamp),
          value: Number(d.value)
        })).sort((a, b) => a.date - b.date);
  
        setDataPoints(formattedData);
        setDotColor(fetchedDotColor);
        console.log(formattedData);
      } else {
        console.log("No data found for subcategory:", subcategoryName);
      }

    } catch (error) {
      console.error("Error fetching data for subcategory:", error);
    }
  };

  const margins = { top: 30, right: 30, bottom: 50, left: 60 };
  const svgWidth = Dimensions.get('window').width - margins.left - margins.right;
  const svgHeight = 300 - margins.top - margins.bottom;


  let lineData = '';
  let xScale, yScale, yAxisTicks, xAxisTicks;

  if (dataPoints.length > 0) {
    // const margins = { top: 30, right: 30, bottom: 50, left: 60 };
    // const svgWidth = Dimensions.get('window').width;
    // const svgHeight = 300;
    const graphWidth = svgWidth - margins.left - margins.right;
    const graphHeight = svgHeight - margins.top - margins.bottom;

    xScale = d3.scaleTime()
      .domain(d3.extent(dataPoints, d => d.date))
      .range([0, graphWidth]);

      yScale = d3.scaleLinear()
      .domain([0, d3.max(dataPoints, d => d.value)])
      .range([graphHeight, 0]);

      const lineGenerator = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);


    lineData = lineGenerator(dataPoints);

        // Generate ticks for the axes
        yAxisTicks = yScale.ticks(5);
        xAxisTicks = xScale.ticks(5);

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
              <Line x1={0} y1={0} x2={0} y2={graphHeight} stroke={"#000"} />
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
            <Path d={lineData} stroke={"#ff0000"} strokeWidth={2} fill="none" />
            {dataPoints.map((point, index) => (
              <Circle
                key={index}
                cx={xScale(point.date)}
                cy={yScale(point.value)}
                r="3" // Radius of the circle
                fill={"#ff0000"}
              />
            ))}
          </G>
        </Svg>
        ) : (
          <Text>No data available</Text>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close</Text>
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
    marginTop: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
