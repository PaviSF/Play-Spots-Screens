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
import { useFonts } from "expo-font";

const defaultImage =
  "https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg";

const CardView = ({ spot, place, price, ratings, image }) => {
  const [like, setLike] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/RobotoCondensed-Light.ttf"),
  });
  const completeImage = "https://d3th8mtd05b6hz.cloudfront.net/turf/" + image;
  return (
    <View style={{ justifyContent: "center" }}>
      <View style={styles.cardContainer}>
        {/* Square Image with Curved Corners */}
        <Image
          source={{ uri: completeImage }}
          style={styles.image}
          defaultSource={require("../../assets/247181.jpg")}
          resizeMode="cover" // Resize the image to cover the container
        />
        {/* Column with 5 Text Elements */}
        <View style={styles.textContainer}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 15,
                    fontFamily: "Roboto",
                    paddingBottom: 2,
                  }}
                >
                  {spot}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "grey",
                      width: deviceWidth / 2,
                      fontSize: 12,
                      fontWeight: "500",
                      paddingBottom: 2,
                    }}
                  >
                    {place}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", paddingBottom: 2 }}>
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
            </View>
          </View>
        </View>
        <View style={styles.likeAndStarContainer}>
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
      <View
        style={{
          width: "85%",
          alignSelf: "center",
          height: 0.5,
          backgroundColor: "black",
          marginBottom: 10,
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
    padding: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  imageContainer: {
    overflow: "hidden",
  },
  image: {
    //aspectRatio: 1, // Square aspect ratio
    flex: 0.3,
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 0.5,
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
  likeAndStarContainer: {
    flex: 0.3,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default CardView;
