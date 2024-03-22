import { saveUserData } from './mongodbService';

// Assuming you have the userId and the data ready to be saved
const userId = 'someUserId';
const dataToSave = { some: 'data' };

saveUserData(userId, dataToSave)
  .then(() => console.log('Data saved successfully.'))
  .catch((error) => console.error('Failed to save data', error));
  