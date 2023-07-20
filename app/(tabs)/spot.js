import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import CircularOrbit from "../../components/circular-orbit/CircularOrbit";
import { Tabs } from "expo-router";
import Header from "../../components/header/Header";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";

import { faker } from "@faker-js/faker";
import CardView from "../../components/spots/CardView";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

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
      if (translateY.value < -deviceHeight / 2) {
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
    <GestureHandlerRootView style={{flex:1}}>
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
        showsHorizontalScrollIndicator={true}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => {}} style={{}}>
              <View style={styles.category}>
                <Text
                  style={{
                    color: "#36303F",
                    fontWeight: "700",
                    marginHorizontal: 15,
                  }}
                >
                  {item.sport}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ flex: 0.55 }}>
        <CircularOrbit />
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.modal,
            {
              top: deviceHeight,
              // height: fullModal ? deviceHeight : deviceHeight / 3,
            },
            rModal,
          ]}
        >
          <TouchableOpacity
            style={styles.modalHeadingLine}
            onPress={() => setfullModal(!fullModal)}
          ></TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            style={{ flex: 1, margin: 20 }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <CardView />
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
    backgroundColor: _colors.inactive,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    width: deviceWidth - 20,
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
});

export default Spot;
