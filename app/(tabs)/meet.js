import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import React from "react";

import { Tabs } from "expo-router";
import { useState } from "react";
import { AntDesign, Ionicons,Entypo } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { deviceWidth } from "../../constants/Dimension";

const random = require("../../assets/random.png");

const data = [...Array(40).keys()].map(() => ({
  key: faker.string.uuid(),
  turfName: faker.company.name(),
  location: faker.location.city(),
}));

const Meet = () => {
  const [fullModal, setFullModal] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tabs.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 0.45,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: "green",
        }}
      ></View>
      <Modal
        style={{
          justifyContent: "flex-end",
          margin: 0,
          flex: 0.91,
          //backgroundColor: "red",
        }}
        coverScreen={true}
        animationType="slide"
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.6}
        transparent={true}
        visible={true}
        onRequestClose={() => closeModal()}
      >
        <View style={{ backgroundColor: "white", flex: fullModal ? 1 : 0.56 }}>
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
                    <View style={{flexDirection:'row'}}>
                      <Ionicons
                        name="md-football-sharp"
                        size={20}
                        color="black"
                      />
                      <Text style={styles.text}>6A Side</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Ionicons name="calendar" size={20} color="black" />
                      <Text style={styles.text}>19 July 2023 | 7:00 PM</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Entypo name="location-pin" size={20} color="black" />
                      <Text style={styles.text}>LaLiga Thondayad Bypass Rd, Kozhikode</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  textContainer: { },
  text: {
    marginBottom: 8,
    fontSize: 14,
    width: deviceWidth /2
  },
});

export default Meet;
