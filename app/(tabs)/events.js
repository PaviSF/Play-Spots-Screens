import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
import GradientButton from "../../components/GradientButton";
import { deviceWidth } from "../../constants/Dimension";

const data = [...Array(4).keys()].map(() => ({
  key: faker.string.uuid(),
  job: faker.animal.crocodilia(),
}));

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 10;

const turfImage = require("../../assets/download.jpeg");

const Events = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={{ marginHorizontal: 100, marginVertical: 20 }}>
        <GradientButton title={"Host A Event"} />
      </View>
      <Text>Sports events nearby you</Text>
      <FlatList
        style={{ flexGrow: 0 }}
        data={data}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => {}} style={{}}>
              <View
                style={styles.category}
              >
                <Text style={{ color: "#36303F", fontWeight: "700" }}>
                  {item.job}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        style={{ flexGrow: 0 }}
        data={data}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  marginRight: _spacing,
                  padding: _spacing,
                }}
              >
                <ImageBackground
                  source={turfImage}
                  style={{ width: "100%", height: 200 }}
                >
                  <Text>Hello</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
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
    marginRight: _spacing,
    padding: _spacing,
    borderWidth: 2,
    borderColor: _colors.active,
    borderRadius: 12,
    backgroundColor: _colors.inactive,
  }
});

export default Events;
