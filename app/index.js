//React imports
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

//Expo imports
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

//External imports
import { faker } from "@faker-js/faker";

//Internal imports
import Line from "../components/Line";
import BoxExample from "../components/index/Boxes";
import { deviceWidth } from "../constants/Dimension";

const name = faker.person.firstName();

export default function Page() {
  const router = useRouter();
  const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));

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
          <Button
            title="CONTINUE"
            color={"green"}
            onPress={() => router.push("home")}
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
