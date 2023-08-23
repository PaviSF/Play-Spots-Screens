import { View, Text } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import noteReducer from "../features/notes";
import locationReducer from "../features/location";
import turfsReducer from "../features/turfs";
import { Stack } from "expo-router";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    note: noteReducer,
    location: locationReducer,
    turfs: turfsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

const MainLayout = () => {
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
