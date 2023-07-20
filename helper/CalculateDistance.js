const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c; // Distance in km

  // Round the distance to the nearest specified values
  if (distance >= 0 && distance < 2) {
    distance = 2;
  } else if (distance >= 2 && distance < 4) {
    distance = 4;
  } else if (distance >= 4 && distance < 6) {
    distance = 6;
  } else if (distance >= 6 && distance < 8) {
    distance = 8;
  }

  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

function calculateAngle(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = deg2rad(lat1);
  const lon1Rad = deg2rad(lon1);
  const lat2Rad = deg2rad(lat2);
  const lon2Rad = deg2rad(lon2);

  // Calculate differences between the coordinates
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  // Haversine formula
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the angle in degrees
  let angle = (c * 180) / Math.PI;

  // Ensure the angle is between 0 and 360 degrees
  if (angle < 0) {
    angle += 360;
  }

  return angle;
}

export { calculateDistance,calculateAngle };
