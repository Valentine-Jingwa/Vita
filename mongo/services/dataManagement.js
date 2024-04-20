import axios from 'axios';
import { API_KEY, BASE_URL, DATA_SOURCE } from '@env'; // Importing environmental variables for API configuration
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for local storage operations

// Create an axios instance configured with base URL and default headers
const apiClient = axios.create({
  baseURL: BASE_URL, // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json', // Set content type as JSON for all requests
    'api-key': API_KEY, // API key for authorization, fetched from environment variables
    'Accept': 'application/json', // Ensure the API returns data in JSON format
  },
});

/**
 * Check the synchronization status of data with the server.
 * @returns {boolean} Returns true if data is synchronized, false otherwise.
 */
export const checkSyncStatus = async () => {
    try {
        const response = await apiClient.get('/sync/status'); // Make a GET request to check sync status
        return response.data.isSynced;  // Assuming the API returns an object with an 'isSynced' boolean property
    } catch (error) {
        console.error('Failed to check sync status:', error); // Log error if request fails
        return false;  // Default to false if there's an error in the sync status check
    }
};

/**
 * Triggers synchronization of local data with the server.
 * @returns {Object} Object indicating success or failure of the operation.
 */
export const syncData = async () => {
    try {
        const response = await apiClient.post('/sync'); // Make a POST request to initiate synchronization
        return { success: true, message: 'Data synchronized successfully.', data: response.data }; // Return success status and server response
    } catch (error) {
        console.error('Failed to synchronize data:', error); // Log error if synchronization fails
        return { success: false, message: 'Synchronization failed.', error: error.response?.data || error.message }; // Return failure status and error details
    }
};

/**
 * Authorizes access for a sub-user by verifying their username and password against server records.
 * @param {string} username - The username of the sub-user.
 * @param {string} password - The password of the sub-user.
 * @returns {Object} Object indicating success or failure of the authorization.
 */
export const authorizeAccess = async (username, password) => {
    try {
        const response = await apiClient.post('/authorize', { username, password }); // Make a POST request to authorize access
        return { success: true, message: 'Authorization successful.', data: response.data }; // Return success status and server response
    } catch (error) {
        console.error('Failed to authorize access:', error); // Log error if authorization fails
        return { success: false, message: 'Authorization failed.', error: error.response?.data || error.message }; // Return failure status and error details
    }
};