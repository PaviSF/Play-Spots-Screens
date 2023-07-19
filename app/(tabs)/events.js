import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/header/Header";
import React, { useRef } from "react";
import { faker } from "@faker-js/faker";
import GradientButton from "../../components/GradientButton";
import { deviceWidth, deviceHeight } from "../../constants/Dimension";
import { Button } from "react-native";

const data = [...Array(30).keys()].map(() => ({
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

const _colors = {
  active: `grey`,
  inactive: `#FCD25900`,
};
const _spacing = 10;

const horizontalSpacing = 20;
const AVATAR_SIZE = 70;

const turfImage = require("../../assets/download.jpeg");

const Events = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.mainContainer}>
      <Tabs.Screen options={{ headerShown: false }} />
      <Header />
      <View style={{ marginHorizontal: 100, marginBottom: 10 }}>
        <GradientButton title={"Host An Event"} />
      </View>
      <Text style={{fontWeight:500,color:'grey',marginLeft:10}}>Sports events nearby you</Text>
      <FlatList
        style={{ flexGrow: 0, marginTop: 5 }}
        data={sportsData}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
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
                  uri: "https://images.pexels.com/photos/13043589/pexels-photo-13043589.jpeg?cs=srgb&dl=pexels-mario-cuadros-13043589.jpg&fm=jpg",
                }}
                style={styles.image}
                resizeMode="cover"
              >
                <View style={{ flex: 0.8 }}>
                  <Text style={styles.title}>{item.job}</Text>
                  <Text style={styles.description}>{item.extra}</Text>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Text style={{ color: "white" }}>{item.job}</Text>
                    <Text style={{ color: "white" }}>{item.job}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "green",
                      width: 100,
                      height: 35,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>Join</Text>
                  </View>
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
  category: {
    marginRight: _spacing - 6,
    padding: _spacing,
    borderWidth: 1,
    borderColor: _colors.active,
    borderRadius: 12,
    backgroundColor: _colors.inactive,
  },
  card: {
    width: deviceWidth - 20,
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
    // padding: 16,
  },
});

export default Events;