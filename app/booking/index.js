import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "../../components/booking/DatePicker";
import ClockCircle from "../../components/booking/ClockCircle";
import { Link, useRouter, useSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimeModal from "../../components/modal/TimeModal";
import { getTiming } from "../../helper/FetchData";
import { FlatList } from "react-native";

const booking = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const turfData = useSearchParams();
  const dateTime = useSelector((state) => state.booking.value);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getTiming(dateTime.date);
      setData(data);
      setLoading(false);
      console.log("mellow" + dateTime.turf_details.sport_id[0].item_name);
    };
    getData();
  }, []);

  const timeStringToFloat = (timeString) => {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Calculate the time in hours, including minutes as fractions
    const timeInHours = hours + minutes / 60;

    return timeInHours;
  };

  const changeModalState = () => {
    setModalState(!modalState);
  };

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={["#ffffff", "#EEEEEE"]}
        style={styles.firstContainer}
        start={[0, 0]}
        end={[0, 1]}
      >
        <View style={styles.groundContainer}>
          <FlatList
            data={dateTime.turf_details.sport_id}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={index} style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>{item.item_name}</Text>
              </TouchableOpacity>
  )}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DatePicker />
        </View>
      </LinearGradient>
      <View style={styles.secondContainer}>
        <View
          style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}
        >
          <ClockCircle
            startHourVariable={timeStringToFloat(dateTime.start_time)}
            finishHourVariable={timeStringToFloat(dateTime.end_time)}
          />
        </View>
        <View style={styles.timeSelectorContainer}>
          <View style={styles.timeSelector}>
            <Text style={styles.timeSelectorHeading}>From</Text>
            <TouchableOpacity onPress={changeModalState}>
              <Text style={styles.timeText}>{dateTime.start_time}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ height: "60%", width: 0.4, backgroundColor: "grey" }}
          />
          <View style={styles.timeSelector}>
            <Text style={styles.timeSelectorHeading}>To</Text>
            <TouchableOpacity onPress={changeModalState}>
              <Text style={styles.timeText}>{dateTime.end_time}</Text>
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
      {/* <Text>{data[0].timing.start_time}</Text> */}
      <TimeModal
        state={modalState}
        changeState={changeModalState}
        start_time={data[0].timing.start_time}
        end_time={data[0].timing.end_time}
        bookings={data[0].bookings}
        unavailability={data[0].unavailability}
      />
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
