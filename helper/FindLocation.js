import { View, Text } from "react-native";
import React from "react";
import * as Location from "expo-location";

const findLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Please grant location permissions");
    return;
  }

  let currentLocation = await Location.getCurrentPositionAsync({});
  return currentLocation;
};

const reverseGeocode = async (location) => {
  const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    longitude: location.coords.longitude,
    latitude: location.coords.latitude,
  });

  return reverseGeocodedAddress;
};

export { findLocation,reverseGeocode };
