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
        //Vitals
        {id: 1, categoryname: 'Vitals', subcategory: 'Blood Pressure', units: 'mmhg', dunit: 'mmhg', datatype: 'number', max: 999, min: 0},
        {id: 2, categoryname: 'Vitals', subcategory: 'Heart Rate', units: 'bpm', dunit: 'bpm', datatype: 'number', max: 999, min: 0},
        {id: 3, categoryname: 'Vitals', subcategory: 'Temperature', units: '°C', dunit: '°C', datatype: 'number', max: 999, min: 0},
        {id: 4, categoryname: 'Vitals', subcategory: 'Respiratory Rate', units: 'bpm', dunit: 'bpm', datatype: 'number', max: 999, min: 0},
        {id: 5, categoryname: 'Vitals', subcategory: 'Oxygen Saturation', units: '%', dunit: '%', datatype: 'number', max: 100, min: 0},

        //Medication Default

        {id: 6, categoryname: 'Medication', subcategory: 'Advil', units: 'mg', dunit: 'mg', datatype: 'number', max: 9999, min: 0},
        {id: 7, categoryname: 'Medication', subcategory: 'Tylenol', units: 'mg', dunit: 'mg', datatype: 'number', max: 9999, min: 0},
        {id: 8, categoryname: 'Medication', subcategory: 'Insulin', units: 'mg', dunit: 'mg', datatype: 'number', max: 9999, min: 0},
        {id: 9, categoryname: 'Medication', subcategory: 'Aspirin', units: 'mg', dunit: 'mg', datatype: 'number', max: 9999, min: 0},

        //Nutrition Default
        
        { id: 11, categoryname: 'Nutrition', subcategory: 'Liquid-Intake', datatype: 'text', intakeType: 'Liquid', items: ['Water', 'Juice', 'Alcohol'] },
        { id: 12, categoryname: 'Nutrition', subcategory: 'Solid-Intake', datatype: 'text', intakeType: 'Solid', items: ['Bread', 'Rice', 'Vegetables'] },
        { id: 13, categoryname: 'Nutrition', subcategory: 'Output', datatype: 'text', outputType: 'Dieper Change', items: ['Urine', 'Poop'] },
        
        //Others Default
        //there is a function here that helps the user add a new category and subcategory and the units for that category id's are automatically assigned. 
      ];
//TODO add a funtion where user can add a new category and subcategory


