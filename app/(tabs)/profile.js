import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
import { deviceHeight, deviceWidth } from "../../constants/dimensions";
import ProfileList from "../../components/profile/profileList";

const profileName = faker.person.fullName();
const profileEmail = faker.internet.email();
const profileImage = require("../../assets/247181.jpg");

const Profile = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
    >
      <View style={styles.accountDetailsContainer}>
        <Image style={styles.profileImage} source={profileImage} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.profileEmail}>{profileEmail}</Text>
          <Text></Text>
        </View>
      </View>
      <Text style={styles.activitiesLabel}>My Activities</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.reportHeading}>
          <Text>Weekly</Text>
        </View>
        <View style={styles.reportHeading}>
          <Text>Monthly</Text>
        </View>
        <View style={styles.reportHeading}>
          <Text>Yearly</Text>
        </View>
      </View>
      <View style={styles.activitiesDetailsContainer}>
        <View
          style={{ flex: 0.45, backgroundColor: "red", borderRadius: 10 }}
        ></View>
        <View style={styles.scheduleContainer}>
          <Text>Sports Schedules</Text>
        </View>
      </View>
      <ProfileList label="My Booking" />
      <ProfileList label="My Rewards" />
      <ProfileList label="Help & Support" />
      <ProfileList label="My Favourites" />
      <ProfileList label="Cancellation/Reschedule" />
      <ProfileList label="Refer & Earn playcoin" />
      <ProfileList label="Logout" />
      <ProfileList label="Delete Account" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  accountDetailsContainer: {
    flexDirection: "row",
    width: deviceWidth - 20,
    height: deviceHeight / 6,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 30,
  },
  profileDetails: {
    marginLeft: 10,
  },
  profileName: {
    fontWeight: "600",
  },
  profileEmail: {
    fontWeight: "600",
    fontSize: 12,
  },
  activitiesLabel: {
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "500",
  },
  reportHeading: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
    borderWidth: 1,
  },
  activitiesDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: deviceHeight / 3.5,
    width: deviceWidth - 20,
    margin: 10,
  },
  scheduleContainer: { flex: 0.5, backgroundColor: "blue", borderRadius: 10 },
});

export default Profile;
