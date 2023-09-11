//React imports
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Expo imports
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

//External imports
import { faker } from "@faker-js/faker";

//Internal imports
import Line from "../../components/Line";
import BoxExample from "../../components/index/Boxes";
import { deviceWidth } from "../../constants/Dimension";
import LargeGradientButton from "../../components/buttons/LargeGradientButton";
import { setLocation } from "../../features/location";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findLocation, reverseGeocode } from "../../helper/FindLocation";
import { setNote } from "../../features/notes";
import { ActivityIndicator } from "react-native";

const name = faker.person.firstName();

export default function Favourites() {
  const router = useRouter();
  const [editedLocation, setEditedLocation] = useState({
    latitude: 0,
    longitude: 0,
    district: "",
    state: "",
    country: "",
  });
  const [isReady, setIsReafdy] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-notes");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      //console.log(e);
    }
  };

  useEffect(() => {
    async function fetchLocation() {
      const currentLocation = await findLocation();
      const geoLocation = await reverseGeocode(currentLocation);
      console.log(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      const location = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        district: geoLocation[0].city,
        state: geoLocation[0].region,
        country: geoLocation[0].country,
      };
      dispatch(setLocation(location));
      setIsReafdy(true);
    }
    async function prepare() {
      const data = await getData();
      if (data !== null) {
        console.log(data);
        dispatch(setNote(data));
      }
    }
    fetchLocation();
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      {isReady ? (
        <View style={styles.main}>
          <Text style={styles.title}>Hello {name}</Text>
          <Text style={styles.subtitle}>Greetings, from playspots team</Text>
          <Line />
          <View style={styles.dotAndTextALignment}>
            <Entypo name="dot-single" size={24} color="black" />
            <Text style={styles.recentSpotsLabel}>Choose your sports</Text>
          </View>
          <Text style={{ marginLeft: 22 }}>
            kindly choose your interesting sports for better experience
          </Text>
          <BoxExample />
          <View
            style={{
              marginTop: 30,
              width: deviceWidth / 3,
              alignSelf: "center",
            }}
          >
            <LargeGradientButton
              title="GO"
              onPress={() => router.push("home")}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator
          style={{ alignSelf: "center", flex: 1 }}
          size="large"
          color="green"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#058c3d",
  },
  subtitle: {
    fontSize: 15,
    color: "#38434D",
    marginBottom: 15,
  },
  dotAndTextALignment: {
    flexDirection: "row",
    marginTop: 10,
  },
  recentSpotsLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
});
