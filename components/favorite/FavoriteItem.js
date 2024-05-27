
import { StyleSheet, Text, View, Image, Dimensions, Pressable, Button } from 'react-native';
import { Colors } from '../../constants/styles';
import Butn from '../ui/Butn';

const FavoriteItem = ({ item, onPress, removeFavorite }) => {
  const { title, poster_path, vote_average } = item;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }} style={styles.poster} />
        <View style={styles.Textes}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.rating}>Rating: {vote_average}</Text>
        </View>
        <Butn antIconName='minuscircle' size={30} onPress={() => removeFavorite(item.id)} style={styles.deleteButton} />
      </View>
    </Pressable>
  );
};

const width = Dimensions.get('window').width - 30; 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: width / 2, 
    height: 270,
    marginTop: 6,
    borderRadius:8,
    borderColor: Colors.Black,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor:Colors.Primary
  },
  poster: {
    width: width/2, 
    height:190,
    resizeMode:'stretch',
    borderRadius:8
  },
  Textes: {
    marginTop: 4,
    flexDirection: 'column',
    paddingBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: Colors.Black,
  },
  
  
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    color: Colors.Error,
    backgroundColor: '#11ffee00',
    shadowColor:'transparent'
  },
});

export default FavoriteItem;


