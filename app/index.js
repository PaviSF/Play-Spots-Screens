import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { setLocation } from "../features/location";
import { findLocation, reverseGeocode } from "../helper/FindLocation";
import { useDispatch } from "react-redux";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("LOGGED_IN");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      return value.LOGGED_IN;
    } catch (e) {
      // error reading value
      //console.error("User not found");
    }
  };

  const setInstallationId = async () => {
    try {
      await AsyncStorage.setItem("ud_id", Crypto.randomUUID());
    } catch (e) {
      // saving error
    }
  };

  const checkInstallationId = async () => {
    const value = await AsyncStorage.getItem("ud_id");
    // value previously stored
    return value;
  };

  const getNoteData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-notes");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      //
    }
  };

  async function fetchLocation() {
    const currentLocation = await findLocation();
    const geoLocation = await reverseGeocode(currentLocation);
    const location = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      district: geoLocation[0].city,
      state: geoLocation[0].region,
      country: geoLocation[0].country,
    };
    dispatch(setLocation(location));
  }

  useEffect(() => {
    async function prepare() {
      try {
        const firstTime = !await checkInstallationId();
        firstTime && (await setInstallationId());
        await getNoteData();
        await fetchLocation();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      const status = await getData();
      await SplashScreen.hideAsync();
      if (status) {
        // value previously stored
        router.push("(tabs)/home");
      } else {
        router.push("(initial)/login");
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <Text>SplashScreen Demo! 👋</Text>
    </View>
  );
}
