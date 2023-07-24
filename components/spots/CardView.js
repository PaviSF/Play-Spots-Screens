import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { deviceWidth } from "../../constants/Dimension";
import { Tabs } from "expo-router";


const CardView = ({ spot, place, price, ratings }) => {
  const [like, setLike] = useState(false);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.cardContainer}>
        {/* Square Image with Curved Corners */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/match-box.png")}
            style={styles.image}
          />
        </View>

        {/* Column with 5 Text Elements */}
        <View style={styles.textContainer}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "500", fontSize: 15 }}>{spot}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "grey" }}>{place}</Text>
                  <Entypo name="dot-single" size={30} color="black" />
                  <Text>4 km</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons
                    name="sports-cricket"
                    size={20}
                    color="green"
                    style={{ margin: 3 }}
                  />
                  <Ionicons
                    name="football"
                    size={20}
                    color="green"
                    style={{ margin: 3 }}
                  />
                  <MaterialCommunityIcons
                    name="badminton"
                    size={20}
                    color="green"
                    style={{ margin: 3 }}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setLike(!like);
                }}
              >
                <AntDesign
                  name={like ? "heart" : "hearto"}
                  size={24}
                  color="green"
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 10 }}>Slots starting from</Text>
                <Text
                  style={{ fontSize: 13, color: "green", fontWeight: "700" }}
                >
                  {` Rs ${price}`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <FontAwesome
                  name={ratings > 0 ? "star" : "star-o"}
                  size={20}
                  color="#FFC400"
                />
                <FontAwesome
                  name={ratings > 1 ? "star" : "star-o"}
                  size={20}
                  color="#FFC400"
                />
                <FontAwesome
                  name={ratings > 2 ? "star" : "star-o"}
                  size={20}
                  color="#FFC400"
                />
                <FontAwesome
                  name={ratings > 3 ? "star" : "star-o"}
                  size={20}
                  color="#FFC400"
                />
                
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: deviceWidth / 1.2,
          height: 0.5,
          backgroundColor: "black",
          marginBottom:10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  imageContainer: {
    flex: 0.2,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1, // Square aspect ratio
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 0.7,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  icon: {
    height: 30,
    width: 30,
    padding: 2,
  },
});

export default CardView;
