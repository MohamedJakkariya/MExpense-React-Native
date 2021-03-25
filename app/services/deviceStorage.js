import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description storing single data
 */
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

/**
 * @description stroe object
 */
const storeDataObject = async (key, valueObject) => {
  try {
    const jsonValue = JSON.stringify(valueObject);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

/**
 * @description reading single data
 */
const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

/**
 * @description reading single data object
 */

const getDataObject = async keyObject => {
  try {
    const jsonValue = await AsyncStorage.getItem(keyObject);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export default {
  getData,
  getDataObject,
  storeData,
  storeDataObject
};
