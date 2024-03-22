// mongodbService.js
import { API_KEY, DATA_SOURCE } from '@env';
import axios from 'axios';

const BASE_URL = 'https://us-west-2.aws.data.mongodb-api.com/app/data-hjhah/endpoint/data/v1/action';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': API_KEY, // Using the API_KEY from .env
    'Accept': 'application/ejson',
  },
});

export const findOne = async (collectionName, databaseName) => {
  const data = JSON.stringify({
    collection: collectionName,
    database: databaseName,
    dataSource: DATA_SOURCE, 
    projection: {
      "_id": 1,
    },
  });

  try {
    const response = await apiClient.post('/findOne', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
// Add this to your mongodbService.js

export const createUser = async (userData) => {
    const data = JSON.stringify({
      collection: "users", // Assuming your collection name is "users"
      database: "yourDatabaseName", // Put your actual database name here
      dataSource: DATA_SOURCE,
      document: userData, // This contains the new user data
    });
  
    try {
      const response = await apiClient.post('/insertOne', data); // Assuming the endpoint is for inserting a document
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  };

  export const saveUserData = async (userId, data) => {
    const requestData = JSON.stringify({
      collection: "userData",
      database: "yourDatabaseName", // Use your actual database name
      dataSource: DATA_SOURCE,
      userId: userId, // Ensure this is passed to the backend to associate data with the user
      data: data, // This is the actual data fetched from AsyncStorage
    });
  
    try {
      const response = await apiClient.post('/saveUserData', requestData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving user data: ', error);
      throw error;
    }
  };

  
  
