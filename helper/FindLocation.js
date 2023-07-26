import { View, Text } from "react-native";
import React from "react";
import * as Location from "expo-location";

const FindLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Please grant location permissions");
    return;
  }

  let currentLocation = await Location.getCurrentPositionAsync({});
  return currentLocation;
};

export default FindLocation;
