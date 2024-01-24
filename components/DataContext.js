
// DataContext.js, i BELEIVE THIS WILL BE THE BACKEND CONNECTION POINT
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    // Initial data structure
    vitals: { id: 1, data: [1,40,30,26],
    subcategories:[
      {id: 1, name: 'Blood Pressure', data: [120,110,115,118]},
      {id: 2, name: 'Heart Rate', data: [60,70,80,90]},
    ] }, // todo: color in design later
    medication: { id: 2, data: [5,10,15,20],
    subcategories:[
      {id: 1, name: 'Insulin', data: [10,20,30,40]},
      {id: 2, name: 'Tylenol', data: [5,10,15,20]},
    ] },
    nutrition: { id: 3, data: [7,11,24,22],
    subcategories:[
      {id: 1, name: 'Calories', data: [100,200,300,400]},
      {id: 2, name: 'Protein', data: [5,10,15,20]},
    ] },
    others: { id: 4, data: [10,13,16,19],
    subcategories:[
      {id: 1, name: 'Weight', data: [150,160,170,180]},
      {id: 2, name: 'Blood Sugar', data: [100,110,120,130]},
    ] },
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
