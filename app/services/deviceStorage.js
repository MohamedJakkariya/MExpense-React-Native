import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description storing single data
 */
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

/**
 * @description stroe object
 */
const storeDataObject = async (key, valueObject) => {
  try {
    console.log(valueObject);
    const jsonValue = JSON.stringify(valueObject);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

/**
 * @description reading single data
 */
const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    console.log(e);
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

/**
 * @param key = String
 * @returns boolean
 */
const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

/**
 * @param expense - Object contains expense information
 * @returns boolean
 */
const addExpenseToLocal = async expense => {
  try {
    const allExpense = await getDataObject('expenses');

    if (allExpense) return await storeDataObject('expenses', [expense, ...allExpense]);

    return await storeDataObject('expenses', [expense]);
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default {
  getData,
  getDataObject,
  storeData,
  storeDataObject,
  removeData,
  addExpenseToLocal
};
