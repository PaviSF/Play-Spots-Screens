import React, { useState } from 'react';
import { TouchableOpacity, Text,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { deviceWidth } from '../../constants/Dimension';

const LargeGradientButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={['#609966', '#539165']}
        style={styles.button}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width:deviceWidth/ 2.3,
    alignSelf:'center',
  },
  button: {
    borderRadius:5,
    padding:10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LargeGradientButton;
