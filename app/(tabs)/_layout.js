import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Feather, FontAwesome5 } from "@expo/vector-icons";

const tabComponentColor = "#565657";

const TabLayout = () => {
  return (
    <View style={styles.tabBarContainer}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "yellow",
          tabBarHideOnKeyboard:true,
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: "My profile",
            headerTitleAlign: "center",
            headerTitleStyle: {fontWeight:"100",fontSize:18},
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
            headerStyle: {},
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
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  tabBar: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingColor: "white",
    borderRadius: 25,
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
  header: {
    backgroundColor: "#FFFFFF",
  },
});

export default TabLayout;
