import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import React from "react";

const Header = () => {
  const { height, width } = useWindowDimensions();
  const StatusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0;
  return (
    <View
      style={{
        width: width - 40,
        height: height / 15,
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 15,
        marginTop: StatusBarHeight
      }}
    >
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <Entypo name="location-pin" size={27} color="black" />
        <View>
          <Text style={{ fontSize: 12, color: "gray", fontWeight: "500" }}>
            Kozhikode
          </Text>
          <Text style={{ fontSize: 10, color: "gray" }}>Kerala, India</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <EvilIcons name="bell" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
