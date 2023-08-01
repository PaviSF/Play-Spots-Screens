import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  calculateDistance,
  calculateAngle,
} from "../../helper/CalculateDistance";

// You can import from local files
import SolarSystem from "./SolarSystem";
import { deviceWidth } from "../../constants/Dimension";
import { generateOrbits } from "../../helper/OrbitGeneration";


export default function CircularOrbit({ data, location }) {
  const orbits = generateOrbits(data, location);

  return (
    <View style={styles.container}>
      <SolarSystem orbits={orbits} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 8,
  },
});
