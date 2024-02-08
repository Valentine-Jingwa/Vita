import RNFS from 'react-native-fs';

const fileName = 'localdata.json';
const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

const DataStorage = {
  async Store(data) {
    try {
      const jsonData = JSON.stringify(data);
      await RNFS.writeFile(filePath, jsonData, 'utf8');
      console.log('Data successfully saved to file.');
    } catch (error) {
      console.log('Failed to save data to file.', error);
    }
  },

  async Retrieve() {
    try {
      if (await RNFS.exists(filePath)) {
        const jsonData = await RNFS.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
      } else {
        console.log('File does not exist, returning empty object.');
        return {}; // Or appropriate default value
      }
    } catch (error) {
      console.log('Failed to read data from file.', error);
      return null;
    }
  },
};

export default DataStorage;
