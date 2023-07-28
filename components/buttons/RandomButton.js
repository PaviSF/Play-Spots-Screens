import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet,View } from "react-native";
import { deviceWidth } from "../../constants/Dimension";

const RandomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 2.8,
    alignSelf: "center",
  },
  button: {
    backgroundColor:'#F5F5F5',
    borderRadius: 15,
    padding: 8,
    marginTop: 20
  },
  buttonText: {
    color: "black",
    fontSize: deviceWidth /25.68,
    fontWeight: 500,
    textAlign: "center",
  },
});

export default RandomButton;
