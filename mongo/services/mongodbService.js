import { API_KEY, DATA_SOURCE, NODE_BASE_URL, BASE_URL, JWT_SECRET} from '@env';
import axios from 'axios';
import jwt from 'react-native-pure-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addSubUser} from '../../screens/Profilesc/subUser';


const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': API_KEY, 
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
      database: "Vita_user", 
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
      'api-key': API_KEY, 
      'Accept': 'application/ejson',
    },
  });
  export const authenticateUser = async (loginId, password) => {
    try {
      const payload = {
        collection: "users",
        database: "Vita_user",
        dataSource: DATA_SOURCE,
        filter: {
          $or: [
            { email: loginId, password: password },
            { username: loginId, password: password },
          ],
        },
      };
  
      const response = await apiClient.post('/findOne', payload);
      if (response.data.document) {
        const { _id, password, ...safeUserData } = response.data.document;
  
        // Function to calculate age from dob
        const calculateAge = (dob) => {
          const birthDate = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        };
  
        // Function to generate initials from first and last names
        const generateInitials = (firstName, lastName) => {
          const initials = `${firstName ? firstName[0].toUpperCase() : ''}${lastName ? lastName[0].toUpperCase() : ''}`;
          return initials;
        };
  
        const dob = safeUserData.dob; // Assuming dob is a field in your user document
        const age = calculateAge(dob);
        const initials = generateInitials(safeUserData.first_name, safeUserData.last_name);
  
        // Add calculated age and initials to user data, retain dob
        const userDataWithAgeAndInitials = { ...safeUserData, age, initials };
  
        // Store user data without sensitive information, including calculated age, dob, and initials
        await AsyncStorage.setItem('adminUser', JSON.stringify(userDataWithAgeAndInitials));
  
        const token = JWT_SECRET; // Ideally obtained securely
        
        // Return both token and safe user data, now including age and initials
        return { token, user: userDataWithAgeAndInitials };
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  export const UploadSubUser = async (adminEmail, subUserData) => {
    try {
        // Construct the unique collection name
        const collectionName = `${adminEmail}subusers`;

        const payload = {
            collection: collectionName, 
            database: "Vita_user", 
            dataSource: DATA_SOURCE,
            document: subUserData, // Ensure this matches the backend expectation
        };

        // Ensure the endpoint and method match your server configuration
        const response = await apiClient.post('/insertOne', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
            }
        });

        if (response.data.success) {
            console.log('Sub-user successfully added to MongoDB.');
            return true;
        } else {
            console.log('Failed to add sub-user to MongoDB.');
            return false;
        }
    } catch (error) {
        console.error('Failed to add sub-user:', error);
        return false;
    }
};

// fetchAndStoreSubcategories Retrives all subuser data execpt _id and age.Dob is used to calculate age.
export const fetchAndStoreSubcategories = async (userEmail) => {
  try {
      const collectionName = `${userEmail}subusers`;
      const payload = {
          collection: collectionName,
          database: "Vita_user",
          dataSource: DATA_SOURCE,
      };

      const response = await apiClient.post('/find', JSON.stringify(payload), {
          headers: {
              'Content-Type': 'application/json',
              'api-key': API_KEY,
          }
      });

      if (response.data.documents) {
          const subcategories = response.data.documents.map(({ _id, dob, ...sub }) => {
              // Calculate age from dob
              const age = calculateAge(dob);
              return { ...sub, dob, age };
          });

          // Store modified subcategories with calculated ages instead of fetched ages
          await AsyncStorage.setItem('subUsers', JSON.stringify(subcategories));
      } else {
          console.error('No subcategories found');
      }
  } catch (error) {
      console.error('Error fetching and storing subcategories:', error);
  }
};

// Helper function to calculate age from dob
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

// Assuming the base URL and headers setup are similar to previous implementations
export const UploadUserData = async (adminEmail, data) => {
  const collectionName = `${adminEmail}_data`;
  const payload = {
    collection: collectionName,
    database: "Vita_user",
    dataSource: DATA_SOURCE,
    document: data
  };

  try {
    const response = await apiClient.post('/insertOne', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      }
    });

    if (response.data.ack) {
      console.log('Data successfully uploaded to MongoDB.');
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error('Failed to upload data:', error);
    return false;
  }
};

// This function fetches user-specific data and stores it locally.
export const fetchAndStoreUserData = async (adminEmail) => {
  const collectionName = `${adminEmail}_data`;  // Assuming user data is stored in a specific collection named after the admin email
  const payload = {
      collection: collectionName,
      database: "Vita_user",
      dataSource: DATA_SOURCE,
  };

  try {
      const response = await apiClient.post('/find', JSON.stringify(payload), {
          headers: {
              'Content-Type': 'application/json',
              'api-key': API_KEY,
          }
      });

      if (response.data.documents) {
          await AsyncStorage.setItem('localData', JSON.stringify(response.data.documents));
          console.log(response.data.documents);
      } else {
      }
  } catch (error) {
      console.error('Error fetching and storing user data:', error);
  }
};
