import { API_KEY, DATA_SOURCE, APP_ID } from '@env';
import axios from 'axios';

const BASE_URL = `https://us-west-2.aws.data.mongodb-api.com/app/data-hjhah/endpoint/data/v1/action`;

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

export const createUser = async (userData) => {
    const data = JSON.stringify({
      collection: "users", // Assuming your collection name is "users"
      database: "Vita_user", // Put your actual database name here
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
  

//This is for authentication of the our user
  const authClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY, // Using the API_KEY from .env
      'Accept': 'application/ejson',
    },
  });
  export const authenticateUser = async (email, password) => {
    try {
      // Replace 'data-hjhah' with your actual MongoDB Realm App ID
      // Construct the correct URL from the MongoDB Realm documentation
      const url = `https://realm.mongodb.com/api/client/v2.0/app/data-hjhah/auth/providers/local-userpass/login`;
  
      const response = await axios.post(url, {
        // Use the correct field name expected by your MongoDB Realm configuration
        // It could be 'email' or 'username' depending on your setup
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Remove the 'api-key' from the headers if not required for this endpoint
        },
      });
  
      console.log('Authentication successful:', response.data);
      return response.data; // Should contain authentication tokens
    } catch (error) {
      console.error('Error during authentication:', error.response?.data || error.message);
      throw error;
    }
  };
  
  
