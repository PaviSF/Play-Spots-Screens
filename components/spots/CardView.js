import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { deviceWidth } from "../../constants/Dimension";
const CardView = () => {
  const [like, setLike] = useState(false);
  return (
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
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ fontWeight: "500", color: "grey", fontSize: 15 }}>
                Match Box The Stadium Turf
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>East Nadakavu</Text>
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
            <TouchableOpacity onPress={()=> {setLike(!like)}}><AntDesign
              name={like ? "heart" : "hearto"}
              size={24}
              color="green"
              style={{ marginLeft: 20 }}
            /></TouchableOpacity>
            
          </View>
          <View></View>
        </View>
        <View></View>
        <View style={{width:deviceWidth,height:0.5,backgroundColor:'black'}}/>
      </View>
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
    width: "90%",
    height: "90%",
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
});

export default CardView;
