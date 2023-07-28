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
import Line from "../components/Line";
import BoxExample from "../components/index/Boxes";
import { deviceWidth } from "../constants/Dimension";
import LargeGradientButton from "../components/buttons/LargeGradientButton";
import { setLocation } from "../features/location";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findLocation, reverseGeocode } from "../helper/FindLocation";
import { setNote } from "../features/notes";

const name = faker.person.firstName();

export default function Page() {
  const router = useRouter();
  const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));
  const [editedLocation, setEditedLocation] = useState({
    latitude: 0,
    longitude: 0,
    district: "",
    state: "",
    country: "",
  });
  const dispatch = useDispatch();
  const note = useSelector((state) => state.note.value);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-notes");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  useEffect(() => {
    async function fetchLocation() {
      const currentLocation = await findLocation();
      const geoLocation = await reverseGeocode(currentLocation);
      const location = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        district: geoLocation[0].city,
        state: geoLocation[0].region,
        country: geoLocation[0].country,
      };
      dispatch(setLocation(location));
    }
    async function fetchNotesData() {
      const notesData = await getData();
      console.log(notesData);
      if (notesData !== undefined) {
        console.log("blah");
        dispatch(setNote(notesData));
      }
      console.log("blaah " + note.date[0])
    }
    fetchLocation();
    fetchNotesData();
  }, []);

  const handleCheckboxClick = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <View style={styles.container}>
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
            onPress={() => router.replace("home")}
          />
        </View>
      </View>
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
