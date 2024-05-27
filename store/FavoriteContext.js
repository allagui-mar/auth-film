




import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

  const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); 

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites!== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const addFavorite = async (movie) => {
    const existingFavorites = favorites.find(favorite => favorite.id === movie.id);
    if (!existingFavorites) {
      const newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      alert("Ce film est déjà dans vos favoris.");
    }
  };

  const removeFavorite = async (movieId) => {
    const newFavorites = favorites.filter(favorite => favorite.id!== movieId);
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, loading, setFavorites, loadFavorites, addFavorite, removeFavorite, setLoading }}>
      {children}
    </FavoriteContext.Provider>
  );
};


export default FavoriteProvider;