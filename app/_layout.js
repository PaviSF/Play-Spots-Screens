import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import noteReducer from "../features/notes";
import locationReducer from "../features/location";
import turfsReducer from "../features/turfs";
import bookingReducer from "../features/booking";
import { Stack } from "expo-router";
import { configureStore } from "@reduxjs/toolkit";
import messaging from "@react-native-firebase/messaging";

const store = configureStore({
  reducer: {
    note: noteReducer,
    location: locationReducer,
    turfs: turfsReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

const MainLayout = () => {
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging()
      .getToken()
      .then((token) => console.log(token));

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      //navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(initial)" options={{ headerShown: false }} />
        <Stack.Screen name="booking" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default MainLayout;
