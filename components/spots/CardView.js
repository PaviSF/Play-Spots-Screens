//React imports
import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

//Expo imports
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

//Internal imports
import { removeAfterSecondComma } from "../../helper/StringManipulation";
import { linearSearch } from "../../helper/DataSorting";
import { deviceWidth } from "../../constants/Dimension";

const defaultImage =
  "https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg";

const CardView = ({  ratings, item }) => {
  const [like, setLike] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/RobotoCondensed-Light.ttf"),
  });
  const completeImage =
    "https://d3th8mtd05b6hz.cloudfront.net/turf/" + item.images[0];
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
        {/* Text container */}
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
                  {item.turf_name}
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
                    {removeAfterSecondComma(item.location.place)}
                  </Text>
                </View>

                {/* Different sports at a venue */}
                <View style={{ flexDirection: "row", paddingBottom: 2 }}>
                  {linearSearch(item.sports, "Cricket") ? (
                    <MaterialIcons
                      name="sports-cricket"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Football") ? (
                    <Ionicons
                      name="football"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Badminton") ? (
                    <MaterialCommunityIcons
                      name="badminton"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Volleyball") ? (
                    <FontAwesome5
                      name="volleyball-ball"
                      size={17}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Tennis") ? (
                    <Ionicons
                      name="tennisball"
                      size={19}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
                  {linearSearch(item.sports, "Gym") ? (
                    <MaterialCommunityIcons
                      name="dumbbell"
                      size={20}
                      color="green"
                      style={{ margin: 3 }}
                    />
                  ) : null}
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
                  {` Rs ${item.lowest_price}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Like And Rating Container */}
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
          marginBottom: 15,
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
