import { View, Text } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import noteReducer from "../features/notes";
import { Stack } from "expo-router";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

const MainLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default MainLayout;
