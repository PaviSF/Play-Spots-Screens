import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, useWindowDimensions, TouchableOpacity, StatusBar, Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter,Link } from "expo-router";


const Header = () => {
  const { height, width } = useWindowDimensions();
  const location = useSelector((state) => state.location.value);
  const StatusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0;
  const router = useRouter();
  
  return (
    <View style={{ width: width - 40, height: height / 15, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 15, marginTop: StatusBarHeight }}>
      <Link href={"/home/search_location"}>
      <View style={{ flexDirection: "row",alignItems:'center' }}> 
        <Entypo name="location-pin" size={27} color="black" />
        <View>
          <Text style={{ fontSize: 12, color: "gray", fontWeight: "500" }}>
            {location.district}
          </Text>
          <Text style={{ fontSize: 10, color: "gray" }}>{`${location.state}, ${location.country}`}</Text>
        </View>
      </View>
      </Link>
      <TouchableOpacity>
        <EvilIcons name="bell" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
