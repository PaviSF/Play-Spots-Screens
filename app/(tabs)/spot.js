import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import CircularOrbit from "../../components/circular-orbit/CircularOrbit";
import { Tabs } from "expo-router";
import Header from "../../components/header/Header";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";
import { faker } from "@faker-js/faker";
import { turfData } from "../../dataset";
import CardView from "../../components/spots/CardView";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import HorizontalSportsListItem from "../../components/spots/HorizontalSportsListItem";

const tabComponentColor = "#565657";
const activeSpotsIcon = require("../../assets/tab-icons/active-icons/active-stadium.png");

const data = [...Array(15).keys()].map(() => ({
  key: faker.string.uuid(),
  job: faker.animal.crocodilia(),
  extra: faker.animal.dog(),
}));

const sportsData = [
  { key: 0, sport: "Football" },
  { key: 1, sport: "Cricket" },
  { key: 2, sport: "Badminton" },
  { key: 3, sport: "Gym" },
  { key: 4, sport: "Tennis" },
  { key: 5, sport: "Volleyball" },
];

const _spacing = 8;

const _colors = {
  active: `grey`,
  inactive: `#FCD25900`,
};

const MAX_TRANSLATAE_Y = -deviceHeight + StatusBar.currentHeight;

const Spot = () => {
  const [fullModal, setfullModal] = useState(false);
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
      if (translateY.value < -deviceHeight / 1.5) {
        translateY.value = withSpring(MAX_TRANSLATAE_Y, { damping: 50 });
      } else {
        translateY.value = withSpring(-deviceHeight / 3, { damping: 50 });
      }
    });

  const rModal = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATAE_Y + 50, MAX_TRANSLATAE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    const width = interpolate(
      translateY.value,
      [MAX_TRANSLATAE_Y + 300, MAX_TRANSLATAE_Y],
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
    translateY.value = withSpring(-deviceHeight / 3, { damping: 50 });
  }, []);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Tabs.Screen options={{ headerShown: false }} />
        <View style={{ flex: 0.12 }}>
          <Header />
        </View>
        <FlatList
          style={{ flexGrow: 0, marginLeft: 10, height: deviceHeight / 20 }}
          data={sportsData}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingLeft: _spacing }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <HorizontalSportsListItem item={item}/>
            );
          }}
        />
        <View style={{ flex: 0.55 }}>
          <CircularOrbit />
        </View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.modal, rModal]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={turfData}
              style={{ flex: 1, marginTop: 20 }}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <CardView
                      spot={item.turfName}
                      place={item.turfLocation}
                      price={item.price}
                      ratings={item.ratings}
                    />
                  </View>
                );
              }}
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  category: {
    marginRight: _spacing - 3,
    padding: _spacing,
    borderWidth: 1,
    borderColor: _colors.active,
    borderRadius: 12,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    width: deviceWidth - 20,
    top: deviceHeight,
    //zIndex: 9999,
    elevation: 8,
  },
  modalHeadingLine: {
    flex: 1,
    width: deviceWidth / 4.5,
    borderRadius: 5,
    flex: 0.02,
    alignSelf: "center",
    backgroundColor: "black",
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
});

export default Spot;
