import { faker } from "@faker-js/faker";
import { BlurView } from "expo-blur";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import Header from "../../components/header/Header";

import { Entypo } from "@expo/vector-icons";
import CustomImageCarousal from "../../components/carousel/Carousel";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";

const data = [...Array(5).keys()].map(() => ({
  key: faker.string.uuid(),
  turfName: faker.company.name(),
  location: faker.location.city(),
}));

const data2 = [
  {
    image: require("../../assets/banner.png"),
  },
  {
    image: require("../../assets/banner.png"),
  },
  {
    image: require("../../assets/banner.png"),
  },
  {
    image: require("../../assets/banner.png"),
  },
];

const Home = () => {
  const fullName = faker.person.fullName();
  const profilePic = require("../../assets/247181.jpg");
  const turfImage = require("../../assets/download.jpeg");
  const football = require("../../assets/football.png");
  const cricket = require("../../assets/cricket.png");
  const book = require("../../assets/book.png");
  const gift = require("../../assets/gift.png");
  const coins = require("../../assets/coins.png");
  const tournament = require("../../assets/tournament.png");
  const turfBackground = require("../../assets/turf-background.png");

  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().height;

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <View
      style={[styles.mainContainer, { minHeight: Math.round(windowHeight) }]}
    >
      <Tabs.Screen options={{ headerShown: false }} />
      <Header />
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
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        placeholder="Search venues, events, sports"
        placeholderTextColor={"#707170"}
      />

      {/* Recent Updates */}
      <View style={styles.recentUpdates}>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image source={gift} style={styles.recentUpdatesImage} />
          <Text style={styles.recentUpdatesTexts}>3 offers for you</Text>
        </TouchableOpacity>
        <View style={styles.fineLines} />
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image source={coins} style={styles.recentUpdatesImage} />
          <Text style={styles.recentUpdatesTexts}>You have 200 coins</Text>
        </TouchableOpacity>
        <View style={styles.fineLines} />
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image source={tournament} style={styles.recentUpdatesImage} />
          <Text style={styles.recentUpdatesTexts}>2 events nearby you</Text>
        </TouchableOpacity>
      </View>

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
          style={{ flex: 1 }}
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
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Image source={football} style={{marginRight:5}} />
                    <Image source={cricket} />
                    <TouchableOpacity style={{ marginLeft: 75 }}>
                      <Image source={book} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 0.7 }}>
        <CustomImageCarousal data={data2}/>
        <Image source={turfBackground} style={{width:deviceWidth,height:65,alignSelf:'center'}}/>
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  fineLines: {
    //flex:1,
    height: 60,
    width: 0.65,
    backgroundColor: "grey",
  },
  recentUpdatesTexts: {
    width: 80,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  recentUpdatesImage: { height: 50, width: 50, marginBottom: 3 },
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
    height: deviceHeight / 5,
    shadowColor: "00ff87",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 2,
  },
  spotCard: {
    flex: 1,
    marginRight: 3,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  turfImage: {
    flex: 1.5,
    height: undefined,
    width: "100%",
    borderRadius: 15,
  },
  fineLine: {
    margin: 3,
  },
  turfText: {
    flex: 0.2,
    margin: 8,
    width: deviceWidth / 2.4,
  },
  turfName: {
    fontWeight: "500",
  },
  turfLocation: {
    fontSize: 10,
  },
});

export default Home;
