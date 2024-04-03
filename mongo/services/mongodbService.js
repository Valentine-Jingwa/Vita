import { API_KEY, DATA_SOURCE, APP_ID } from '@env';
import axios from 'axios';

const BASE_URL = `https://us-west-2.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;


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

  export const authenticateUser = async (loginId, password) => {
    try {
      // Construct the correct URL from the MongoDB Realm documentation
      const url = `https://us-west-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/auth/providers/local-userpass/login`;
  
      // Determine if 'loginId' is an email or a username
      const key = loginId.includes('@') ? 'email' : 'username';

  
      // Form the payload based on what key we're using
      const payload = {
        [key]: loginId,
        password: password,
      };
  
      // Make the POST request to the MongoDB Realm authentication endpoint
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          // If you have an API key for some reason, include it here, otherwise you may not need this
          'api-key': API_KEY, // Note: This is typically not needed for login requests
        },
      });
  
      console.log('Authentication successful:', response.data);
      return response.data; // This should contain the access token and refresh token
    } catch (error) {
      console.error('Error during authentication:', error.response?.data || error.message);
      throw error;
    }
  };
  

  
  
