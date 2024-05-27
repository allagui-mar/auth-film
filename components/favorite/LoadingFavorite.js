import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles"

const LoadingFavorite = () => {
  return (
    <View style={Styles.container}>
      <ActivityIndicator size="large" color="white" />
        <Text>Loading...</Text>  
    </View>
  );
};

export default LoadingFavorite;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.Secondary,
  },
});
