
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';

const RoundIconBtn = ({ antIconName, color, size, style, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: 'red' }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.icon,
        style,
        pressed? styles.pressed : null,
      ]}
    >
      <MaterialCommunityIcons
        name={antIconName}
        size={size || 24}
        color={color || Colors.Light}
        style={({ pressed }) => [
          styles.icon,
          style,
          pressed? styles.pressed : null,
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
   
    elevation: 5,
   
    },
  pressed: {
    opacity: 0.7,
    backgroundColor: 'red',
    borderRadius: 50,
    shadowColor: 'red',
    shadowRadius: 5,
  },
 });

export default RoundIconBtn;
