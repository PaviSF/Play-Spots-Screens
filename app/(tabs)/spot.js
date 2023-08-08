//React imports
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

//Expo imports
import { Tabs } from "expo-router";

//External imports
import { useSelector } from "react-redux";

//Internal imports
import HorizontalSportsListItem from "../../components/spots/HorizontalSportsListItem";
import CircularOrbit from "../../components/circular-orbit/CircularOrbit";
import CardView from "../../components/spots/CardView";
import Header from "../../components/header/Header";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";
import { removeAfterSecondComma } from "../../helper/StringManipulation";

//constant styles
const tabComponentColor = "#565657";
const _spacing = 8;
const _colors = {
  active: `grey`,
  inactive: `#FCD25900`,
};

const sportsData = [
  { key: 0, sport: "Football" },
  { key: 1, sport: "Cricket" },
  { key: 2, sport: "Badminton" },
  { key: 3, sport: "Gym" },
  { key: 4, sport: "Tennis" },
  { key: 5, sport: "Volleyball" },
];

const MAX_TRANSLATAE_Y = -deviceHeight + StatusBar.currentHeight;

const Spot = () => {
  const location = useSelector((state) => state.location.value);
  const data = useSelector((state) => state.turfs.value);
  const [isLoading, setIsLoading] = useState(true);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan() //Used to update Y axis position for bottomsheet
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

  //Used to update the changes in style of bottomsheet
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
    if (data !== null) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tabs.Screen options={{ headerShown: false }} />
      <View style={{ flex: 0.12 }}>
        <Header />
      </View>

      {/* Horizontal Sports List */}
      <FlatList
        style={{ flexGrow: 0, marginLeft: 10, height: deviceHeight / 20 }}
        data={sportsData}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => {
          return <HorizontalSportsListItem item={item} />;
        }}
      />

      <View style={{ flex: 0.55 }}>
        <CircularOrbit data={data} location={location} />
      </View>

      {/* Bottomsheet of Turfs */}
      <Animated.View style={[styles.modal, rModal]}>
        <GestureDetector gesture={gesture}>
          <View style={{ width: "100%", height: 27 }}>
            <View
              style={{
                height: 7,
                borderRadius: 20,
                width: "20%",
                backgroundColor: "#727272",
                alignSelf: "center",
              }}
            />
          </View>
        </GestureDetector>
        {data !== null ? (
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <CardView
                  spot={item.turf_name}
                  place={removeAfterSecondComma(item.location.place)}
                  price={item.lowest_price}
                  ratings={3}
                  image={item.images[0]}
                />
              );
            }}
          />
        ) : (
          <View style={{ height: deviceHeight }}></View>
        )}
      </Animated.View>
    </View>
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
    borderRadius: 25,
    alignSelf: "center",
    position: "absolute",
    width: deviceWidth - 20,
    top: deviceHeight,
    height: deviceHeight / 1.08,
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
