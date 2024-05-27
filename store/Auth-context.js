import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",

  isAuthenticated: false,
  authenticate: () => {},
  logOut: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState('');
 
  useEffect(() => {
    const loadStoredData = async () => {
      const storedUserName = await AsyncStorage.getItem('username');
      const storedToken= await AsyncStorage.getItem('token');
      if (storedUserName!== null) {
        setUserName(JSON.parse(storedUserName));
      }
      if (storedToken!== null) {
        setAuthToken(JSON.parse(storedToken));
      }
    };

    loadStoredData()
  }, []);
  

  const authenticate =async () => {
     setUserName(userName);
     setAuthToken(authToken)

  };

  const logOut = async() => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
     setUserName('')
     setAuthToken(null);
  };

  
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logOut: logOut,
    userName:userName,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
