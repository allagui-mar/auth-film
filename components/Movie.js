


import { View, Text, Image ,StyleSheet, Pressable} from 'react-native';

const Movie = ({ title, posterPath, AverageRating ,onPress}) => {
  
  return (
    <View style={styles.container}>
      
      <Pressable android_ripple={{ color:'black'}}
       onPress={onPress}
       style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
        style={styles.image}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.Title}>{title}</Text>
        <Text style={styles.avgRat}> Rating: {AverageRating}</Text>
      </View>
      </Pressable>
    
    </View>
  );
};
 
export default Movie;

 const styles=StyleSheet.create({
    container:{
         flex:1,
         flexDirection: 'column',
           marginBottom: 8 ,
           margin: 5,
           borderRadius:8,
           backgroundColor:'#ccc',

        },
        movie:{
          
        },
        image:{
             width: '100%' ,
             height: 200,
             borderRadius:8,
             resizeMode:'stretch'
             },
        innerContainer:{
          flex:1,
         marginBottom:4,
          justifyContent:'center',
          alignItems:'center'
        },
        Title:{
          fontSize:18,
          fontWeight:'bold',
        },
       avgRat: {
        fontSize:16
       },
        button: {
          flex: 1,
        },
        buttonPressed: {
          opacity: 0.5,
        }
    

 })