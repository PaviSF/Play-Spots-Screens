//React imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

//Expo imports
import { Tabs } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

//External imports
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";

//Internal imports
import RandomButton from "@components/buttons/RandomButton";
import XSmallGradientButton from "@components/buttons/XSmallGradientButton";
import { removeAfterSecondComma } from "@helper/StringManipulation";
import { deviceHeight, deviceWidth } from "@constants/Dimension";

//constants
const rightToLeft = require("@assets/faces/right-to-left.png");
const leftToRight = require("@assets/faces/left-to-right.png");
const random = require("@assets/random.png");
const MAX_TRANSLATAE_Y = -deviceHeight + StatusBar.currentHeight;

const Meet = () => {
  const data = useSelector((state) => state.turfs.value);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan() //used to update Y axis position for bottomsheet
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATAE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -deviceHeight / 1.4) {
        translateY.value = withSpring(MAX_TRANSLATAE_Y, { damping: 50 });
      } else {
        translateY.value = withSpring(-deviceHeight / 1.9, { damping: 50 });
      }
    });

  //Used to update the changes in style of bottomsheet
  const rModal = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATAE_Y + 150, MAX_TRANSLATAE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    const width = interpolate(
      translateY.value,
      [MAX_TRANSLATAE_Y + 350, MAX_TRANSLATAE_Y],
      [deviceWidth - 20, deviceWidth],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      width,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withSpring(-deviceHeight / 1.9, { damping: 50 });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tabs.Screen options={{ headerShown: false }} />

      {/* Banner with the host a match button */}
      <LinearGradient
        colors={["#02A949", "#028A39", "#10753E", "#15653B"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.01, 0.3, 0.7]}
        style={{
          marginTop: StatusBar.currentHeight + 10,
          flex: 0.45,
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            marginTop: deviceWidth / 13.7,
            marginLeft: deviceWidth / 16.14,
            marginBottom: deviceWidth / 25,
            color: "white",
            fontWeight: "500",
            fontSize: deviceWidth / 20.55,
          }}
        >
          Discover your sports buddies
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Image source={leftToRight} style={styles.faceToFace} />
          <Image source={rightToLeft} style={styles.faceToFace} />
        </View>
        <RandomButton
          title={"Host a Match"}
          onPress={() => console.log(deviceWidth)}
        />
      </LinearGradient>

      {/* Bottomsheet of Matches */}
      <Animated.View style={[styles.modal, rModal]}>
        <View
          style={{
            marginHorizontal: deviceWidth / 20,
            marginTop: deviceWidth / 20,
            marginBottom: deviceWidth / 40,
          }}
        >
          <GestureDetector gesture={gesture}>
            <View>
              <Text style={styles.modalHeader}>{process.env.EXPO_PUBLIC_API_BASE_URL}</Text>
              <Text style={styles.modalSubHeading}>Matches around you</Text>
            </View>
          </GestureDetector>
        </View>
        <FlatList
          data={data}
          //keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.cardContainer}>
                <Image source={random} style={styles.circularImage} />
                <View
                  style={{
                    height: deviceHeight / 8,
                    width: 0.8,
                    marginHorizontal: 10,
                    backgroundColor: "grey",
                  }}
                />
                <View style={styles.textContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="md-football-sharp"
                      size={20}
                      color="green"
                    />
                    <Text style={styles.text}>{item.turf_name}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="calendar" size={20} color="green" />
                    <Text style={styles.text}>19 July 2023 | 7:00 PM</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Entypo name="location-pin" size={20} color="green" />
                    <Text style={styles.text}>
                      {removeAfterSecondComma(item.location.place)}
                    </Text>
                  </View>
                  <XSmallGradientButton title={"Join"} />
                </View>
              </View>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  faceToFace: {
    width: deviceHeight / 4.66,
    height: deviceHeight / 4.66,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textContainer: {},
  text: {
    marginBottom: 8,
    fontSize: 10,
    width: deviceWidth / 2.5,
    fontWeight: "bold",
    color: "grey",
    paddingTop: 2,
    paddingLeft: 5,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: "center",
    position: "absolute",
    width: deviceWidth - 20,
    top: deviceHeight,
    height: deviceHeight / 1.08,
    //zIndex: 9999,
    elevation: 8,
  },
  modalHeader: {
    color: "#4A4A4A",
    fontSize: 20,
    fontWeight: "500",
  },
  modalSubHeading: {
    color: "#4A4A4A",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default Meet;
