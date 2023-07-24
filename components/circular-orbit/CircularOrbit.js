import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  calculateDistance,
  calculateAngle,
} from "../../helper/CalculateDistance";

// You can import from local files
import SolarSystem from "./SolarSystem";
import { turfData } from "../../dataset";
import { deviceWidth } from "../../constants/Dimension";

const RADIUS_FACTOR = deviceWidth / 8.3;

const distanceToPlanetsMap = {};

// const calculateDistance = () => {
//   return (Math.random() * 8) % 16;
// };

const generateOrbits = (spotsData) => {
  for (let i = 0; i < spotsData.length; i++) {
    const distance = Math.ceil(
      calculateDistance(
        spotsData[i].turfLocationCo.latitude,
        spotsData[i].turfLocationCo.longitude,
        11.271201451658536,
        75.78003870204095
      )
    );

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
      angle,
    };

    if (distance <= 2) {
      if (!distanceToPlanetsMap[1]) {
        distanceToPlanetsMap[1] = [planet];
      } else if (distanceToPlanetsMap[1].length < 2) {
        distanceToPlanetsMap[1].push(planet);
      }
    } else if (distance > 2 && distance <= 4) {
      if (!distanceToPlanetsMap[2]) {
        distanceToPlanetsMap[2] = [planet];
      } else if (distanceToPlanetsMap[2].length < 2) {
        distanceToPlanetsMap[2].push(planet);
      }
    } else if (distance > 4 && distance <= 6) {
      if (!distanceToPlanetsMap[3]) {
        distanceToPlanetsMap[3] = [planet];
      } else if (distanceToPlanetsMap[3].length < 2) {
        distanceToPlanetsMap[3].push(planet);
      }
    } else if (distance > 6) {
      if (!distanceToPlanetsMap[4]) {
        distanceToPlanetsMap[4] = [planet];
      } else if (distanceToPlanetsMap[4].length < 2) {
        distanceToPlanetsMap[4].push(planet);
      }
    }
  }

  console.log(distanceToPlanetsMap[4] + "bello");

  return Object.keys(distanceToPlanetsMap).map((distanceKey, index) => {
    return {
      name: `Orbit ${distanceKey}`,
      radius: RADIUS_FACTOR * (index + 1),
      planets: distanceToPlanetsMap[distanceKey],
    };
  });
};

export default function CircularOrbit() {
  const orbits = generateOrbits(turfData);
  // if (orbits.length > 0) {
  //   orbits[0].radius += RADIUS_FACTOR * 0.2; // Adjust the scaling factor as needed
  // }
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
