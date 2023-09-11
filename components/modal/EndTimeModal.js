import Modal from "react-native-modal";
import {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeModalState,
  setEndTime,
  setPricing,
  setStartTime,
} from "../../features/booking";

import { deviceHeight, deviceWidth } from "../../constants/Dimension";
import { TouchableOpacity } from "react-native";
import {
  endTimeArray,
  findSlotDetailsById,
  generateAvailabilityStatusArray,
  timeAfterSelected,
} from "../../helper/DataSorting";
//import { timeArray } from "../../constants/TimeArray";
import { current } from "@reduxjs/toolkit";
import { notifyMessage } from "../../helper/NotificationUtils";
import { getPrice } from "../../helper/FetchData";

const timeArray = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const boxSize = 50;

const EndTimeModal = forwardRef(
  ({ bookings, unavailability, slotId, sportId }, ref) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [filteredTimeArray, setFilteredTimeArray] = useState([]);
    const [rows, setRows] = useState([]);
    //const [startTime, setStartTime] = useState("00:00");
    const bookingData = useSelector((state) => state.booking.value);
    const dispatch = useDispatch();
    const currentSlot = findSlotDetailsById(
      slotId,
      bookingData.turf_details.slot_id
    );

    useEffect(() => {
      console.log(bookingData.start_time)

      const data = endTimeArray(
        timeArray,
        bookingData.turf_details.limit_round,
        bookingData.turf_details.from_thirtieth_minute,
        bookingData.turf_details.allow_half_hour,
        currentSlot.minimum_bookable_time,
        bookingData.start_time
      );
      console.log("The filtered array");
      console.log(data);
      //setFilteredTimeArray(data);
      const modifiedRows = generateAvailabilityStatusArray(
        data,
        bookings,
        unavailability
      );
      console.log(
        "the one wheer the filtered array is then changed to th new structure"
      );
      console.log(modifiedRows);
      const rowss = [];
      for (let i = 0; i < modifiedRows.length; i += 6) {
        const row = modifiedRows.slice(i, i + 6);
        rowss.push(row);
      }
      setRows(rowss);
      console.log("The row by row structure");
      console.log(rowss);
    }, [bookingData.start_time]);

    // Expose a method to change the bottom sheet state
    useImperativeHandle(ref, () => ({
      setBottomSheetState: (isOpen) => {
        setModalVisible(isOpen);
      },
    }));

    const closeBottomSheet = () => {
      // Set the shared boolean value to false when closing
      setModalVisible(false);
    };

    const startClicked = async (number) => {
      function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      }
      const bookedTime =
        timeToMinutes(number) - timeToMinutes(bookingData.start_time);

      if (
        currentSlot.maximum_bookable_time >= bookedTime &&
        currentSlot.minimum_bookable_time <= bookedTime
      ) {
        await price(bookingData.start_time, number);
        dispatch(setEndTime(number));
        closeBottomSheet();
      } else if (currentSlot.maximum_bookable_time < bookedTime) {
        notifyMessage(
          `Only maximum of ${currentSlot.maximum_bookable_time} minutes is allowed`
        );
      } else {
        notifyMessage(
          `Minimum of ${currentSlot.maximum_bookable_time} minutes is required`
        );
      }
    };

    const BoxRow = ({ data }) => {
      return (
        <View style={styles.row}>
          {data.map((number, index) => (
            <TouchableOpacity
              style={[
                styles.box,
                number.booking ? styles.bookedBox : null,
                number.unavailable ? styles.unavailability : null,
              ]}
              key={index}
              onPress={() => startClicked(number.time)}
            >
              <Text style={styles.numberText}>{number.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };

    const price = async (startTime, endTime) => {
      const priceData = await getPrice(
        bookingData.turf_details.turf_id,
        sportId,
        slotId,
        bookingData.date,
        startTime,
        endTime
      );

      const offerValue =
        priceData.offer !== undefined ? priceData.offer.offer_value : 0;
      const data = {
        price: priceData.price,
        offer: offerValue,
      };

      dispatch(setStartTime(startTime));
      dispatch(setEndTime(endTime));
      dispatch(setPricing(data));
    };

    return (
      <Modal
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        backdropOpacity={0.4}
        onBackdropPress={closeBottomSheet}
        style={{ margin: 0 }}
      >
        {bookingData.start_time !== "00:00" ? (
          <View
            style={[
              styles.modal,
              { height: 80 + rows.length * (boxSize + 10) },
            ]}
          >
            <Text style={{ textAlign: "center", padding: 10 }}>
              {"Choose End Time"}
            </Text>
            <View style={styles.container}>
              <FlatList
                data={rows}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <BoxRow data={item} />}
              />
            </View>
          </View>
        ) : (
          <View
            style={[styles.modal, { height: 50, justifyContent: "center" }]}
          >
            <Text style={{ textAlign: "center" }}>
              Pick a statrting time...
            </Text>
          </View>
        )}
      </Modal>
    );
  }
);

export default EndTimeModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    width: boxSize,
    height: boxSize,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 7,
  },
  selectBox: {},
  bookedBox: { backgroundColor: "#FFEBEB", borderColor: "#E90909" },
  unavailability: { backgroundColor: "#B4B4B4", borderColor: "black" },
  numberText: {
    fontSize: 11,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
});
