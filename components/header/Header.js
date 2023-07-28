import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, useWindowDimensions, TouchableOpacity, StatusBar, Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { findLocation, reverseGeocode } from "../../helper/FindLocation";

const Header = () => {
  const { height, width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const location = useSelector((state) => state.location.value);
  const StatusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0;

  // useEffect(() => {
  //   // Fetch location data and reverse geocode
  //   const fetchLocationData = async () => {
  //     try {
  //       const currentLocation = await findLocation();
  //       const reverseGeocodedAddress = await reverseGeocode(currentLocation);

  //       // Assuming the location data is stored in 'district', 'state', and 'country' fields in the reverseGeocodedAddress object
  //       const { district, state, country } = reverseGeocodedAddress[0];
  //       // Dispatch the location data to Redux state
  //       // Replace 'dispatch' with the actual dispatch function used to update the Redux state
  //       // dispatch(updateLocation({ district, state, country }));

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching location:", error);
  //       setLoading(false);
  //     }
  //   };

  //   // Only fetch location data if it's not available in the Redux state
  //   if (!location) {
  //     //fetchLocationData();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [location]);

  // if (loading) {
  //   return (
  //     <View style={{ width: width - 40, height: height / 15, marginTop: StatusBarHeight }}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{ width: width - 40, height: height / 15, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 15, marginTop: StatusBarHeight }}>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <Entypo name="location-pin" size={27} color="black" />
        <View>
          <Text style={{ fontSize: 12, color: "gray", fontWeight: "500" }}>
            {location.district}
          </Text>
          <Text style={{ fontSize: 10, color: "gray" }}>{`${location.state}, ${location.country}`}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <EvilIcons name="bell" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
