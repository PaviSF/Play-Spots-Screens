import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "../../components/booking/DatePicker";
import ClockCircle from "../../components/booking/ClockCircle";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimeModal from "../../components/modal/TimeModal";
import { getTiming } from "../../helper/FetchData";

const booking = () => {
  const router = useRouter();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    const getData = async () => {
      await getTiming();
    }
    getData();
  }, []);

  const changeModalState = () => {
    setModalState(!modalState);
  };

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
              source={require("../../assets/spots/football-turf.png")}
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
              source={require("../../assets/spots/tennis-court.png")}
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
        <View style={{ flex: 1 }}>
          <DatePicker />
        </View>
      </LinearGradient>
      <View style={styles.secondContainer}>
        <View
          style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}
        >
          <ClockCircle startHourVariable={10} finishHourVariable={14} />
        </View>
        <View style={styles.timeSelectorContainer}>
          <View style={styles.timeSelector}>
            <Text style={styles.timeSelectorHeading}>From</Text>
            <TouchableOpacity>
              <Text style={styles.timeText}>{'12:00 am'}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ height: "60%", width: 0.4, backgroundColor: "grey" }}
          />
          <View style={styles.timeSelector}>
            <Text style={styles.timeSelectorHeading}>To</Text>
            <TouchableOpacity onPress={changeModalState}>
              <Text style={styles.timeText}>01:00 am</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.finalContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceHeading}>Total Price:</Text>
          <Text style={styles.price}>₹900.00</Text>
        </View>
        <View
          style={{
            height: 0.4,
            width: "100%",
            backgroundColor: "grey",
            marginTop: 20,
          }}
        />
        <View style={styles.bothButtons}>
          <TouchableOpacity style={styles.scheduleContainer}>
            <Text style={styles.schedule}>Add to Schedules</Text>
            <MaterialCommunityIcons
              name="progress-clock"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("booking/next")}>
            <LinearGradient
              colors={["#03C254", "#00451E"]}
              style={styles.nextContainer}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.next}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <TimeModal state={modalState} changeState={changeModalState} />
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
  secondContainer: { flex: 0.48 },
  groundContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1.8,
  },
  ground: {},
  groundImage: { height: 95, width: 160 },
  groundTypesContainer: { flexDirection: "row" },
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
  timeSelectorContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    width: "60%",
    borderRadius: 12,
    alignSelf: "center",
  },
  timeSelector: {},
  timeSelectorHeading: {
    textAlign: "center",
    fontSize: 11,
    color: "#37BE70",
    fontWeight: "500",
  },
  timeText: { fontWeight: "500", color: "#3D3D3D", fontSize: 16 },
  finalContainer: { flex: 0.17, paddingHorizontal: 30 },
  priceContainer: { flexDirection: "row", justifyContent: "center" },
  priceHeading: {
    fontSize: 13,
    textAlignVertical: "center",
    color: "#686868",
    fontWeight: "500",
    marginRight: 10,
  },
  price: {
    fontWeight: "600",
    fontSize: 18,
    color: "#03C254",
  },
  bothButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  scheduleContainer: {
    borderWidth: 0.5,
    borderRadius: 12,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  schedule: {
    marginRight: 4,
  },
  nextContainer: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 50,
  },
  next: {
    color: "#ffffff",
    fontSize: 17,
  },
});

export default booking;
