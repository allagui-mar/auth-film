


import React, { useState, useEffect, useContext } from 'react';
import { View,StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../store/Auth-context';
import Header from '../components/ui/Header';
import HomeScreen from './HomeScreen';
import NotFound from '../components/ui/NotFound';
//
const API_KEY = '75cc236c758acb8b090acf828728fe53';
const BASE_URL = 'https://api.themoviedb.org/3';
const CACHE={};
const WelcomeScreen = () => {

  const [fetchedMessage, setFetchedMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const authCtx = useContext(AuthContext);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [page,setPage]=useState(1)
 
  const {isAuthenticated,token,userName} = authCtx;

 
  useEffect(() => {
    if (isAuthenticated && token) {
      axios
       .get(`https://movies-7c8a9-default-rtdb.firebaseio.com/message.json?auth=${token}`)
       .then((response) => {
          setFetchedMessage(response.data);
          console.log("Fetched Message:", fetchedMessage); 
        })
       .catch((error) => {
          console.error("Failed to fetch message:", error);

        });
    }
  }, [isAuthenticated, token]);
  
  

  const fetchData = async () => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
  
    if (CACHE[url]) {
      setMovies(CACHE[url].results);
      setResultNotFound(false);
      return;
    }
    try {
      const result = await axios.get(url);
      setMovies(prevMovies => [...prevMovies,...result.data.results]);
      setResultNotFound(false); 
      CACHE[url] = result.data;
    } catch (error) {
      console.error(error);
      setResultNotFound(true);
      Alert.alert("Erreur lors de la récupération des films", "Veuillez réessayer plus tard.");
    }
  };
  

  useEffect(()=>{
    fetchData()
  },[page]);
  const handleLoadMorePlus = () => {
    if (page<=500){
      setPage(page + 1);
    }
   
  };
  const handleLoadMoreMinus = () => {
    if(page>1){
      setPage(page -1);
    }
    
  };
  

  
  return (
    <View style={styles.container}>
    <Header fetchedMessage={fetchedMessage} userNameProp={userName} /> 
      {resultNotFound? (
        <NotFound/>
      ) : (
      <HomeScreen movies={movies} 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm}
      onHandleLoadMorePlus={() => handleLoadMorePlus()} 
      onHandleLoadMoreMinus={() => handleLoadMoreMinus()}
      />
      )}
    </View>
  );
};
 const styles=StyleSheet.create({
  container:{
    flex:1
  }
 })
export default WelcomeScreen;


