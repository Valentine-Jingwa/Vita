
// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    // Initial data structure
    vitals: { id: 1, data: [1,40,30,26] }, // todo: color in design later
    medication: { id: 2, data: [5,10,15,20] },
    nutrition: { id: 3, data: [7,11,24,22] },
    others: { id: 4, data: [10,13,16,19] }
  });

  const updateData = (category, newData) => {
    setData(prevData => ({
      ...prevData,
      [category]: { ...prevData[category], data: newData }
    }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
