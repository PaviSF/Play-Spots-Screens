import Modal from "react-native-modal";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { deviceHeight, deviceWidth } from "../../constants/Dimension";
import { TouchableOpacity } from "react-native";
import {
  filterTimeArray,
  generateAvailabilityStatusArray,
} from "../../helper/DataSorting";

let timeArray = [
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

// Display the timeArray
const boxSize = 50;

export default function TimeModal({ state, changeState }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:30");
  const [start, setStart] = useState(true);
  const closeModal = () => {
    setModalVisible(!isModalVisible);
    changeState();
  };

  const elementsAfterSearch = (arr, searchElement) => {
    const index = arr.indexOf(searchElement);
    if (index === -1) {
      // If the search element is not found, return an empty array or handle the error as needed.
      return [];
    }
    // Use the slice method to get all elements after the index.
    return arr.slice(index + 1);
  };

  const startClicked = (number) => {
    setStart(!start);
    setStartTime(number);
  };

  const endClicked = (number) => {
    setStart(!start);
    closeModal();
  };

  const timing = {
    start_time: "08:00",
    end_time: "23:59",
  };

  const bookings = [
    {
      start_time: "12:00",
      end_time: "13:00",
    },
    {
      start_time: "13:00",
      end_time: "14:00",
    },
  ];
  
  const unavailability = [
    {
      start_time: "18:00",
      end_time: "19:00",
    },
    {
      start_time: "22:00",
      end_time: "23:00",
    },
  ];

  const BoxRow = ({ data }) => {
    return (
      <View style={styles.row}>
        {data.map((number,index) => (
          <TouchableOpacity
            style={[styles.box, number.booking ? styles.bookedBox:null,number.unavailable ? styles.unavailability:null]}
            key={index}
            onPress={() => (start ? startClicked(number.time) : endClicked(number.time))}
          >
            <Text style={styles.numberText}>{number.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const modifiedRows = generateAvailabilityStatusArray(filterTimeArray(timeArray, timing),bookings,unavailability);
  const rows = [];
  for (let i = 0; i < modifiedRows.length; i += 6) {
    const row = modifiedRows.slice(i, i + 6);
    rows.push(row);
  }
  useEffect(() => {
    // Update the modal visibility when the state prop changes
    setModalVisible(state);
  }, [state]);

  return (
    <Modal
      isVisible={isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      backdropOpacity={0.4}
      onBackdropPress={() => closeModal()}
      style={{ margin: 0 }}
    >
      <View
        style={[styles.modal, { height: 80 + rows.length * (boxSize + 10) }]}
      >
        <Text style={{ textAlign: "center", padding: 10 }}>
          {start ? "Choose Start Time" : "Choose End Time"}
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
}

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
  unavailability: { backgroundColor: "#B4B4B4", borderColor: "black"},
  numberText: {
    fontSize: 11,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
});
