import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { formatDate } from "@helper/CalculateMonth";
import { deviceHeight, deviceWidth } from "@constants/Dimension";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DatePick from "@components/date-picker/DatePick";
import { Stack } from "expo-router";
import { getProfileData } from "@helper/FetchData";

const profileImage = require("@assets/247181.jpg");

const cricket = require("@assets/cricket-icon.png");
const football = require("@assets/football-icon.png");
const badminton = require("@assets/badminton.png");
const Profile = () => {
  const note = useSelector((state) => state.note.value);
  const [loading,setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { height, width } = useWindowDimensions();
  const [sportReport, setSportReport] = useState("WEEKLY");

  function getDate(str) {
    var words = str.split(" ");
    return words[0];
  }

  function getMonth(str) {
    var words = str.split(" ");
    return words[1];
  }

  const headerRight = () => {
    return (
      <TouchableOpacity>
        <AntDesign
          name="setting"
          size={24}
          color="black"
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    async function prepare() {
      const data = await getProfileData();
      setProfileData(data.user_data);
      setLoading(false)
    }
    prepare();
  }, []);
  if(loading){
    return <ActivityIndicator style={{alignItems:'center'}}/>
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "My profile",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "100", fontSize: 15 },
          // headerRight,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
      >
        <View style={styles.accountDetailsContainer}>
          <Image style={styles.profileImage} source={profileImage} />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileEmail}>{profileData.phone}</Text>
            <Text style={styles.profileEmail}>{profileData.email}</Text>
          </View>
        </View>
        <Text style={styles.activitiesLabel}>My Activities</Text>
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <TouchableOpacity
            style={styles.reportHeading}
            onPress={() => {
              setSportReport("WEEKLY");
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: sportReport === "WEEKLY" ? "black" : "grey",
              }}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reportHeading}
            onPress={() => setSportReport("MONTHLY")}
          >
            <Text
              style={{
                fontWeight: "500",
                color: sportReport === "MONTHLY" ? "black" : "grey",
              }}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reportHeading}
            onPress={() => setSportReport("YEARLY")}
          >
            <Text
              style={{
                fontWeight: "500",
                color: sportReport === "YEARLY" ? "black" : "grey",
              }}
            >
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesDetailsContainer}>
          <View
            style={{
              flex: 0.2,
              justifyContent: "space-between",
              borderRadius: 10,
              padding: 10,
              shadowColor: "rgba(0, 0, 0, 0.4)",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 3,
              backgroundColor: "#FFFFFF",
            }}
          >
            <View
              style={{
                flex: 0.4,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View style={styles.sportActivityContainer}>
                <Image source={football} style={styles.sportsIcon} />
                <View style={{ flex: 0.7, flexDirection: "row" }}>
                  <AntDesign name="clockcircleo" size={10} color="black" />
                  <Text style={styles.sportActivityText}>5h 30 mins</Text>
                </View>
              </View>
              <View style={styles.sportActivityContainer}>
                <Image source={cricket} style={styles.sportsIcon} />
                <View style={{ flex: 0.7, flexDirection: "row" }}>
                  <AntDesign name="clockcircleo" size={10} color="black" />
                  <Text style={styles.sportActivityText}>2h 30 mins</Text>
                </View>
              </View>
              <View style={styles.sportActivityContainer}>
                <Image source={badminton} style={styles.sportsIcon} />
                <View style={{ flexDirection: "row" }}>
                  <AntDesign name="clockcircleo" size={10} color="black" />
                  <Text style={styles.sportActivityText}>1h</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#DCD6D0",
                    borderRadius: 20,
                    width: "90%",
                    height: 5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "green",
                      borderRadius: 20,
                      width: "70%",
                      height: 5,
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  width: "90%",
                  alignSelf: "center",
                  fontWeight: "600",
                  fontSize: 10,
                }}
              >
                9 sports hours spent last week
              </Text>
              <Text
                style={{
                  width: "90%",
                  alignSelf: "center",
                  fontSize: 10,
                  fontWeight: "500",
                }}
              ></Text>
            </View>
          </View>
          <View style={styles.scheduleContainer}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ margin: 12, fontSize: 15, fontWeight: "500" }}>
                Sports Schedules
              </Text>
              <View style={{ position: "absolute", right: 5, bottom: 10 }}>
                <DatePick />
              </View>
            </View>
            {note.note[0] ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                nestedScrollEnabled
              >
                {note.date.map((date, index) => (
                  <View key={index}>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          marginLeft: 10,
                          backgroundColor: "#02b44f",
                          justifyContent: "center",
                          alignItems: "center",
                          width: width / 10,
                          height: height / 20,
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            color: "white",
                          }}
                        >
                          {getDate(formatDate(date))}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 500,
                            color: "white",
                          }}
                        >
                          {getMonth(formatDate(date))}
                        </Text>
                      </View>
                      <Text
                        style={{
                          marginLeft: 10,
                          width: width / 3,
                          fontWeight: 500,
                          fontSize: 12,
                        }}
                      >
                        {note.note[index]}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "black",
                        height: 0.3,
                        margin: 10,
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Foundation name="clipboard-notes" size={80} color="#DCD6D0" />
                <Text style={{ fontWeight: "700", color: "#DCD6D0" }}>
                  No Notes
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            height: deviceHeight / 7.5,
            marginBottom: 10,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity style={styles.extraOptionBoxes}>
            <Image
              source={require("@assets/booking.png")}
              resizeMode="contain"
              style={styles.extraOptionBoxesImages}
            />
            <Text style={styles.extraOptionBoxesText}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraOptionBoxes}>
            <Image
              source={require("@assets/gift.png")}
              resizeMode="contain"
              style={styles.extraOptionBoxesImages}
            />
            <Text style={styles.extraOptionBoxesText}>Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraOptionBoxes}>
            <Image
              source={require("@assets/heart.png")}
              resizeMode="contain"
              style={styles.extraOptionBoxesImages}
            />
            <Text style={styles.extraOptionBoxesText}>Favourites</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <LinearGradient
            colors={["#00D283", "#046D3C"]}
            style={styles.refer}
            start={[0, 0]}
            end={[1, 0]}
          >
            <View style={styles.referIconContainer}>
              <Image
                source={require("@assets/referIcon.png")}
                style={styles.referIcon}
              />
            </View>
            <View style={styles.referTextContainer}>
              <View style={{ padding: 15 }}>
                <Text style={styles.referText}>Refer</Text>
                <Text style={styles.referText}>& Earn playcoin</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </>
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
    borderRadius: 10,
    marginTop: 5,
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
    marginLeft: 4,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  activitiesDetailsContainer: {
    // flexDirection: "row",
    justifyContent: "space-evenly",
    height: deviceHeight / 3.3,
    width: deviceWidth - 20,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scheduleContainer: {
    flex: 0.65,
    justifyContent: "space-between",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  sportsIcon: {
    height: deviceWidth / 10,
    width: deviceWidth / 10,
    //flex: 0.3,
    marginRight: 3,
  },
  sportActivityContainer: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },
  sportActivityText: {
    fontSize: 9,
    color: "green",
    fontWeight: "500",
    marginLeft: 5,
  },
  extraOptionBoxes: {
    backgroundColor: "white",
    flex: 0.325,
    borderRadius: 5,
    elevation: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  extraOptionBoxesImages: {
    height: "60%",
    width: "60%",
  },
  extraOptionBoxesText: {
    fontSize: 12,
    fontWeight: "500",
    paddingTop: 10,
  },
  refer: {
    flexDirection: "row",
    width: "95%",
    height: deviceHeight / 9.5,
    borderRadius: 11,
    backgroundColor: "#00D283",
    alignSelf: "center",
  },
  referIconContainer: { flex: 0.45, alignItems: "flex-end" },
  referIcon: { position: "absolute", bottom: 0, height: 120, width: 100 },
  referTextContainer: { flex: 0.55, justifyContent: "flex-end" },
  referText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
    lineHeight: 20,
  },
});

export default Profile;
