import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "@components/booking/DatePicker";
import ClockCircle from "@components/booking/ClockCircle";
import { Link, useRouter, useSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StartTimeModal from "@components/modal/StartTimeModal";
import { getPrice, getTiming } from "@helper/FetchData";
import { FlatList } from "react-native";
import {
  changeModalState,
  resetData,
  setEndTime,
  setPricing,
  setStartTime,
} from "@features/booking";
import { Button } from "react-native";
import EndTimeModal from "@components/modal/EndTimeModal";

const booking = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [availabiltyLoading, setAvailabilityLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const dateTime = useSelector((state) => state.booking.value);
  const [selectSport, setSelectSport] = useState(
    dateTime.turf_details.slot_id[0].sport_id.$oid
  );
  const [selectSlot, setSelectSlot] = useState(
    dateTime.turf_details.slot_id[0].slot_id.$oid
  );
  const [price, setPrice] = useState(0);
  const startBottomSheetRef = useRef(null);
  const endBottomSheetRef = useRef(null);
  const selectSlotData = useMemo(() => selectSlot, [selectSlot]);
  const modalReduxState = dateTime.modal_state;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setAvailabilityLoading(true);
      const data = await getTiming(
        dateTime.date,
        dateTime.turf_details.turf_id,
        selectSport,
        selectSlot
      );
      setData(data);
      setPrice(0);
      //console.log(dateTime.turf_details.slot_id[0].sport_id.$oid)
      setAvailabilityLoading(false);
      setLoading(false);
    };
    getData();
    return () => {console.log("hello")}
  }, [dateTime.date]);

  const timeStringToFloat = (timeString) => {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Calculate the time in hours, including minutes as fractions
    const timeInHours = hours + minutes / 60;

    return timeInHours;
  };

  const changeStartTimeModalStates = () => {
    // dispatch(changeModalState(true));
    // setModalState(true);
    startBottomSheetRef.current.setBottomSheetState(true);
  };

  const changeEndTimeModalStates = () => {
    // dispatch(changeModalState(true));
    // setModalState(true);
    endBottomSheetRef.current.setBottomSheetState(true);
  };

  const changeSelectedSport = async (sportId) => {
    setAvailabilityLoading(true);
    setSelectSport(sportId);
    const data = await getTiming(
      dateTime.date,
      dateTime.turf_details.turf_id,
      sportId,
      selectSlot
    );
    setData(data);
    setPrice(0);
    setAvailabilityLoading(false);
  };

  const changeSelectedSlot = async (slotId) => {
    setAvailabilityLoading(true);
    setSelectSlot(slotId);
    const data = await getTiming(
      dateTime.date,
      dateTime.turf_details.turf_id,
      selectSport,
      slotId
    );
    setData(data);
    setPrice(0);
    setAvailabilityLoading(false);
  };

  const goToNextPage = () => {
    if (
      selectSlot.length !== 0 &&
      selectSport.length !== 0 &&
      dateTime.pricing.price !== 0
    ) {
      router.push({
        pathname: "booking/next",
        params: { slotId: selectSlot, sportId: selectSport },
      });
    }
  };

  return loading ? (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ActivityIndicator color={"green"} size={40} style={{ flex: 1 }} />
    </View>
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
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => changeSelectedSport(item.item_id.$oid)}
                style={[
                  styles.sportsListItem,
                  selectSport === item.item_id.$oid
                    ? styles.activeSportsListItem
                    : null,
                ]}
              >
                <Text
                  style={
                    selectSport === item.item_id.$oid
                      ? styles.activeSportsListItemText
                      : null
                  }
                >
                  {item.item_name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={dateTime.turf_details.slot_id}
            style={{ alignSelf: "center" }}
            horizontal
            renderItem={({ item, index }) =>
              selectSport === item.sport_id.$oid ? (
                <TouchableOpacity
                  style={styles.slotDetails}
                  onPress={() => changeSelectedSlot(item.slot_id.$oid)}
                >
                  <Image
                    source={require("@assets/booking/pitch.png")}
                    resizeMode="contain"
                    style={styles.slotIcon}
                  />
                  <View
                    style={[
                      selectSlot === item.slot_id.$oid
                        ? styles.activeSlotTitleContainer
                        : null,
                      styles.slotTitleContainer,
                    ]}
                  >
                    <Text style={styles.slotTitle}>{item.slot_title}</Text>
                  </View>
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <DatePicker />
        </View>
      </LinearGradient>
      {availabiltyLoading ? (
        <View
          style={{
            flex: 0.48,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={"green"} size={40} style={{ flex: 1 }} />
        </View>
      ) : (
        <>
          <View style={styles.secondContainer}>
            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ClockCircle
                startHourVariable={timeStringToFloat(dateTime.start_time)}
                finishHourVariable={timeStringToFloat(dateTime.end_time)}
              />
            </View>
            <View style={styles.timeSelectorContainer}>
              <View style={styles.timeSelector}>
                <Text style={styles.timeSelectorHeading}>From</Text>
                <TouchableOpacity onPress={changeStartTimeModalStates}>
                  <Text style={styles.timeText}>{dateTime.start_time}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{ height: "60%", width: 0.4, backgroundColor: "grey" }}
              />
              <View style={styles.timeSelector}>
                <Text style={styles.timeSelectorHeading}>To</Text>
                <TouchableOpacity onPress={changeEndTimeModalStates}>
                  <Text style={styles.timeText}>{dateTime.end_time}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.finalContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceHeading}>Total Price:</Text>
              <Text style={styles.price}>
                {dateTime.pricing.price === 0
                  ? `--.--`
                  : `${dateTime.turf_details.currency}${
                      dateTime.pricing.price - dateTime.pricing.offer
                    }`}
              </Text>
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
              <TouchableOpacity onPress={goToNextPage}>
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
        </>
      )}

      {/* <Text>{data[0].timing.start_time}</Text> */}
      <StartTimeModal
        ref={startBottomSheetRef}
        bookings={data[0].bookings}
        unavailability={data[0].unavailability}
      />
      <EndTimeModal
        ref={endBottomSheetRef}
        bookings={data[0].bookings}
        unavailability={data[0].unavailability}
        slotId={selectSlot}
        sportId={selectSport}
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
    //flexDirection: "row",
    // justifyContent: "center",
    //flex: 1.8,
  },
  sportsListItem: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 25,
    margin: 5,
    // height: 35,
  },
  activeSportsListItem: {
    backgroundColor: "#029E44",
    borderWidth: 0,
  },
  activeSportsListItemText: {
    color: "#ffffff",
  },
  slotDetails: {
    alignItems: "center",
  },
  slotIcon: {
    height: 120,
    width: 120,
    //backgroundColor: "black",
  },
  slotTitleContainer: {
    borderWidth: 0.4,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  activeSlotTitleContainer: {
    backgroundColor: "green",
    borderWidth: 0,
  },
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
