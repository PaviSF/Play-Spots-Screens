//React imports
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

//Expo imports
import { Stack, Tabs, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

//External imports
import { faker } from "@faker-js/faker";

//Internal imports
import Header from "../../../components/header/Header";
import HorizontalTurfList from "../../../components/home/HorizontalTurfList";
import CustomImageCarousal from "../../../components/carousel/Carousel";
import { getDiscountBanner, getTurfData } from "../../../helper/FetchData";
import { deviceHeight, deviceWidth } from "../../../constants/Dimension";
import { useDispatch, useSelector } from "react-redux";
import { getGreeting } from "../../../helper/GiveGreetings";
import { setTurfs } from "../../../features/turfs";


const Home = () => {
  const fullName = faker.person.fullName();
  const profilePic = require("../../../assets/247181.jpg");
  const gift = require("../../../assets/gift.png");
  const coins = require("../../../assets/coins.png");
  const tournament = require("../../../assets/tournament.png");
  const turfBackground = require("../../../assets/turf-background.png");

  const windowHeight = useWindowDimensions().height;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [bannerData, setBannerData] = useState([]);
  const [tData, setTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.value);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turfData = await getTurfData(
          location.longitude,
          location.latitude
        );
        dispatch(setTurfs(turfData));
        setTData(turfData);
        const bData = await getDiscountBanner(
          location.longitude,
          location.latitude
        );
        setBannerData(bData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Update loading state when data fetching is done
      }
    };
    fetchData();
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Tabs.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View
      style={[styles.mainContainer, { minHeight: Math.round(windowHeight) }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      {/* Profile Details */}
      <View style={styles.profileContainer}>
        <Image source={profilePic} style={styles.profilePic} />
        <View style={styles.profileLabels}>
          <Text style={styles.greetings}>{getGreeting()}</Text>
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

      <HorizontalTurfList data={tData} />
      <View style={{ flex: 5 }}>
        <View style={{ flex: 0.3 }} />
        <CustomImageCarousal data={bannerData} />
        <Image
          source={turfBackground}
          style={{
            width: deviceWidth,
            height: deviceWidth / 7,
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  mainContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  profileContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  profilePic: {
    width: deviceWidth / 8.22,
    height: deviceWidth / 8.22,
    borderRadius: 100,
  },
  profileLabels: {
    marginLeft: 10,
  },
  greetings: {
    fontSize: deviceWidth / 24.17,
    fontWeight: 500,
    color: "grey",
  },
  profileName: {
    fontSize: deviceWidth / 24.17,
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
    width: deviceWidth / 5.13,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  recentUpdatesImage: {
    height: deviceWidth / 8.22,
    width: deviceWidth / 8.22,
    marginBottom: 3,
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
    flex: 0.6, // Set flex to 0.7 to reduce the height of the FlatList
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 15,
  },
  cardContainer: {
    flexGrow: 1,
    height: deviceHeight / 4.5,
    shadowColor: "00ff87",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 7,
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
  textAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  turfText: {
    flex: 0.2,
    margin: 8,
  },
  turfName: {
    fontSize: 13,
    paddingBottom: 2,
    fontWeight: "500",
  },
  turfLocation: {
    fontSize: 10,
    paddingBottom: 2,
    width: deviceWidth / 3.5,
  },
});

export default Home;
