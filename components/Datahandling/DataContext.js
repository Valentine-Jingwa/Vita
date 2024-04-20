// Import necessary hooks from React for state management and context API usage.
import React, { createContext, useContext, useState } from 'react';

// Create a React Context for data handling across the component tree.
const DataContext = createContext();

/**
 * Custom hook to use the DataContext for accessing and manipulating data points.
 * @returns The context object with data and actions.
 */
export const useDataContext = () => useContext(DataContext);

/**
 * DataProvider component that encapsulates children components to provide them access to data context.
 * @param {Object} props - Props object containing children, the components wrapped by this provider.
 * @returns {JSX.Element} A Context Provider component encapsulating children.
 */
export const DataProvider = ({ children }) => {
  // State for storing data points, initialized with an empty object.
  const [dataPoints, setDataPoints] = useState({
    // This object will store subcategory IDs as keys and arrays of their corresponding values as values.
    // Example: '1': [120, 130, 140] for storing Blood Pressure readings.
  });

  /**
   * Function to add a data point to a specific subcategory.
   * @param {string} subcategoryId - The ID of the subcategory to which the data point belongs.
   * @param {number} value - The value to be added to the subcategory.
   */
  const addDataPoint = (subcategoryId, value) => {
    setDataPoints(prev => ({
      ...prev,
      // Append the new value to the existing array for the subcategory, or create a new array if none exists.
      [subcategoryId]: [...(prev[subcategoryId] || []), value],
    }));
  };

  // Providing the data and actions via the DataContext to the component tree.
  return (
    <DataContext.Provider value={{ dataPoints, addDataPoint }}>
      {children}
    </DataContext.Provider>
  );
};
