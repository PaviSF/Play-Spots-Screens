const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
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

  export default calculateDistance;

  