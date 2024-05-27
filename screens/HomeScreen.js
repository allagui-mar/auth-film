
import React from 'react';
import { View, StyleSheet, Button,FlatList } from 'react-native';
import SearchMovie from '../components/ui/SearchMovie';
import Movie from '../components/Movie';
import NotFound from '../components/ui/NotFound';
import Butn from '../components/ui/Butn'
import { useNavigation } from '@react-navigation/native';
import RoundIconBtn from '../components/ui/RoundIconBtn';
import { Colors } from '../constants/styles'

const HomeScreen= ({
   movies, 
   searchTerm, 
   setSearchTerm,
   onHandleLoadMorePlus,
   onHandleLoadMoreMinus
   }) => {
 const navigation=useNavigation();
  const handleMovies = ({ item }) => {
 
    return <Movie title={item.title}
      posterPath={item.poster_path}
      AverageRating={item.vote_average}
      onPress={()=>navigation.navigate('Details',{movieId:item.id})}
    />;
  };
 

  return (
    <View style={styles.mainContent}>
      <SearchMovie onChangeText={setSearchTerm} value={searchTerm} />
      {!movies.length? <NotFound /> : (
        <>
        <FlatList
          data={movies}
          renderItem={handleMovies}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
          numColumns={2}
        />
         <RoundIconBtn style={styles.loadPlus}
         antIconName='movie-open-plus'
         size={34} color={Colors.Error}
         onPress={onHandleLoadMorePlus}  />
          <RoundIconBtn style={styles.loadMinus}
         antIconName='movie-open-minus'
         size={34} color={Colors.primary800}
         onPress={onHandleLoadMoreMinus}  />
       </>
       
      )}
      
      <Butn style={styles.btnHeart} antIconName='heart'
        color='red'
        size={34}
        onPress={()=>navigation.navigate('Favorites')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
   flex:1,
   
  },
  btnHeart: {
    position: 'absolute',
    top:-50,
    right: 15,
    margin: 20,
    color: 'red',
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  loadPlus:{
    position: 'absolute',
    top:-50,
    left: 60,
    margin: 20,
    color: 'red',
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  loadMinus:{
    position: 'absolute',
    top:-50,
    right: 100,
    margin: 20,
    color: 'red',
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
});

export default HomeScreen;
