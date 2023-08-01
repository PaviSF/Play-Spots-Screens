import { deviceWidth } from "../constants/Dimension";
import { calculateDistance, calculateAngle } from "../helper/CalculateDistance";
const RADIUS_FACTOR = deviceWidth / 8.3;
//const image = require("../assets/match-box.png");
const imageBaseLink = "https://d3th8mtd05b6hz.cloudfront.net/turf/";
const distanceToPlanetsMap = {};

//Circular Orbit
const generateOrbits = (spotsData, location) => {
  for (let i = 0; i < spotsData.length; i++) {
    const distance = Math.ceil(
      calculateDistance(
        spotsData[i].location.coordinates[1],
        spotsData[i].location.coordinates[0],
        location.latitude,
        location.longitude
      )
    );

    const angle = calculateAngle(
      spotsData[i].location.coordinates[1],
      spotsData[i].location.coordinates[0],
      location.latitude,
      location.longitude
    );

    const image = imageBaseLink + spotsData[i].images[0];
    const planet = {
      name: spotsData[i].turf_name,
      image,
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

  return Object.keys(distanceToPlanetsMap).map((distanceKey, index) => {
    return {
      name: `Orbit ${distanceKey}`,
      radius: RADIUS_FACTOR * (index + 1),
      planets: distanceToPlanetsMap[distanceKey],
    };
  });
};

//Solar System
export { generateOrbits };
