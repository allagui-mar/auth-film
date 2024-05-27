
import  { useState, useEffect } from 'react';
import { View,  StyleSheet,FlatList ,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../store/FavoriteContext';
import FavoriteItem from '../components/favorite/FavoriteItem';

import LoadingFavorite from '../components/favorite/LoadingFavorite';
import { Colors } from '../constants/styles'
import Butn from '../components/ui/Butn';

const FavouritesScreen = () => {
  const navigation = useNavigation();
  const { favorites, removeFavorite, loadFavorites } = useFavorites();
  const [loading, setLoading] = useState(true); 

 
  useEffect(() => {
    const loadData = async () => {
      await loadFavorites();
      setLoading(false);
    }; 
    loadData();
  }, []);
   
  if (loading) {
    return <LoadingFavorite />;
  };
  

  const renderFavoritesItems = ({ item }) => (
    <FavoriteItem
      item={item}
      onPress={() => navigation.navigate('Details',{movieId:item.id})}
      removeFavorite={removeFavorite}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.fav}>Favourites</Text>
      <FlatList
        data={favorites}
        numColumns={2}
        columnWrapperStyle={styles.flat}
        renderItem={renderFavoritesItems}
        keyExtractor={(item) => item.id}
      />
        <Butn style={styles.btnfleche}
        antIconName='arrowleft'
        color='#fff'
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flat: {
    
    justifyContent: 'space-between',
  
    margin: 10,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    zIndex: 1,
  },
  fav:{
    fontSize:22,
    textAlign:'center',
    paddingBottom:10,
    fontWeight:'500'

  },
  btnfleche: {
    position: 'absolute',
    top: 45,
    left: 25,
    padding: 8,
   backgroundColor:Colors.Light
  },
});

export default FavouritesScreen;







