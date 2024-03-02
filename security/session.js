import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (userToken) => {
  try {
    await AsyncStorage.setItem('userToken', userToken);
  } catch (e) {
    // saving error
  }
}

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
