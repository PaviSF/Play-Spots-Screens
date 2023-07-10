import React from 'react';
import { View } from 'react-native';

const Line = () => {
  return <View style={styles.line} />;
};

const styles = {
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
};

export default Line;