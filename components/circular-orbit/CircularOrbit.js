import * as React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

// You can import from local files
import SolarSystem from "./SolarSystem";
import { generateOrbits } from "@helper/OrbitGeneration";


const CircularOrbit = ({ data, location }) =>{
  const orbits = generateOrbits(data, location);

  return (
    <View style={styles.container}>
      <SolarSystem orbits={orbits} />
    </View>
  );
}

export default React.memo(CircularOrbit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 8,
  },
});
