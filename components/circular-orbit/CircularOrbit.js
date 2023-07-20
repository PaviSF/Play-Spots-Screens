import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {calculateDistance,calculateAngle}  from "../../helper/CalculateDistance";

// You can import from local files
import SolarSystem from "./SolarSystem";
import { turfData } from "../../dataset";

const distanceToPlanetsMap = {};

// const calculateDistance = () => {
//   return (Math.random() * 8) % 16;
// };

const generateOrbits = (spotsData) => {
  for (let i = 0; i < spotsData.length; i++) {
    const distance = Math.ceil(calculateDistance(
      spotsData[i].turfLocation.latitude,
      spotsData[i].turfLocation.longitude,
      11.271201451658536,
      75.78003870204095
    ));

    const angle = calculateAngle(
      spotsData[i].turfLocation.latitude,
      spotsData[i].turfLocation.longitude,
      11.271201451658536,
      75.78003870204095
    );
    

    const planet = {
      name: spotsData[i].turfName,
      image: spotsData[i].turfImage,
      distance,
      angle
    };
    if (distance <= 2) {
      if (!distanceToPlanetsMap[1]) {
        distanceToPlanetsMap[1] = [planet];
      } else {
        distanceToPlanetsMap[1].push(planet);
      }
    }

    if (distance > 2 && distance <= 4) {
      if (!distanceToPlanetsMap[2]) {
        distanceToPlanetsMap[2] = [planet];
      } else {
        distanceToPlanetsMap[2].push(planet);
      }
    }

    if (distance > 4 && distance <= 6) {
      if (!distanceToPlanetsMap[3]) {
        distanceToPlanetsMap[3] = [planet];
      } else {
        distanceToPlanetsMap[3].push(planet);
      }
    }

    if (distance > 6) {
      if (!distanceToPlanetsMap[4]) {
        distanceToPlanetsMap[4] = [planet];
      } else {
        distanceToPlanetsMap[4].push(planet);
      }
    }

    console.log(distanceToPlanetsMap[i] + "hello")

  }



  return Object.keys(distanceToPlanetsMap).map((distanceKey, index) => {
    return {
      name: `Orbit ${distanceKey}`,
      radius: 50 * (index + 1),
      planets: distanceToPlanetsMap[distanceKey],
    };
  });
};

export default function CircularOrbit() {
  const orbits = generateOrbits(turfData);

 // console.log(orbits);

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
