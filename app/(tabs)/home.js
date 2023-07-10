import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const Home = () => {
  return (
    <View>
      <Tabs.Screen
        options={{
          headerRight: () => {
            <View>
              <Text>Pla</Text>
            </View>
          },
        }}
      />
      <Text>Home</Text>
    </View>
  );
};

export default Home;
