import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_KEY = "AIzaSyAKPhGZZLBfi9U6hejzrFbAyQuDqDTD_J4";

const extractUsernameFromEmail = (email) => {
  const username = email.split("@")[0];
  return username;
};

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const token = response.data.idToken;
    const username = extractUsernameFromEmail(email);

  
    await AsyncStorage.setItem('username', JSON.stringify(username));
    await AsyncStorage.setItem('token', JSON.stringify(token));
    return { token, userName: username };
 
  } catch (error) {
    console.error("Error during authentication:", error.response.data);
    throw error;
  }
};

export const createUser = async (email, password) => {
  try {
    const result = await authenticate("signUp", email, password);
    return result;
  } catch (error) {
    console.error(error.response.data);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const result = await authenticate("signInWithPassword", email, password);
    return result;
  } catch (error) {
    console.error("Error during authentication:", error.response.data);
    throw error;
  }
};
