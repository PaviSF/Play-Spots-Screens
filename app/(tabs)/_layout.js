import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Feather, FontAwesome5 } from "@expo/vector-icons";

const tabComponentColor = "#565657";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: () => (
            <View>
              <FontAwesome
                name="user"
                size={25}
                color={tabComponentColor}
                style={styles.tabIcon}
              />
              <Text style={styles.tabText}>Profile</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="spot"
        options={{
          title: "Spots",
          tabBarIcon: () => (
            <View>
              <FontAwesome
                name="user"
                size={25}
                color={tabComponentColor}
                style={styles.tabIcon}
              />
              <Text style={styles.tabText}>Spots</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <View style={styles.homeCircle}>
              <Feather name="home" size={40} color="black" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: () => (
            <View>
              <FontAwesome
                name="user"
                size={25}
                color={tabComponentColor}
                style={styles.tabIcon}
              />
              <Text style={styles.tabText}>Events</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="meet"
        options={{
          title: "Meet",
          tabBarIcon: () => (
            <View>
              <FontAwesome5
                name="handshake"
                size={25}
                color={tabComponentColor}
                style={styles.tabIcon}
              />
              <Text style={styles.tabText}>Meet</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    margin: 10,
    borderRadius: 60,
    backgroundColor: "#e4feef",
    flex: 0.075,
  },
  homeCircle: {
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "00ff87",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 2,
  },
  tabIcon: { paddingTop: 5, alignSelf: "center" },
  tabText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
    color: tabComponentColor,
  },
});

export default TabLayout;
