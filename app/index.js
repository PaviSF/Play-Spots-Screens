import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { faker } from "@faker-js/faker";
import { Entypo } from "@expo/vector-icons";
import Line from "../components/line";

const name = faker.person.firstName();

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello {name}</Text>
        <Pressable onPress={() => router.push("home")}>
          <Text style={styles.subtitle}>Greetings, from playspots team</Text>
        </Pressable>
        <Line />
        <View style={styles.dotAndTextALignment}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style={styles.recentSpotsLabel}>Choose your sports</Text>
        </View>
        <Text style={{ marginLeft: 22 }}>
          kindly choose your interesting sports for better experience
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    padding: 24,
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
