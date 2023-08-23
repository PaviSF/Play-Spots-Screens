import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShadowVisible: false, title: "Booking" }}
      />
      <Stack.Screen
        name="next"
        options={{ headerShadowVisible: false, title: "Booking" }}
      />
      <Stack.Screen name="booked" options={{ headerShown: false}} />
    </Stack>
  );
};

export default _layout;
