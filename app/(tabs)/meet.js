import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";
import React, { useEffect } from "react";

import { Tabs } from "expo-router";
import { useState } from "react";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import RandomButton from "../../components/buttons/RandomButton";

const rightToLeft = require("../../assets/faces/right-to-left.png");
const leftToRight = require("../../assets/faces/left-to-right.png");
const random = require("../../assets/random.png");
const MAX_TRANSLATAE_Y = -deviceHeight + StatusBar.currentHeight;

const data = [...Array(40).keys()].map(() => ({
  key: faker.string.uuid(),
  turfName: faker.company.name(),
  location: faker.location.city(),
}));

const Meet = () => {
  const [fullModal, setFullModal] = useState(false);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
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

  const rModal = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATAE_Y + 150, MAX_TRANSLATAE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    const width = interpolate(
      translateY.value,
      [MAX_TRANSLATAE_Y + 150, MAX_TRANSLATAE_Y],
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
            marginTop: StatusBar.currentHeight,
            marginLeft: 30,
            marginBottom: 30,
            color: "white",
            fontWeight: "500",
            fontSize: 20
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
        <RandomButton title={'Host a Match'}/>
      </LinearGradient>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.modal, rModal]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <View>
              <Text>Hurry up!!! Join now</Text>
              <Text>Matches around you</Text>
            </View>
            <Pressable
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                fullModal ? setFullModal(false) : setFullModal(true);
              }}
            >
              <AntDesign
                name={fullModal ? "downsquare" : "upsquare"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.cardContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={random} style={styles.circularImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        name="md-football-sharp"
                        size={20}
                        color="black"
                      />
                      <Text style={styles.text}>6A Side</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="calendar" size={20} color="black" />
                      <Text style={styles.text}>19 July 2023 | 7:00 PM</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Entypo name="location-pin" size={20} color="black" />
                      <Text style={styles.text}>
                        LaLiga Thondayad Bypass Rd, Kozhikode
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  faceToFace: {
    width: 180,
    height: 180,
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
  imageContainer: {
    marginRight: 16,
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textContainer: {},
  text: {
    marginBottom: 8,
    fontSize: 14,
    width: deviceWidth / 2,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: "center",
    position: "absolute",
    width: deviceWidth - 20,
    top: deviceHeight,
    height: deviceHeight,
    //zIndex: 9999,
    elevation: 8,
  },
});

export default Meet;
