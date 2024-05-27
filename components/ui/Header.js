import { useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../store/Auth-context';
import IconButton from '../ui/IconButton';
import { Colors } from '../../constants/styles';
const Header = ({ fetchedMessage, userNameProp}) => {
 
  const authCtx = useContext(AuthContext);
  const {userName,logOut}=authCtx
  const handleLogOut=()=>{logOut()}
  
  return (
    <View style={styles.header}>
      <Text>hello {userName}</Text>
     <Text> {fetchedMessage}</Text>
     <IconButton icon="exit"  size={24}  color={Colors.Light}  onPress={handleLogOut} />
   
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop:40,
    paddingHorizontal:20,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 2,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    paddingLeft: 8,
  },
});

export default Header;
