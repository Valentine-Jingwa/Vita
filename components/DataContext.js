// DataContext.js

import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Example structure for storing data points
  const [dataPoints, setDataPoints] = useState({
    // Subcategory ID as key, array of values as value
    // '1': [120, 130, 140], // Example for Blood Pressure
  });

  const addDataPoint = (subcategoryId, value) => {
    setDataPoints(prev => ({
      ...prev,
      [subcategoryId]: [...(prev[subcategoryId] || []), value],
    }));
  };

  return (
    <DataContext.Provider value={{ dataPoints, addDataPoint }}>
      {children}
    </DataContext.Provider>
  );
};
