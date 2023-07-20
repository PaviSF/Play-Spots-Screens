import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Pressable
} from "react-native";
import React, { useState } from "react";
import DatePick from "../../components/date-picker/DatePick";
import CircularOrbit from "../../components/circular-orbit/CircularOrbit";
import { Tabs } from "expo-router";
import Header from "../../components/header/Header";
import { deviceHeight, deviceWidth } from "../../constants/Dimension";

import { faker } from "@faker-js/faker";
import CardView from "../../components/spots/CardView";

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

const Spot = () => {
  const [fullModal, setfullModal] = useState(false);
  return (
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
      <View
        style={[
          styles.modal,
          {
            top: fullModal ? StatusBar.currentHeight : deviceHeight / 1.4,
            width: fullModal ? deviceWidth : deviceWidth - 20,
            height: fullModal ? deviceHeight : deviceHeight / 3,
          },
        ]}
      >
        <TouchableOpacity style={styles.modalHeadingLine} onPress={()=>setfullModal(!fullModal)}></TouchableOpacity>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={data}
          style={{ flex: 1, margin: 20 }}
          renderItem={({ item, index }) => {
            return (
              <View>
                <CardView/>
              </View>
            );
          }}
        />
      </View>
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
    backgroundColor: _colors.inactive,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    zIndex: 9999,
    elevation:8,
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
