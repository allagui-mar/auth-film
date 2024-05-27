
import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./store/Auth-context";
import FavoriteProvider from './store/FavoriteContext'; 
import Root from './store/Root'; 
import Navigation from './store/Root'


const App = () => {

  return (
    <>
      <StatusBar style="light" />
      <FavoriteProvider> 
        <AuthContextProvider>
       <Root/>
          
        </AuthContextProvider>
      </FavoriteProvider>
    </>
  );
};

export default App;



