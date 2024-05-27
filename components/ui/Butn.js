import React from 'react';
import { StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const Butn = ({ antIconName, color,onPress ,size, style }) => {
  const navigation = useNavigation();

  

  return (
    <AntDesign 
      name={antIconName} 
      size={size || 24}
      color={color || Colors.primary100}
      style={[styles.icon, style]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    backgroundColor: Colors.Light,
    borderRadius: 50,
    elevation: 5,
  
    color:Colors.Dark
  }
});

export default Butn;