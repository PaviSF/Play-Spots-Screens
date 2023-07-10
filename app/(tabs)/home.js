import { faker, it } from "@faker-js/faker";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { Entypo } from "@expo/vector-icons";

const data = [...Array(5).keys()].map(() => ({
  key: faker.string.uuid(),
  turfName: faker.company.name(),
  location: faker.location.city(),
}));

const Home = () => {
  const fullName = faker.person.fullName();
  const profilePic = require("../../assets/247181.jpg");
  const turfImage = require("../../assets/download.jpeg");

  return (
    <View style={styles.mainContainer}>
      <Tabs.Screen
        options={{
          headerRight: () => {
            <View></View>;
          },
        }}
      />
      {/* Profile Details */}
      <View style={styles.profileContainer}>
        <Image source={profilePic} style={styles.profilePic} />
        <View style={styles.profileLabels}>
          <Text style={styles.greetings}>Good morning</Text>
          <Text style={styles.profileName}>{fullName}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search venues, events, sports"
        placeholderTextColor={"#707170"}
      />

      {/* Recent Updates */}
      <View style={styles.recentUpdates}></View>

      {/* Recent Spots Heading */}
      <View style={styles.recentSpots}>
        <View style={styles.dotAndTextALignment}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style={styles.recentSpotsLabel}>Your recent spots</Text>
        </View>
        <Text style={styles.viewText}>View all</Text>
      </View>

      {/* Recent Spots  */}
      <View style={styles.overallContainer}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={190}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.spotCard}>
                <Image source={turfImage} style={styles.turfImage} />
                <View style={styles.turfText}>
                  <Text style={styles.turfName}>{item.turfName}</Text>
                  <Text style={styles.turfLocation}>{item.location}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  profileContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profileLabels: {
    marginLeft: 10,
  },
  greetings: {
    fontSize: 17,
    fontWeight: 500,
    color: "grey",
  },
  profileName: {
    fontSize: 17,
    fontWeight: 500,
    color: "#01603d",
  },
  searchBar: {
    padding: 8,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    color: "black",
    margin: 20,
  },
  recentUpdates: {
    backgroundColor: "#e5ffef",
    width: "90%",
    height: "13%",
    padding: 8,
    width: "90%",
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "00ff87",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 2,
  },
  recentSpots: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  dotAndTextALignment: {
    flexDirection: "row",
  },
  recentSpotsLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  viewText: {
    fontSize: 12,
    marginRight: 25,
    paddingTop: 3,
  },
  overallContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  cardContainer: {
    height: "50%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    elevation: 1,
  },
  spotCard: {
    flex: 1,
    width: 190,
    borderRadius: 15,
    marginRight: 3,
    
  },
  turfImage: { height: "65%", width: "100%", borderRadius: 15 },
  fineLine: {
    margin: 3,
  },
  turfText: {
    margin: 8,
  },
  turfName: {
    fontWeight: "500",
  },
  turfLocation: {
    fontSize: 10,
  },
});

export default Home;
