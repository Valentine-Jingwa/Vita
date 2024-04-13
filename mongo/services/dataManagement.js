import axios from 'axios';
import { API_KEY, BASE_URL, DATA_SOURCE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'Accept': 'application/json',
  },
});
// Function to check the synchronization status
export const checkSyncStatus = async () => {
    try {
        const response = await apiClient.get('/sync/status');
        return response.data.isSynced;  // Assuming the API returns { isSynced: boolean }
    } catch (error) {
        console.error('Failed to check sync status:', error);
        return false;  // Assume not synced if there's an error
    }
};

// Function to trigger data synchronization
export const syncData = async () => {
    try {
        const response = await apiClient.post('/sync');
        return { success: true, message: 'Data synchronized successfully.', data: response.data };
    } catch (error) {
        console.error('Failed to synchronize data:', error);
        return { success: false, message: 'Synchronization failed.', error: error.response?.data || error.message };
    }
};

// Function to authorize access to a sub-user's data
export const authorizeAccess = async (username, password) => {
    try {
        const response = await apiClient.post('/authorize', { username, password });
        return { success: true, message: 'Authorization successful.', data: response.data };
    } catch (error) {
        console.error('Failed to authorize access:', error);
        return { success: false, message: 'Authorization failed.', error: error.response?.data || error.message };
    }
};
