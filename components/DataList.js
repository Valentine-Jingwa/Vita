//This will contain a list that would be sorted and displayed when the user picks a data category from the add data page
//If the user for example picks vitals the following below will take place
// Vitals
// 1. Blood Pressure (When The use clicks blood pressure the program will go retrieve the units for blood presure bps and contraints for that category such as minimum values, characters allowed, and Max length of characters allowed)
// 2. Heart Rate(units:( bpm, bps), 999 bpm, Numbers: True, decimal places: 4, )
// 3. Temperature(units: (°F,°C, K ), max: 999, min: 0, Numbers: True, decimal places: 4, )
// 4. Respiratory Rate (units: (bpm, bps), max: 999, min: 0, Numbers: True, decimal places: 4, )
// 5. Oxygen Saturation(units: (%), max: 100, min: 0, Numbers: True, decimal places: 4, )
// 6. Add New Data category(user is asked to enter the name of the category and the units for that category if the category is unitless thy can turn it into a text field/Dairy entry)
//

import React, { useState } from 'react';

import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal } from 'react-native';


export const subcategories = [
  // Vitals
  {
    id: 1,
    categoryname: 'Vitals',
    subcategory: 'Blood Pressure',
    units: ['mmHg'], // Now an array
    dunit: 'mmHg',
    datatype: 'number',
    max: 999,
    min: 0
  },
  {
    id: 2,
    categoryname: 'Vitals',
    subcategory: 'Heart Rate',
    units: ['bpm'], // Now an array
    dunit: 'bpm',
    datatype: 'number',
    max: 999,
    min: 0
  },
  {
    id: 3,
    categoryname: 'Vitals',
    subcategory: 'Temperature',
    units: ['°F'], // Now an array
    dunit: '°F',
    datatype: 'number',
    max: 999,
    min: 0
  },
  {
    id: 4,
    categoryname: 'Vitals',
    subcategory: 'Respiratory Rate',
    units: ['bpm', 'bps'], // Now an array
    dunit: 'bpm',
    datatype: 'number',
    max: 999,
    min: 0
  },
  {
    id: 5,
    categoryname: 'Vitals',
    subcategory: 'Oxygen Saturation',
    units: ['%'], // Now an array
    dunit: '%',
    datatype: 'number',
    max: 100,
    min: 0
  },
  // Medication Default
  {
    id: 6,
    categoryname: 'Medication',
    subcategory: 'Advil',
    units: ['mg', 'oz', 'g'], // Now an array
    dunit: 'mg',
    datatype: 'number',
    max: 9999,
    min: 0
  },
  {
    id: 7,
    categoryname: 'Medication',
    subcategory: 'Tylenol',
    units: ['mg', 'g', 'oz'], // Now an array
    dunit: 'mg',
    datatype: 'number',
    max: 9999,
    min: 0
  },
  {
    id: 8,
    categoryname: 'Medication',
    subcategory: 'Insulin',
    units: ['mg', 'g', 'oz'], // Now an array
    dunit: 'mg',
    datatype: 'number',
    max: 9999,
    min: 0
  },
  {
    id: 9,
    categoryname: 'Medication',
    subcategory: 'Aspirin',
    units: ['mg', 'g', 'oz'], // Now an array
    dunit: 'mg',
    datatype: 'number',
    max: 9999,
    min: 0
  },
  // Nutrition Default
  {
    id: 10,
    categoryname: 'Nutrition',
    subcategory: 'Calories',
    units: ['cal', 'kcal'], // Now an array
    dunit: 'cal',
    datatype: 'text',
    max: 99,
    min: 0
  },
  // Others Default
  // When the user selects 'Others', they will need to create a new subcategory with units
];
