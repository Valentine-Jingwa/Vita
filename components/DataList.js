// Date: 03/24/2024
//DataList

import React, { useState, useTheme} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal } from 'react-native';


export const subcategories = [
        //Vitals
        {
          id: 1,
          categoryname: 'Vitals',
          subcategory: 'Blood Pressure',
          units: ['mmhg'],
          dunit: 'mmhg',
          datatype: 'number',
          max: 999,
          min: 0
        },
        {
          id: 2,
          categoryname: 'Vitals',
          subcategory: 'Heart Rate',
          units: ['bpm', 'bps'],
          dunit: 'bpm',
          datatype: 'number',
          max: 999,
          min: 0
        },
        {
          id: 3,
          categoryname: 'Vitals',
          subcategory: 'Temperature',
          units: ['°C', '°F', 'K'],
          dunit: '°C',
          datatype: 'number',
          max: 999,
          min: 0
        },
        {
          id: 4,
          categoryname: 'Vitals',
          subcategory: 'Respiratory Rate',
          units: ['bpm', 'bps'],
          dunit: 'bpm',
          datatype: 'number',
          max: 999,
          min: 0
        },
        {
          id: 5,
          categoryname: 'Vitals',
          subcategory: 'Oxygen Saturation',
          units: ['%', 'mg/dl'],
          dunit: '%',
          datatype: 'number',
          max: 100,
          min: 0
        },
        // {id: 10, categoryname: 'Vitals', subcategory: 'Pulse Oximeter', units: '%', dunit: '%', datatype: 'number', max: 100, min: 0},

        //Medication Default

        {
          id: 6,
           categoryname: 'Medication', 
           subcategory: 'Advil',   
           units: ['mg', 'ml'], 
           dunit: 'mg', 
           datatype: 'number', 
           max: 9999, 
           min: 0
          },
        {
          id: 7,
           categoryname: 'Medication', 
           subcategory: 'Tylenol', 
           units: ['mg', 'ml'], 
           dunit: 'mg', 
           datatype: 'number', 
           max: 9999, 
           min: 0
          },
        {
          id: 8,
           categoryname: 'Medication', 
           subcategory: 'Insulin', 
           units: ['mg', 'ml'], 
           dunit: 'mg', 
           datatype: 'number', 
           max: 9999, 
           min: 0
          },
        {
          id: 9,
           categoryname: 'Medication', 
           subcategory: 'Aspirin', 
           units: ['mg', 'ml'], 
           dunit: 'mg', 
           datatype: 'number', 
           max: 9999, 
           min: 0
          },

        //Nutrition Default
        
        { 
          id: 11, 
          categoryname: 'Nutrition', 
          subcategory: 'Liquid-Intake',
          datatype: 'text', 
          intakeType: 'Liquid',
          items: ['Water', 'Juice', 'Alcohol', 'Soup'] 
        },
        { 
          id: 12, 
          categoryname: 'Nutrition', 
          subcategory: 'Solid-Intake', 
          datatype: 'text', 
          intakeType: 'Solid',
          items: ['Bread', 'Rice', 'Vegetables'] 
        },
        { 
          id: 13, 
          categoryname: 'Nutrition', 
          subcategory: 'Output',       
          datatype: 'text', 
          outputType: 'Dieper Change',
          items: ['Urine', 'Poop'] 
        },
        

      ];
//TODO add a funtion where user can add a new category and subcategory
        //there is a function here that helps the user add a new category and subcategory and the units for that category id's are automatically assigned. 
//New sub categories are gotten from the async storage and displayed in the list
