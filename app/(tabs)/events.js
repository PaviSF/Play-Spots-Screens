import {
  Animated,
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/header/Header";
import React, { useRef } from "react";
import LargeGradientButton from "../../components/buttons/LargeGradientButton";
import SmallGradientButton from "../../components/buttons/SmallGradientButton";

import { deviceWidth, deviceHeight } from "../../constants/Dimension";
import { faker, it } from "@faker-js/faker";
import { Feather } from "@expo/vector-icons";
import HorizontalSportsListItem from "../../components/spots/HorizontalSportsListItem";

const sampleDate = "12 October 2023";
const sampleTime = "07:00 PM";
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

const _spacing = 5;

const Events = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.mainContainer}>
      <Tabs.Screen options={{ headerShown: false }} />
      <Header />
      <LargeGradientButton title={"Host An Event"} />

      <Text
        style={{ fontWeight: 500, color: "grey", marginLeft: 10, fontSize: 15 }}
      >
        Sports events nearby you
      </Text>
      <FlatList
        style={{ flexGrow: 0, marginTop: 5 }}
        data={sportsData}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: 2 * _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return <HorizontalSportsListItem item={item} />;
        }}
      />
      <Animated.FlatList
        style={{ flex: 1, marginTop: 15 }}
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            (deviceHeight / 3.3) * index,
            (deviceHeight / 3.3) * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1595030044556-acfaa61edc0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcCUyMG5vdXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
                }}
                style={styles.image}
                resizeMode="cover"
              >
                <View style={{ flex: 0.8, marginTop: 10, marginLeft: 10 }}>
                  <Text style={styles.title}>Deega championship 2023</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="calendar" size={18} color="white" />
                    <Text style={styles.description}>
                      {`${sampleDate} | ${sampleTime}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginHorizontal: 13,
                    marginVertical: 4,
                  }}
                >
                  <SmallGradientButton title={"Join"} />
                </View>
              </ImageBackground>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  card: {
    width: deviceWidth - 20,
    alignSelf: "center",
    marginBottom: 10,
    height: deviceHeight / 3.5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginLeft: 8,
  },
});

export default Events;
