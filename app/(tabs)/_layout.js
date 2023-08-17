import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const profileIcon = require("../../assets/tab-icons/inactive-icons/user.png");
const spotsIcon = require("../../assets/tab-icons/inactive-icons/stadium.png");
//const homeIcon = require("../../assets/tab-icons/inactive-icons/house.png");
const meetsIcon = require("../../assets/tab-icons/inactive-icons/support.png");
const eventsIcon = require("../../assets/tab-icons/inactive-icons/sport.png");

const activeProfileIcon = require("../../assets/tab-icons/active-icons/active-user.png");
const activeSpotsIcon = require("../../assets/tab-icons/active-icons/active-stadium.png");
const activeHomeIcon = require("../../assets/tab-icons/active-icons/active-house.png");
const activeMeetsIcon = require("../../assets/tab-icons/active-icons/active-support.png");
const activeEventsIcon = require("../../assets/tab-icons/active-icons/active-sport.png");

const tabComponentColor = "#565657";

const TabLayout = () => {
  return (
    <View style={styles.tabBarContainer}>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="(drawer)"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Feather
                  name="user"
                  color={"black"}
                  size={25}
                  style={styles.icon}
                />
                <Text style={styles.tabText}>Profile</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="spot"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View>
                <Image source={spotsIcon} style={styles.icon} />
                <Text style={styles.tabText}>Spots</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={styles.homeCircle}>
                <Image source={activeHomeIcon} style={styles.icon} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            tabBarIcon: () => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={eventsIcon} style={styles.icon} />
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
                <Image source={meetsIcon} style={styles.icon} />
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
  tabBarContainer: { flex: 1, backgroundColor: "#FFFFFF80" },
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
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 1,
  },
  icon: {
    height: 30,
    width: 30,
    padding: 2,
  },
  tabIcon: { paddingTop: 5, alignSelf: "center" },
  tabText: {
    fontSize: 10,
    color: tabComponentColor,
  },
  header: {
    backgroundColor: "#FFFFFF",
  },
});

export default TabLayout;
