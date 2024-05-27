

import { TextInput,View ,StyleSheet } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {Colors} from '../../constants/styles'

const SearchMovie = ({ onChangeText ,value}) => (
  <View style={styles.searchContainer}>
  <EvilIcons name="search" size={30} color="black"style={styles.iconStyle} />
  <TextInput
    style={styles.inputText}
    onChangeText={onChangeText}
    value={value}
    selectionColor="red"
    placeholder="Search"
    placeholderTextColor={Colors.Secondary}
    underlineColorAndroid="transparent" 
    keyboardType="default"
    autoCapitalize="none"
    autoCorrect={false}
  />
  </View>
);

const styles = StyleSheet.create({
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 8,
    margin:15
    
  },
  inputText: {
    flex:1,
    height: 30,
    paddingLeft: 6, 
    borderRadius: 12,
    margin: 10,
    borderRadius: 12,
    fontSize:22
  },
  iconStyle: {
    marginLeft: 10, 
  },
  placeholderStyle: {
    paddingLeft: 10, 
  
    
  },

  
});

export default SearchMovie;
