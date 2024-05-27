
import  { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useFavorites } from '../store/FavoriteContext';
import { Colors } from '../constants/styles';
import Butn from '../components/ui/Butn'
import RoundIconBtn from '../components/ui/RoundIconBtn';

const DetailScreen = ({ route }) => {
  const movieId = route.params.movieId;
  const navigation = useNavigation();
  const { addFavorite } = useFavorites();
  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async () => {
    try {
      const result = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=75cc236c758acb8b090acf828728fe53&language=en-US`);
     
      setMovieDetails(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
   

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const handleAddToFavorites = () => {
    if (!movieDetails) return;
    addFavorite(movieDetails);
    navigation.navigate('Favorites');
  };
  const maxGenresToShow = 4;
  const genres = movieDetails.genres? movieDetails.genres.map(genre => genre.name) : [];
  const genreDescriptions = genres.length > 0? genres.slice(0, maxGenresToShow).join(', ') : '';
  return (
    <View style={styles.container}>
      
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}` }} style={styles.poster} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{movieDetails?.title}</Text>
          <Text style={{ fontSize: 18 }}>Rating: {movieDetails?.vote_average}</Text>
       
        <View style={styles.innerText}>
          <View style={styles.duration}>
            <Text style={styles.text}>Duration: {movieDetails?.runtime } min</Text>
            <Text style={styles.text}>Release Date: {movieDetails?.release_date}</Text>
          </View>
          <View style={styles.genresContainer}>
        {genreDescriptions.split(', ').map((genre, index) => (
          <View key={index} style={styles.genreItem}>
            <Text style={{ fontSize: 20, padding:2  }}>{genre}</Text>
          </View>
        ))}
      </View>
        </View>
      </View>
      <Text style={{ fontSize: 18, marginLeft: 15 }}>Overview</Text>
      <View style={styles.containerOverview}>
        <Text style={styles.overview}>{movieDetails?.overview}</Text>
      </View>
      <RoundIconBtn style={styles.btnHeart}
        antIconName='heart-plus'
        onPress={handleAddToFavorites}
        size={44}
        color='red' />
      <Butn style={styles.btnfleche}
        antIconName='arrowleft'
        color='#fff'
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};

const Height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  poster: {
    width: '100%',
    height: Height / 2 - 120,
    contentFit: "fill",
    marginBottom: 2,
    resizeMode: 'stretch',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    marginRight: 10,
    flexWrap: 'wrap',
  },
  innerText: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
  },
  overview: {
    fontSize: 18,
    margin:6,
  },
  containerImage: {
    backgroundColor: Colors.Primary,
  },
  containerOverview: {
    borderColor: Colors.Dark,
    borderWidth: 3,
    padding: 5,
    margin:8
  
  },
  btnHeart: {
    position: 'absolute',
    top: 35,
    right: 25,
    padding: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  genreItem: {
    backgroundColor: Colors.Primary,
    borderRadius: 5,
    paddingHorizontal: 4,
    margin: 5,
    borderBlockColor: Colors.Dark,
    borderWidth: 1,
    borderRadius: 20,
  },
  btnfleche: {
    position: 'absolute',
    top: 45,
    left: 25,
    padding: 8,
    backgroundColor: Colors.Light,
  },
});

export default DetailScreen;

