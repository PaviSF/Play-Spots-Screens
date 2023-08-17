import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="favourites" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MainLayout;
