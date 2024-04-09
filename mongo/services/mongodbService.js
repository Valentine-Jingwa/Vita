import { API_KEY, DATA_SOURCE, NODE_BASE_URL, BASE_URL, JWT_SECRET} from '@env';
import axios from 'axios';
import jwt from 'react-native-pure-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  
        // Log for debugging
        console.log("User Data with Age and Initials:", userDataWithAgeAndInitials);
  
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
  
  
  
  
  export const getSubUsers = async (adminUsername) => {
    const adminUserQuery = { username: adminUsername };
    
    try {
      // Fetch the admin user
      const adminResponse = await findOne("users", "Vita_user", adminUserQuery);
      const { password, _id, ...adminUserData } = adminResponse.document;
  
      // Fetch subusers if needed, handle this according to your logic
      // const subUsersResponse = await findOne(adminUsername+"_subUsers", "Vita_user", {});
      // const subUsersData = subUsersResponse.documents; // Or however your data is structured
      
      console.log(adminUserData); // Log the admin user data without password and _id
      return adminUserData;
  
      // If needed, also handle and return the subUsersData
      // return { adminUserData, subUsersData };
    } catch (error) {
      console.error("Error fetching admin and sub-users:", error);
      throw error;
    }
  };
  
  
  export const addSubUser = async (adminUsername, subUserData) => {
    
    const data = JSON.stringify({
      collection: adminUsername+"_SubUsers", // Assuming your collection name is "users"
      database: "Vita_user", 
      dataSource: DATA_SOURCE,
      document: userData, // This contains the new user data
    });
    try {
      const newUser = await apiClient.post('/insertOne', subUserData);
      console.log(newUser.data);
      return newUser.data;
    } catch (error) {
      console.error("Error creating sub-user:", error);
      throw error;
    }
  // When the user is authenticated another function will be called to get the user data
  // The first name, last name, email,age and other user data will be returned and saved in an asychronous storage
  // The async storage(admindata) will be called to get some of the user data and display it on the profile.js
  //profile.js will take the parameters(username, dob, age, firstname, lastname and email) and display the user data

  // There will be another function that will be triggered when the user creates a sub profile
  // This will trigger the creation of a new collection in the database
  // The collection name will use the Admin username and the word subUser example "Vanessa_subUsers"
  // Everytime a new subUser is created the collection will be updated with the new subUser data
  // sub users must have a firstname, lastname, username, age, and dob

  };
