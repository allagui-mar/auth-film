import { NavigationContainer, useNavigation } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{ useContext, useEffect, useState } from 'react';
import IconButton from '../components/ui/IconButton';
import { AuthContext } from './Auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "../constants/styles";
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DetailScreen from "../screens/DetailsScreen";
import FavouritesScreen from "../screens/FavoritesScreen";
import * as SplashScreen from "expo-splash-screen";


const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown:false,
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="exit"
          //     size={24}
          //     color={tintColor}
          //     onPress={() => {
          //       authCtx.logOut();
          //     }}
          //    />
            
          // ),
        }}
      />
      <Stack.Screen name="Details" component={DetailScreen}/>
      <Stack.Screen  name='Favorites' component={FavouritesScreen}/>
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const storeToken = await AsyncStorage.getItem("token");

      if (storeToken) {
    
        authCtx.authenticate(JSON.parse(storeToken));
      }
      setIsTryingLogin(false);
    };

    fetchToken();
  }, [])

  useEffect(() => {

      SplashScreen.hideAsync();
    
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null; // 
  }

  return (
  
    <Navigation/>
   
  );
};

export default Root;


const Navigation = () => {

    const authCtx = useContext(AuthContext);

    return (
      <NavigationContainer >
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  };
 