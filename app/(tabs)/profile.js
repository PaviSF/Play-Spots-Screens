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
} from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
// import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../helper/CalculateMonth";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AntDesign, Foundation } from "@expo/vector-icons";
import ProfileList from "../../components/profile/ProfileList";
import DatePick from "../../components/date-picker/DatePick";

const profileName = faker.person.fullName();
const profileEmail = faker.internet.email();
const profileImage = require("../../assets/247181.jpg");

const cricket = require("../../assets/cricket-icon.png");
const football = require("../../assets/football-icon.png");
const badminton = require("../../assets/badminton.png");

const Profile = () => {
  const note = useSelector((state) => state.note.value);
  const { height, width } = useWindowDimensions();
  const [innerScrollActive, setInnerScrollActive] = useState(false);
  const [sportReport, setSportReport] = useState("WEEKLY");

  const handleInnerScroll = (scrollEvent) => {
    const { contentOffset, contentSize, layoutMeasurement } =
      scrollEvent.nativeEvent;
    const innerScrollEndReached =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;

    // Check if the inner scroll is active
    if (innerScrollEndReached && !innerScrollActive) {
      setInnerScrollActive(true);
    } else if (!innerScrollEndReached && innerScrollActive) {
      setInnerScrollActive(false);
    }
  };

  function getDate(str) {
    var words = str.split(" ");
    return words[0];
  }

  function getMonth(str) {
    var words = str.split(" ");
    return words[1];
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      scrollEnabled={!innerScrollActive}
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
      <View style={{ flexDirection: "row",marginLeft:10 }}>
        <TouchableOpacity style={styles.reportHeading} onPress={()=>setSportReport('WEEKLY')}>
          <Text style={{fontWeight:'500',color:sportReport === 'WEEKLY'? 'black' : 'grey'}}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportHeading} onPress={()=>setSportReport('MONTHLY')}>
          <Text style={{fontWeight:'500',color:sportReport === 'MONTHLY'? 'black' : 'grey'}} >Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportHeading} onPress={()=>setSportReport('YEARLY')}>
          <Text style={{fontWeight:'500',color:sportReport === 'YEARLY'? 'black' : 'grey'}}>Yearly</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.activitiesDetailsContainer}>
        <View
          style={{
            flex: 0.45,
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
          }}
        >
          <View style={{ flex: 0.6, justifyContent: "space-between" }}>
            <View style={styles.sportActivityContainer}>
              <Image source={football} style={[styles.sportsIcon, {}]} />
              <View style={{ flex: 0.7, flexDirection: "row" }}>
                <AntDesign name="clockcircleo" size={15} color="black" />
                <Text style={styles.sportActivityText}>5h 30 mins</Text>
              </View>
            </View>
            <View style={styles.sportActivityContainer}>
              <Image source={cricket} style={styles.sportsIcon} />
              <View style={{ flex: 0.7, flexDirection: "row" }}>
                <AntDesign name="clockcircleo" size={15} color="black" />
                <Text style={styles.sportActivityText}>2h 30 mins</Text>
              </View>
            </View>
            <View style={styles.sportActivityContainer}>
              <Image source={badminton} style={styles.sportsIcon} />
              <View style={{ flex: 0.7, flexDirection: "row" }}>
                <AntDesign name="clockcircleo" size={15} color="black" />
                <Text style={styles.sportActivityText}>1h</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.2 }}>
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
              style={{ width: "90%", alignSelf: "center", fontWeight: "600" }}
            >
              9 sports hours
            </Text>
            <Text
              style={{
                width: "90%",
                alignSelf: "center",
                fontSize: 10,
                fontWeight: "500",
              }}
            >
              spent last week
            </Text>
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
              onScroll={handleInnerScroll}
              scrollEventThrottle={16}
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
              <Text style={{fontWeight:'700',color:"#DCD6D0"}}>No Notes</Text>
            </View>
          )}
        </View>
      </View>
      <ProfileList label="My Booking" />
      <ProfileList label="My Rewards" />
      <ProfileList label="Help & Support" />
      <ProfileList label="My Favourites" />
      <ProfileList label="Cancellation/Reschedule" />
      <ProfileList label="Refer & Earn playcoin" />
      <ProfileList label="Logout" />
      <ProfileList label="Delete Account" color={'red'} />
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
    borderColor: 'grey'
  },
  activitiesDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: deviceHeight / 3.5,
    width: deviceWidth - 20,
    margin: 10,
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
    flex: 0.5,
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
    height: 60,
    width: 60,
    flex: 0.3,
    marginRight: 10,
  },
  sportActivityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sportActivityText: {
    fontSize: 12,
    color: "green",
    fontWeight: "500",
    marginLeft: 5,
  },
});

export default Profile;
