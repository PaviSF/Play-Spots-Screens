import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home_page" options={{ headerShown: false }} />
      <Stack.Screen name="search_location" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
