import { View, Text, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "../components/booking/DatePicker";

const booking = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={["#ffffff", "#EEEEEE"]}
        style={styles.firstContainer}
        start={[0, 0]}
        end={[0, 1]}
      >
        <View style={styles.groundContainer}>
          <View style={styles.ground}>
            <Image
              source={require("../assets/spots/football-turf.png")}
              style={styles.groundImage}
            />
            <View style={styles.groundTypesContainer}>
              <View style={styles.groundType}>
                <Text style={styles.groundTypeText}>Court 1</Text>
                <Text style={styles.groundTypeText}>(7*7)</Text>
              </View>
              <View style={styles.groundType}>
                <Text style={styles.groundTypeText}>Court 2</Text>
                <Text style={styles.groundTypeText}>(5*5)</Text>
              </View>
            </View>
          </View>
          <View style={styles.ground}>
            <Image
              source={require("../assets/spots/tennis-court.png")}
              style={styles.groundImage}
            />
            <View style={styles.groundTypesContainer}>
              <View style={styles.groundType}>
                <Text style={styles.groundTypeText}>Court 1</Text>
              </View>
              <View style={styles.groundType}>
                <Text style={styles.groundTypeText}>Court 2</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex:1}}>
        <DatePicker/>
        </View>
      </LinearGradient>
      <View style={styles.secondContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  firstContainer: {
    flex: 0.35,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  secondContainer: { flex: 0.35 },
  groundContainer: { flexDirection: "row", justifyContent: "center",flex:1.8 },
  ground: {},
  groundImage: { height: 95, width: 160 },
  groundTypesContainer: { flexDirection: "row", },
  groundType: {
    borderWidth: 0.5,
    borderRadius: 7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    marginVertical: 10,
  },
  groundTypeText: { fontSize: 10 },
});

export default booking;
