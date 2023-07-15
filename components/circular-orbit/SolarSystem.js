import React, {useRef} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';



  const checkOverlap = (newAngle, angles, minDistance) => {
    for (let i = 0; i < angles.length; i++) {
      if (Math.abs(newAngle - angles[i]) < minDistance) {
        return true; // Overlapping detected
      }
    }
    return false; // No overlapping
  };

const generateRandomAngle = (existing) => {
    let angle = 0;
    while(existing.includes(Math.ceil(angle))){
         angle = Math.random() * 2 * Math.PI; // Generate a random angle  
      }
   existing.push(Math.ceil(angle))

   return angle;
}



const SolarSystem = ({ orbits }) => {

  const existingAngles = useRef([0])

  const renderPlanets = (planets, orbitRadius) => {
    return planets.map((planet, index) => {
      const angle = Math.random() * 2 * Math.PI; // Generate a random angle
      const x = Math.cos(angle) * orbitRadius; // Calculate x-coordinate based on angle and orbit radius
      const y = Math.sin(angle) * orbitRadius; // Calculate y-coordinate based on angle and orbit radius

      const planetStyle = {
        left: x - 30, // Adjust position to center the planet
        top: y - 15, // Adjust position to center the planet
      };

      return (
        <View key={index} style={[styles.planetContainer, planetStyle]}>
          <Image source={planet.image} style={styles.planetImage} />
          <Text style={styles.planetName}>{planet.distance}</Text>
        </View>
      );
    });
  };

  const renderOrbits = () => {
    return orbits.map((orbit, index) => {
      const scaledRadius = orbit.radius; // Adjust the scaling factor as needed
      
      return (
        <View key={index} style={[styles.orbit, { width: scaledRadius * 2, height: scaledRadius * 2 }]}>
          <View style={styles.planetContainer}>
            {renderPlanets(orbit.planets, scaledRadius)}
          </View>
          <View style={styles.centerImageContainer}>
            <Image source={require("../../assets/download.jpeg")} style={styles.centerImage} />
          </View>
        </View>
      );
    })
  };
  
  

  return (
    <View style={styles.container}>
      {renderOrbits()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbit: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 9999,
  },
  planetContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black'
  },
  planetName: {
    fontSize: 12,
    marginTop: 5,
  },
  centerImageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // Add any other styles you need
  },
  centerImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    // Add any other styles you need
  },
});

export default SolarSystem;