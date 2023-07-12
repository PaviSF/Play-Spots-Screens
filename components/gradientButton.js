import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#98FB98', '#008000']}
        style={styles.button}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
};

export default GradientButton;
