import React from 'react';
import { TouchableOpacity, Text,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { deviceWidth } from '../../constants/Dimension';

const XSmallGradientButton = ({ title, onPress }) => {
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
    width:deviceWidth/ 5,
    alignSelf:'center',
  },
  button: {
    borderRadius:5,
    padding:4
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default XSmallGradientButton;
