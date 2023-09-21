import Modal from "react-native-modal";
import React, {
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
  setStartTime,
} from "@features/booking";
import { deviceHeight, deviceWidth } from "@constants/Dimension";
import { TouchableOpacity } from "react-native";
import {
  generateAvailabilityStatusArray,
  markBookedTimes,
  startTimeArray,
} from "@helper/DataSorting";
import { notifyMessage } from "@helper/NotificationUtils";

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
// Individual time box size
const boxSize = 50;
const filterTimeArrayForCurrentDate = (dateString, timeArray) => {
  // Step 1: Get the current date and time
  const currentDate = new Date();

  // Step 2: Convert the provided date string to a Date object
  const providedDate = new Date(dateString);

  // Step 3: Compare the current date and time with the provided date
  if (currentDate.toDateString() === providedDate.toDateString()) {
    // Step 4: Remove elements from timeArray based on the current time
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

    // Filter the timeArray to keep only times greater than the current time
    const filteredTimeArray = timeArray.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const timeInMinutes = hours * 60 + minutes;
      return timeInMinutes > currentTime;
    });

    return filteredTimeArray;
  } else {
    // If the provided date is not the current date, return the original timeArray
    return timeArray;
  }
};

function removeValuesUntilElement(arr, element) {
  // Find the index of the specified element in the array
  const index = arr.indexOf(element);

  // If the element is not found or is the last element, return an empty array
  if (index === -1 || index === arr.length - 1) {
    return [];
  }

  // Return a new array containing elements from the specified element onwards
  return arr.slice(index + 1);
}

// Example usage:
// const providedDateString = "2023-09-02"; // Replace with your provided date

// const filteredArrayNew = filterTimeArrayForCurrentDate(bookingData.date, timeArray);

const StartTimeModal = forwardRef(({ bookings, unavailability }, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  //const [startTime, setStartTime] = useState("00:00");
  const bookingData = useSelector((state) => state.booking.value);
  const dispatch = useDispatch();
  const filteredArrayNew = filterTimeArrayForCurrentDate(
    bookingData.date,
    timeArray
  );

  const filteredTimeArray = startTimeArray(
    filteredArrayNew,
    bookingData.turf_details.limit_round,
    bookingData.turf_details.from_thirtieth_minute
  );

  // const bottomSheetRef = useRef();

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

  const startClicked = (number) => {
    number.booking && notifyMessage("This time is booked");
    number.unavailable && notifyMessage("This time is unavailable");
    !number.unavailable &&
      !number.booking &&
      dispatch(setStartTime(number.time)) &&
      dispatch(setEndTime("00:00")) &&
      closeBottomSheet();
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
            onPress={() => startClicked(number)}
          >
            <Text style={styles.numberText}>{number.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const modifiedRows = markBookedTimes(
    filteredTimeArray,
    bookings,
    unavailability
  );

  const rows = [];
  for (let i = 0; i < modifiedRows.length; i += 6) {
    const row = modifiedRows.slice(i, i + 6);
    rows.push(row);
  }

  return (
    <Modal
      isVisible={isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      backdropOpacity={0.4}
      onBackdropPress={closeBottomSheet}
      style={{ margin: 0 }}
    >
      <View
        style={[styles.modal, { height: 80 + rows.length * (boxSize + 10) }]}
      >
        <Text style={{ textAlign: "center", padding: 10 }}>
          {"Choose Start Time"}
        </Text>
        <View style={styles.container}>
          <FlatList
            data={rows}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <BoxRow data={item} />}
          />
        </View>
      </View>
    </Modal>
  );
});

export default React.memo(StartTimeModal);

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
